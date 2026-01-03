import BottomNavigation from "@/components/bottom-navigation";
import FoodAccordion from "@/components/food-accordion";

export default function DataPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col">
            <main className="flex-1 overflow-auto pb-20">
                <div className="w-full max-w-md mx-auto">
                    <div className="px-4 py-6">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Data Makanan
                        </h1>
                        <p className="text-sm text-slate-400 mb-6">
                            Jelajahi makanan dan informasi kalorinya per
                            kategori
                        </p>
                    </div>

                    <div className="px-4 pb-4">
                        <FoodAccordion />
                    </div>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
