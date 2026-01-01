"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, Database, Settings } from "lucide-react";

export default function BottomNavigation() {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/",
            label: "Home",
            icon: Home,
            active: pathname === "/",
        },
        {
            href: "/detector",
            label: "Detector",
            icon: Utensils,
            active: pathname === "/detector",
        },
        {
            href: "/data",
            label: "Data",
            icon: Database,
            active: pathname === "/data",
        },
        {
            href: "/settings",
            label: "Settings",
            icon: Settings,
            active: pathname === "/settings",
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 z-50">
            <div className="max-w-md mx-auto flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                                item.active
                                    ? "text-emerald-500 border-t-2 border-emerald-500"
                                    : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
