"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getCaloriesForItem, type CalorieInfo } from "@/lib/calorie-db";

// types for coco-ssd predictions
type DetectedObject = {
    bbox: [number, number, number, number]; // [x, y, width, height]
    class: string;
    score: number;
};

export default function FoodDetector() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const modelRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);
    const [running, setRunning] = useState(true);
    const [preds, setPreds] = useState<DetectedObject[]>([]);
    const [topFood, setTopFood] = useState<{
        label: string;
        score: number;
        calories?: CalorieInfo;
    } | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false); // track when video metadata is loaded

    // initialize camera
    useEffect(() => {
        let stream: MediaStream | null = null;
        const setupCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: "environment" },
                        width: { ideal: 720 },
                        height: { ideal: 1280 },
                    },
                    audio: false,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    const handleLoadedMetadata = async () => {
                        try {
                            const playPromise = videoRef.current?.play();
                            if (playPromise !== undefined) {
                                await playPromise;
                            }
                            setVideoLoaded(true);
                        } catch (playErr: any) {
                            console.error(
                                "[v0] Play error:",
                                playErr?.message || playErr
                            );
                        }
                    };

                    videoRef.current.addEventListener(
                        "loadedmetadata",
                        handleLoadedMetadata,
                        { once: true }
                    );
                }
            } catch (err: any) {
                setCameraError(
                    "Tidak bisa mengakses kamera. Izinkan akses kamera di browser Anda."
                );
                console.error("[v0] Camera error:", err?.message || err);
            }
        };
        setupCamera();
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (stream) {
                for (const track of stream.getTracks()) track.stop();
            }
        };
    }, []);

    // load model (tfjs + coco-ssd)
    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const [{ default: cocoSsd }, tf] = await Promise.all([
                    import("@tensorflow-models/coco-ssd"),
                    import("@tensorflow/tfjs-core"),
                ]);

                // Import backends to register them in the registry
                await Promise.all([
                    import("@tensorflow/tfjs-converter"),
                    import("@tensorflow/tfjs-backend-webgl"),
                    import("@tensorflow/tfjs-backend-cpu"), // Import CPU backend as fallback
                ]);

                // Wait for TensorFlow to be ready first
                await tf.ready();

                // Try to set WebGL backend (with CPU as fallback)
                try {
                    await tf.setBackend("webgl");
                    await tf.ready();
                } catch (webglError) {
                    console.warn(
                        "[v0] WebGL backend failed, falling back to CPU:",
                        webglError
                    );
                    await tf.setBackend("cpu");
                    await tf.ready();
                }

                // load lightweight model variant
                const model = await cocoSsd.load({ base: "lite_mobilenet_v2" });
                if (!mounted) return;
                modelRef.current = model;
                setIsReady(true);
            } catch (err) {
                console.error("[v0] Failed to load model:", err);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    // detection loop - only start when both model is ready AND video is loaded
    useEffect(() => {
        if (!isReady || !running || !videoLoaded) return;

        const detect = async () => {
            if (!modelRef.current || !videoRef.current) return;
            const model = modelRef.current;
            const video = videoRef.current;

            if (video.videoWidth === 0 || video.videoHeight === 0) {
                rafRef.current = requestAnimationFrame(detect);
                return;
            }

            try {
                const predictions: DetectedObject[] = await model.detect(video);

                let dominantObject: DetectedObject | null = null;
                if (predictions.length > 0) {
                    // Sort by area (width * height) to get the most dominant object
                    dominantObject = predictions.reduce((prev, curr) => {
                        const prevArea = prev.bbox[2] * prev.bbox[3];
                        const currArea = curr.bbox[2] * curr.bbox[3];
                        return currArea > prevArea ? curr : prev;
                    });
                }

                const singlePrediction = dominantObject ? [dominantObject] : [];
                setPreds(singlePrediction);

                const foodCandidates = singlePrediction
                    .filter((p) => KNOWN_FOOD_CLASSES.has(p.class))
                    .sort((a, b) => b.score - a.score);
                if (foodCandidates.length > 0) {
                    const best = foodCandidates[0];
                    const info = getCaloriesForItem(best.class);
                    const foodData = {
                        label: best.class,
                        score: best.score,
                        calories: info || undefined,
                    };
                    setTopFood(foodData);
                    drawPredictions(singlePrediction, foodData);
                } else {
                    setTopFood(null);
                    drawPredictions(singlePrediction, null);
                }
            } catch (err) {
                console.error("[v0] detect error:", err);
            }
            rafRef.current = requestAnimationFrame(detect);
        };

        rafRef.current = requestAnimationFrame(detect);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isReady, running, videoLoaded]);

    // draw overlay
    const drawPredictions = (
        predictions: DetectedObject[],
        foodData: {
            label: string;
            score: number;
            calories?: CalorieInfo;
        } | null
    ) => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        // sync canvas size with video stream
        const { videoWidth, videoHeight } = video;
        if (videoWidth === 0 || videoHeight === 0) return;
        if (canvas.width !== videoWidth) canvas.width = videoWidth;
        if (canvas.height !== videoHeight) canvas.height = videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const stroke = "#10b981";
        const labelBg = "rgba(16, 185, 129, 0.1)";
        const labelFg = "#ffffff";

        for (const p of predictions) {
            const [x, y, w, h] = p.bbox;
            ctx.lineWidth = 2;
            ctx.strokeStyle = stroke;
            ctx.strokeRect(x, y, w, h);

            // label box at top
            const txt = `${p.class} ${(p.score * 100).toFixed(1)}%`;
            ctx.font =
                "bold 14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
            const textMetrics = ctx.measureText(txt);
            const padX = 6;
            const padY = 4;
            const boxW = textMetrics.width + padX * 2;
            const boxH = 20;

            ctx.fillStyle = labelBg;
            ctx.fillRect(x, y - boxH, boxW, boxH);
            ctx.fillStyle = labelFg;
            ctx.fillText(txt, x + padX, y - 6);

            if (foodData && p.class === foodData.label && foodData.calories) {
                const calorieText = `${foodData.calories.value} ${foodData.calories.unit}`;
                const noteText = foodData.calories.note || "takaran umum";

                ctx.font =
                    "bold 16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
                const calMetrics = ctx.measureText(calorieText);

                ctx.font =
                    "12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
                const noteMetrics = ctx.measureText(noteText);

                const infoBoxW =
                    Math.max(calMetrics.width, noteMetrics.width) + padX * 2;
                const infoBoxH = 50;
                const infoX = x;
                const infoY = y + h + 5;

                // semi-transparent background
                ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
                ctx.fillRect(infoX, infoY, infoBoxW, infoBoxH);

                // calorie value
                ctx.fillStyle = "#10b981";
                ctx.font =
                    "bold 16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
                ctx.fillText(calorieText, infoX + padX, infoY + 20);

                // note
                ctx.fillStyle = "#d1d5db";
                ctx.font =
                    "12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
                ctx.fillText(noteText, infoX + padX, infoY + 38);
            }
        }
    };

    const toggleRunning = () => setRunning((r) => !r);

    return (
        <div className="px-4">
            <Card className="overflow-hidden border-slate-700 bg-slate-800">
                <CardContent className="p-0">
                    <div className="relative w-full bg-black aspect-[9/16]">
                        <video
                            ref={videoRef}
                            playsInline
                            muted
                            aria-label="Kamera untuk deteksi makanan"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <canvas
                            ref={canvasRef}
                            className={cn(
                                "absolute inset-0 w-full h-full",
                                "pointer-events-none"
                            )}
                        />
                        <div className="absolute left-3 bottom-3 flex items-center gap-2 z-10">
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                                {isReady ? "Model siap" : "Memuat model…"}
                            </Badge>
                            <Button
                                size="sm"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                onClick={toggleRunning}
                            >
                                {running ? "Jeda" : "Lanjut"}
                            </Button>
                        </div>
                        <div className="absolute right-3 top-3 z-10">
                            <div className="bg-black/80 px-3 py-2 rounded text-xs text-slate-300 space-y-1 border border-slate-700">
                                <div>Model: COCO-SSD</div>
                                <div>
                                    Kamera:{" "}
                                    {cameraError ? (
                                        <span className="text-red-400">
                                            Gagal
                                        </span>
                                    ) : (
                                        <span className="text-emerald-400">
                                            Aktif
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// food classes known in our calorie DB
const KNOWN_FOOD_CLASSES = new Set<string>([
    "banana",
    "apple",
    "sandwich",
    "hot dog",
    "pizza",
    "donut",
    "cake",
    "broccoli",
]);
