"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CalorieInfo } from "@/lib/calorie-db";
import { MODEL_CONFIG } from "@/lib/model-config";
import { fuzzyMatchFood } from "@/lib/model-config";
import { CALORIE_DB } from "@/lib/calorie-db";

declare global {
    var tmImage: any;
}

type DetectedFood = {
    class: string;
    score: number;
    source: "fruits" | "snacks" | "coco";
};

// --- KONFIGURASI ---
const DETECTION_DELAY = 500; // Delay 0.5 detik biar gak berat
const MIN_CONFIDENCE = 0.95; // <-- UBAH DISINI JADI 0.7

export default function FoodDetector() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fruitsModelRef = useRef<any>(null);
    const snacksModelRef = useRef<any>(null);

    const [isReady, setIsReady] = useState(false);
    const [running, setRunning] = useState(true);
    const [topFood, setTopFood] = useState<{
        label: string;
        score: number;
        source: string;
        calories?: CalorieInfo;
    } | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [loadedModels, setLoadedModels] = useState<string[]>([]);

    // 1. Setup Kamera
    useEffect(() => {
        let stream: MediaStream | null = null;
        const setupCamera = async () => {
            try {
                if (
                    !navigator.mediaDevices ||
                    !navigator.mediaDevices.getUserMedia
                ) {
                    throw new Error("Browser tidak support akses kamera.");
                }

                const isLocalhost =
                    window.location.hostname === "localhost" ||
                    window.location.hostname === "127.0.0.1";
                const isHttps = window.location.protocol === "https:";

                if (!isLocalhost && !isHttps) {
                    throw new Error("Kamera memerlukan HTTPS.");
                }

                const constraints = {
                    video: {
                        facingMode: "environment",
                        width: { ideal: 720 },
                        height: { ideal: 1280 },
                    },
                    audio: false,
                };

                stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (!videoRef.current) return;
                videoRef.current.srcObject = stream;

                videoRef.current.onloadedmetadata = async () => {
                    try {
                        await videoRef.current?.play();
                        setVideoLoaded(true);
                        setCameraError(null);
                    } catch (e) {
                        setCameraError("Gagal memainkan video");
                    }
                };
            } catch (err: any) {
                setCameraError(err?.message || "Gagal akses kamera");
            }
        };

        setupCamera();
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (stream) stream.getTracks().forEach((t) => t.stop());
        };
    }, []);

    // 2. Load Models
    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                let attempts = 0;
                while (!window.tmImage && attempts < 50) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    attempts++;
                }
                if (!window.tmImage)
                    throw new Error("Teachable Machine library missing");

                const loaded = [];

                if (MODEL_CONFIG.FRUITS.enabled) {
                    try {
                        const fruitsModel = await window.tmImage.load(
                            MODEL_CONFIG.FRUITS.modelPath,
                            MODEL_CONFIG.FRUITS.modelPath.replace(
                                "model.json",
                                "metadata.json"
                            )
                        );
                        if (mounted) {
                            fruitsModelRef.current = fruitsModel;
                            loaded.push("fruits");
                        }
                    } catch (e) {
                        console.warn("Fruits model failed", e);
                    }
                }

                if (MODEL_CONFIG.SNACKS.enabled) {
                    try {
                        const snacksModel = await window.tmImage.load(
                            MODEL_CONFIG.SNACKS.modelPath,
                            MODEL_CONFIG.SNACKS.modelPath.replace(
                                "model.json",
                                "metadata.json"
                            )
                        );
                        if (mounted) {
                            snacksModelRef.current = snacksModel;
                            loaded.push("snacks");
                        }
                    } catch (e) {
                        console.warn("Snacks model failed", e);
                    }
                }

                setLoadedModels(loaded);
                setIsReady(true);
            } catch (err) {
                console.error(err);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);

    // 3. Logic Deteksi Utama
    useEffect(() => {
        if (!isReady || !running || !videoLoaded) return;

        const detect = async () => {
            if (!videoRef.current) return;
            const video = videoRef.current;

            if (video.videoWidth === 0 || video.videoHeight === 0) {
                timeoutRef.current = setTimeout(detect, 100);
                return;
            }

            try {
                const predictionPromises = [];

                // Jalankan model secara paralel
                if (fruitsModelRef.current) {
                    predictionPromises.push(
                        fruitsModelRef.current
                            .predict(video)
                            .then((preds: any[]) => ({
                                preds,
                                source: "fruits",
                            }))
                    );
                }

                if (snacksModelRef.current) {
                    predictionPromises.push(
                        snacksModelRef.current
                            .predict(video)
                            .then((preds: any[]) => ({
                                preds,
                                source: "snacks",
                            }))
                    );
                }

                const results = await Promise.all(predictionPromises);

                let allCandidates: DetectedFood[] = [];

                // Kumpulkan kandidat terbaik dari tiap model
                results.forEach((res: any) => {
                    const topInModel = res.preds.reduce(
                        (prev: any, curr: any) =>
                            curr.probability > prev.probability ? curr : prev
                    );

                    allCandidates.push({
                        class: topInModel.className,
                        score: topInModel.probability,
                        source: res.source as "fruits" | "snacks",
                    });
                });

                // Cari skor tertinggi secara global
                let winner: DetectedFood | null = null;

                if (allCandidates.length > 0) {
                    const globalTop = allCandidates.reduce((prev, curr) =>
                        curr.score > prev.score ? curr : prev
                    );

                    // Cek threshold 0.7
                    if (globalTop.score >= MIN_CONFIDENCE) {
                        winner = globalTop;
                    }
                }

                // Update UI
                if (winner) {
                    const calorieKey = fuzzyMatchFood(winner.class);
                    let info: CalorieInfo | undefined;
                    if (calorieKey && CALORIE_DB[calorieKey]) {
                        info = CALORIE_DB[calorieKey];
                    }

                    const foodData = {
                        label: winner.class,
                        score: winner.score,
                        source: winner.source,
                        calories: info,
                    };

                    setTopFood(foodData);
                    drawPredictions(foodData);
                } else {
                    // Jika tidak ada winner (score < 0.7), hapus data & bersihkan layar
                    setTopFood(null);
                    drawPredictions(null);
                }
            } catch (err) {
                console.error("[v0] detect error:", err);
            }

            // Loop lagi setelah delay
            timeoutRef.current = setTimeout(detect, DETECTION_DELAY);
        };

        detect();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isReady, running, videoLoaded]);

    // 4. Fungsi Menggambar di Canvas
    const drawPredictions = (
        foodData: {
            label: string;
            score: number;
            source: string;
            calories?: CalorieInfo;
        } | null
    ) => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        if (canvas.width !== video.videoWidth) canvas.width = video.videoWidth;
        if (canvas.height !== video.videoHeight)
            canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // PENTING: Selalu hapus layar dulu
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Jika foodData null (tidak ada deteksi > 0.7), berhenti di sini
        // Hasilnya layar canvas jadi bersih (kotak hilang)
        if (!foodData) return;

        // Jika ada data, gambar kotak baru
        const { videoWidth, videoHeight } = video;
        const boxW = videoWidth * 0.6;
        const boxH = videoHeight * 0.4;
        const x = (videoWidth - boxW) / 2;
        const y = (videoHeight - boxH) / 2;

        const strokeColor =
            foodData.source === "fruits" ? "#10b981" : "#f59e0b";

        ctx.lineWidth = 4;
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(x, y, boxW, boxH);

        const txt = `${foodData.label} ${(foodData.score * 100).toFixed(0)}%`;
        ctx.font = "bold 18px sans-serif";
        const textMetrics = ctx.measureText(txt);

        ctx.fillStyle = strokeColor;
        ctx.fillRect(x, y - 30, textMetrics.width + 20, 30);

        ctx.fillStyle = "#ffffff";
        ctx.fillText(txt, x + 10, y - 8);

        if (foodData.calories) {
            const calorieText = `${foodData.calories.value} ${foodData.calories.unit}`;
            const noteText = foodData.calories.note || "takaran umum";

            const infoY = y + boxH + 10;
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(x, infoY, boxW, 60);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 20px sans-serif";
            ctx.fillText(calorieText, x + 10, infoY + 25);

            ctx.fillStyle = "#d1d5db";
            ctx.font = "14px sans-serif";
            ctx.fillText(noteText, x + 10, infoY + 48);
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
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                        />

                        <div className="absolute left-3 bottom-3 flex items-center gap-2 z-10">
                            <Badge
                                variant={isReady ? "default" : "secondary"}
                                className="bg-emerald-500/80"
                            >
                                {isReady ? "AI Siap" : "Memuat..."}
                            </Badge>
                            <Button
                                size="sm"
                                variant={running ? "destructive" : "default"}
                                onClick={toggleRunning}
                            >
                                {running ? "Stop" : "Scan"}
                            </Button>
                        </div>

                        <div className="absolute right-3 top-3 z-10 text-right">
                            <div className="bg-black/60 p-2 rounded text-xs text-white backdrop-blur-sm">
                                <div>Limit: {MIN_CONFIDENCE * 100}%</div>
                                {topFood && (
                                    <div className="font-bold text-emerald-400">
                                        {topFood.source.toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
