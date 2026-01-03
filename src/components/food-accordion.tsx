"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CALORIE_DB, categorizeFood } from "@/lib/calorie-db";

export default function FoodAccordion() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(
        null
    );

    const categories = categorizeFood();

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    return (
        <div className="space-y-2">
            {Object.entries(categories).map(([category, foods]) => (
                <div
                    key={category}
                    className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800/50"
                >
                    <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700/50 transition-colors"
                    >
                        <h3 className="font-semibold text-white capitalize">
                            {category}
                        </h3>
                        <ChevronDown
                            size={20}
                            className={`text-emerald-500 transition-transform ${
                                expandedCategory === category
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                    </button>

                    {expandedCategory === category && (
                        <div className="border-t border-slate-700 bg-slate-900/50">
                            <div className="space-y-2 p-3">
                                {foods.map((food, index) => {
                                    const info = CALORIE_DB[food.toLowerCase()];
                                    return (
                                        <div
                                            key={index}
                                            className="bg-slate-800 rounded p-3 border border-slate-700/50"
                                        >
                                            <div className="flex justify-between items-start gap-2 mb-1">
                                                <h4 className="text-white font-medium text-sm capitalize">
                                                    {food}
                                                </h4>
                                                <span className="text-emerald-500 font-bold whitespace-nowrap">
                                                    {info?.value}{" "}
                                                    {info?.unit ===
                                                    "kcal/serving"
                                                        ? "kkal"
                                                        : "kkal/100g"}
                                                </span>
                                            </div>
                                            {info?.note && (
                                                <p className="text-xs text-slate-400">
                                                    {info.note}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
