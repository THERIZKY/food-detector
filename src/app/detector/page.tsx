import { Suspense } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import FoodDetector from "@/components/food-detector";

export default function DetectorPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <main className="flex-1 overflow-hidden">
                <Suspense
                    fallback={
                        <div className="text-slate-400 text-center">
                            Loading camera...
                        </div>
                    }
                >
                    <FoodDetector />
                </Suspense>
            </main>
            <BottomNavigation />
        </div>
    );
}
