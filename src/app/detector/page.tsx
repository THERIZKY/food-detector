import { Suspense } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import FoodDetector from "@/components/food-detector";

export default function DetectorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col">
            <main className="flex-1 overflow-auto pb-20">
                <div className="w-full h-full max-w-md mx-auto">
                    <div className="px-4 py-6">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Calories Detector
                        </h1>
                        <p className="text-sm text-slate-400 mb-6">
                            Arahkan kamera ke makanan untuk deteksi otomatis
                        </p>
                    </div>

                    <Suspense
                        fallback={
                            <div className="text-slate-400 text-center py-8">
                                Loading camera...
                            </div>
                        }
                    >
                        <FoodDetector />
                    </Suspense>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
