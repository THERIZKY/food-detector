export type CalorieInfo = {
    value: number;
    unit: "kcal/serving" | "kcal/100g";
    note?: string;
};

// values are approximate for demo purposes
const CALORIE_DB: Record<string, CalorieInfo> = {
    banana: { value: 89, unit: "kcal/100g", note: "sekitar 1 buah = 118g" },
    apple: { value: 52, unit: "kcal/100g", note: "apel merah/hijau" },
    sandwich: {
        value: 300,
        unit: "kcal/serving",
        note: "sandwich isi standar",
    },
    "hot dog": {
        value: 290,
        unit: "kcal/serving",
        note: "roti + sosis + saus",
    },
    pizza: { value: 266, unit: "kcal/100g", note: "pizza keju" },
    donut: { value: 452, unit: "kcal/100g", note: "donat gula" },
    cake: { value: 350, unit: "kcal/100g", note: "kue bolu/krim" },
    broccoli: { value: 34, unit: "kcal/100g" },
    chitato: {
        value: 110,
        unit: "kcal/serving",
        note: "Chitato sapi panggang",
    },
    lays: { value: 110, unit: "kcal/serving", note: "Lays rumput laut" },
    "koko crunch": { value: 120, unit: "kcal/serving" },
    "nestle honey star": { value: 110, unit: "kcal/serving" },
    guribee: { value: 80, unit: "kcal/serving", note: "Guribee layers" },
    potabee: { value: 160, unit: "kcal/serving" },
    taro: { value: 90, unit: "kcal/serving", note: "Taro net" },
    kusuka: { value: 100, unit: "kcal/serving" },
    chimi: { value: 110, unit: "kcal/serving", note: "Chimi keripik ubi" },
    qtela: { value: 100, unit: "kcal/serving" },
};

export function getCaloriesForItem(label: string): CalorieInfo | null {
    const key = label.toLowerCase();
    return CALORIE_DB[key] ?? null;
}
