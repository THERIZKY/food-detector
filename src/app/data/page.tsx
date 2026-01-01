import BottomNavigation from "@/components/bottom-navigation";

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
                            Daftar makanan dan informasi kalorinya
                        </p>
                    </div>

                    <div className="px-4 space-y-3">
                        {/* Placeholder for food data - will be replaced with actual data */}
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <h3 className="text-white font-semibold">Apple</h3>
                            <p className="text-emerald-500 text-sm">52 cal</p>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <h3 className="text-white font-semibold">Banana</h3>
                            <p className="text-emerald-500 text-sm">89 cal</p>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <h3 className="text-white font-semibold">
                                Chicken Breast
                            </h3>
                            <p className="text-emerald-500 text-sm">165 cal</p>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
