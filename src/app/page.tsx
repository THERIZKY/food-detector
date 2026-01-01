import { Suspense } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import { ScanLine, Flame, Apple } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col text-white">
            <main className="flex-1 overflow-auto pb-24">
                <div className="w-full max-w-md mx-auto px-4 pt-8">
                    {/* Hero Section */}
                    <section className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-slate-300 mb-4">
                            <Apple size={14} />
                            AI Food Recognition
                        </div>

                        <h1 className="text-3xl font-extrabold leading-tight mb-3">
                            Deteksi Makanan <br />
                            <span className="text-emerald-400">
                                Hitung Kalori Instan
                            </span>
                        </h1>

                        <p className="text-slate-400 text-sm leading-relaxed">
                            Scan makananmu dan dapatkan informasi nutrisi secara
                            cepat, akurat, dan real-time langsung dari kamera.
                        </p>
                    </section>

                    {/* Primary Action */}
                    <section className="mb-10">
                        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold text-slate-950 shadow-lg shadow-emerald-500/20">
                            <ScanLine />
                            Mulai Scan Makanan
                        </button>
                    </section>

                    {/* Feature Highlights */}
                    <section className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <Flame className="text-orange-400 mb-2" />
                            <h3 className="font-semibold text-sm mb-1">
                                Kalori Akurat
                            </h3>
                            <p className="text-xs text-slate-400">
                                Estimasi kalori berbasis AI & data nutrisi.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <ScanLine className="text-emerald-400 mb-2" />
                            <h3 className="font-semibold text-sm mb-1">
                                Scan Instan
                            </h3>
                            <p className="text-xs text-slate-400">
                                Cukup arahkan kamera, tanpa input manual.
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            <BottomNavigation />
        </div>
    );
}
