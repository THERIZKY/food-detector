/**
 * MODEL CONFIGURATION
 *
 * File ini mengatur path dan konfigurasi untuk 3 models:
 * 1. COCO-SSD (built-in) - untuk deteksi buah-buahan umum
 * 2. FRUITS_MODEL - custom model buah dari Teachable Machine
 * 3. SNACKS_MODEL - custom model snacks lokal dari Teachable Machine
 */

import { CALORIE_DB } from "./calorie-db"; // Declare the variable here

export const MODEL_CONFIG = {
    // COCO-SSD (bawaan, tidak perlu diganti)
    COCO: {
        name: "COCO-SSD",
        type: "coco-ssd",
        enabled: true,
    },

    // ===== FRUITS MODEL (Custom Teachable Machine) =====
    // INSTRUKSI:
    // 1. Buka https://teachablemachine.withgoogle.com/
    // 2. Buat project "Image Classification" dengan kategori buah-buahan
    // 3. Train dan export sebagai TensorFlow.js
    // 4. Download file model.json dan group1-shard1of1.bin
    // 5. Upload ke folder: public/models/fruits/
    // 6. Struktur folder harus seperti ini:
    //    public/models/fruits/
    //    ├── model.json
    //    ├── metadata.json
    //    └── group1-shard1of1.bin
    FRUITS: {
        name: "Fruits Model",
        type: "teachable-machine",
        modelPath: "/models/fruits/model.json",
        enabled: true, // Set ke TRUE setelah upload file
        description: "Custom model untuk deteksi buah-buahan",
    },

    // ===== SNACKS MODEL (Custom Teachable Machine) =====
    // INSTRUKSI:
    // 1. Buka https://teachablemachine.withgoogle.com/
    // 2. Buat project "Image Classification" dengan kategori snacks lokal:
    //    - Chitato
    //    - Lays
    //    - Koko Crunch
    //    - Nestle Honey Star
    //    - dll
    // 3. Train dan export sebagai TensorFlow.js
    // 4. Download file model.json dan group1-shard1of1.bin
    // 5. Upload ke folder: public/models/snacks/
    // 6. Struktur folder harus seperti ini:
    //    public/models/snacks/
    //    ├── model.json
    //    ├── metadata.json
    //    └── group1-shard1of1.bin
    SNACKS: {
        name: "Snacks Model",
        type: "teachable-machine",
        modelPath: "/models/snacks/model.json",
        enabled: true, // Set ke TRUE setelah upload file
        description: "Custom model untuk deteksi snacks Indonesia",
    },
} as const;

// Tipe untuk deteksi hasil dari berbagai model
export type ModelType = "coco-ssd" | "teachable-machine";

export type MergedDetection = {
    class: string;
    score: number;
    source: "coco" | "fruits" | "snacks"; // dari model mana deteksi ini
    bbox?: [number, number, number, number]; // hanya COCO yang punya bbox
};

export function fuzzyMatchFood(prediction: string): string | null {
    const foodKeys = Object.keys(CALORIE_DB);
    const predLower = prediction.toLowerCase().trim();

    // Exact match dulu
    if (CALORIE_DB[predLower]) {
        return predLower;
    }

    // Fuzzy match: cek apakah prediction ada di food key atau sebaliknya
    const match = foodKeys.find(
        (key) =>
            key.includes(predLower) ||
            predLower.includes(key) ||
            key.split(" ").some((word) => predLower.includes(word))
    );

    return match || null;
}
