import BottomNavigation from "@/components/bottom-navigation";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col">
            <main className="flex-1 overflow-auto pb-20">
                <div className="w-full max-w-md mx-auto">
                    <div className="px-4 py-6">
                        <h1 className="text-2xl font-bold text-white mb-6">
                            Settings
                        </h1>
                    </div>

                    <div className="px-4 space-y-4">
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <h3 className="text-white font-semibold mb-2">
                                Notifikasi
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Aktifkan notifikasi untuk rekomendasi makanan
                                sehat
                            </p>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <h3 className="text-white font-semibold mb-2">
                                Bahasa
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Pilih bahasa preferensi Anda
                            </p>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <h3 className="text-white font-semibold mb-2">
                                Tentang Aplikasi
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Versi 1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
