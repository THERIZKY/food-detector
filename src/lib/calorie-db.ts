export type CalorieInfo = {
    value: number;
    unit: "kcal/serving" | "kcal/100g";
    note?: string;
};

// values are approximate for demo purposes
export const CALORIE_DB: Record<string, CalorieInfo> = {
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
    "koko crunch": { value: 120, unit: "kcal/serving", note: "Guribee layers" },
    "nestle honey star": { value: 110, unit: "kcal/serving" },
    guribee: { value: 80, unit: "kcal/serving", note: "Guribee layers" },
    potabee: { value: 160, unit: "kcal/serving", note: "Potabee" },
    taro: { value: 90, unit: "kcal/serving", note: "Taro net" },
    kusuka: { value: 100, unit: "kcal/serving", note: "Kusuka" },
    chimi: { value: 110, unit: "kcal/serving", note: "Chimi keripik ubi" },
    qtela: { value: 100, unit: "kcal/serving", note: "Qtela" },

    // Indonesian snacks
    "chitato sapi panggang": {
        value: 110,
        unit: "kcal/serving",
        note: "16 pcs",
    },
    "lays rumput laut": { value: 110, unit: "kcal/serving", note: "1 bungkus" },
    "guribee layers": { value: 80, unit: "kcal/serving", note: "1 porsi sdg" },

    // International chips & crisps
    "doritos nacho cheese": {
        value: 150,
        unit: "kcal/serving",
        note: "12 chips",
    },
    "cheetos crunchy": { value: 150, unit: "kcal/serving", note: "21 pcs" },
    "pringles original": { value: 150, unit: "kcal/serving", note: "16 chips" },
    "tostitos tortilla chips": {
        value: 140,
        unit: "kcal/serving",
        note: "7 chips",
    },
    "takis fuego": { value: 140, unit: "kcal/serving", note: "12 pieces" },
    "funyuns onion rings": {
        value: 140,
        unit: "kcal/serving",
        note: "13 rings",
    },
    "sunchips harvest cheddar": {
        value: 140,
        unit: "kcal/serving",
        note: "15 chips",
    },
    "ritz crackers": { value: 80, unit: "kcal/serving", note: "5 crackers" },
    "goldfish crackers": {
        value: 140,
        unit: "kcal/serving",
        note: "55 pieces",
    },
    "wheat thins": { value: 140, unit: "kcal/serving", note: "16 crackers" },
    "kettle brand sea salt chips": {
        value: 150,
        unit: "kcal/serving",
        note: "13 chips",
    },
    "walkers crisps (uk)": { value: 130, unit: "kcal/serving", note: "1 pack" },

    // Chocolate & candy
    "oreo sandwich cookies": {
        value: 140,
        unit: "kcal/serving",
        note: "3 cookies",
    },
    "snickers bar": { value: 250, unit: "kcal/serving", note: "1 bar" },
    "kitkat milk chocolate": {
        value: 210,
        unit: "kcal/serving",
        note: "1 bar (4 fingers)",
    },
    "m&m's milk chocolate": {
        value: 140,
        unit: "kcal/serving",
        note: "1 pack kecil",
    },
    "twix caramel": {
        value: 250,
        unit: "kcal/serving",
        note: "1 pack (2 bars)",
    },
    "skittles original": {
        value: 160,
        unit: "kcal/serving",
        note: "1 pack kecil",
    },
    "kinder bueno": { value: 122, unit: "kcal/serving", note: "1 bar" },
    "ferrero rocher": { value: 73, unit: "kcal/serving", note: "1 piece" },
    "lindt excellence 70% dark": {
        value: 170,
        unit: "kcal/serving",
        note: "3 squares",
    },
    "toblerone milk choco": {
        value: 180,
        unit: "kcal/serving",
        note: "3 triangles",
    },
    "milka alpine milk": {
        value: 165,
        unit: "kcal/serving",
        note: "3 squares",
    },
    "cadbury dairy milk": {
        value: 135,
        unit: "kcal/serving",
        note: "1 small bar",
    },
    "nutella b-ready": { value: 115, unit: "kcal/serving", note: "1 bar" },
    "reese's peanut butter cups": {
        value: 210,
        unit: "kcal/serving",
        note: "2 cups",
    },
    "hershey's milk choco": { value: 210, unit: "kcal/serving", note: "1 bar" },
    "mars bar": { value: 230, unit: "kcal/serving", note: "1 bar" },
    "bounty mini": { value: 135, unit: "kcal/serving", note: "1 mini bar" },
    maltesers: { value: 185, unit: "kcal/serving", note: "1 pack kecil" },
    "aero peppermint": { value: 145, unit: "kcal/serving", note: "1 bar" },
    "smarties (nestle)": { value: 160, unit: "kcal/serving", note: "1 tube" },
    "milky way": { value: 240, unit: "kcal/serving", note: "1 bar" },

    // Cookies & biscuits
    "belvita breakfast biscuits": {
        value: 230,
        unit: "kcal/serving",
        note: "1 pack (4 biscuits)",
    },
    "nature valley oats & honey": {
        value: 190,
        unit: "kcal/serving",
        note: "2 bars",
    },
    "kellogg's rice krispies treat": {
        value: 90,
        unit: "kcal/serving",
        note: "1 bar",
    },
    "quaker chewy granola bar": {
        value: 100,
        unit: "kcal/serving",
        note: "1 bar",
    },
    "cliff bar energy bar": { value: 250, unit: "kcal/serving", note: "1 bar" },
    "biscoff cookies": { value: 150, unit: "kcal/serving", note: "4 cookies" },
    "mcvitie's digestive": {
        value: 70,
        unit: "kcal/serving",
        note: "1 biscuit",
    },
    "walker's shortbread": {
        value: 100,
        unit: "kcal/serving",
        note: "1 finger",
    },
    "carr's water crackers": {
        value: 60,
        unit: "kcal/serving",
        note: "4 crackers",
    },
    "mary's gone crackers": {
        value: 140,
        unit: "kcal/serving",
        note: "13 crackers",
    },

    // Pastries & desserts
    "pop-tarts strawberry": {
        value: 200,
        unit: "kcal/serving",
        note: "1 pastry",
    },
    "hostess twinkies": { value: 135, unit: "kcal/serving", note: "1 cake" },
    "little debbie cosmic brownie": {
        value: 280,
        unit: "kcal/serving",
        note: "1 brownie",
    },
    "annie's bunny grahams": {
        value: 130,
        unit: "kcal/serving",
        note: "31 crackers",
    },

    // Gummies & chewy
    "haribo goldbears": { value: 100, unit: "kcal/serving", note: "13 bears" },
    "trolli sour brite crawlers": {
        value: 100,
        unit: "kcal/serving",
        note: "4 worms",
    },
    "welch's fruit snacks": {
        value: 80,
        unit: "kcal/serving",
        note: "1 pouch",
    },
    "hi-chew fruit chews": {
        value: 210,
        unit: "kcal/serving",
        note: "1 pack (10 pcs)",
    },

    // Jerky & nuts
    "slim jim giant": { value: 130, unit: "kcal/serving", note: "1 stick" },
    "jack link's beef jerky": { value: 80, unit: "kcal/serving", note: "1 oz" },
    "blue diamond almonds": {
        value: 170,
        unit: "kcal/serving",
        note: "28 nuts",
    },
    "wonderful pistachios": {
        value: 160,
        unit: "kcal/serving",
        note: "1/2 cup with shell",
    },
    "planters peanuts": { value: 160, unit: "kcal/serving", note: "1 oz" },

    // Popcorn & veggie chips
    "skinnypop popcorn": {
        value: 150,
        unit: "kcal/serving",
        note: "3 3/4 cups",
    },
    "boomchickapop sweet & salty": {
        value: 140,
        unit: "kcal/serving",
        note: "2 cups",
    },
    "snyder's pretzel pieces": {
        value: 140,
        unit: "kcal/serving",
        note: "1/3 cup",
    },
    "terra vegetable chips": {
        value: 150,
        unit: "kcal/serving",
        note: "17 chips",
    },
    "bare apple chips": { value: 110, unit: "kcal/serving", note: "1 bag" },
    "veggie straws": { value: 130, unit: "kcal/serving", note: "38 straws" },
    "popchips potato": { value: 120, unit: "kcal/serving", note: "23 chips" },

    // Asian snacks
    "pocky chocolate (japan)": {
        value: 180,
        unit: "kcal/serving",
        note: "1 pack",
    },
    "koala's march": { value: 150, unit: "kcal/serving", note: "1 small pack" },
    "calbee shrimp chips": { value: 140, unit: "kcal/serving", note: "1 oz" },
    "nongshim shrimp crackers": {
        value: 150,
        unit: "kcal/serving",
        note: "30 g",
    },
    "bin bin rice crackers": {
        value: 110,
        unit: "kcal/serving",
        note: "2 packs (4 pcs)",
    },
    "tao kae noi seaweed": { value: 30, unit: "kcal/serving", note: "1 pack" },
    "wasabi peas": { value: 120, unit: "kcal/serving", note: "1/4 cup" },
    "pretz salad flavor": { value: 110, unit: "kcal/serving", note: "1 pack" },
    "loacker wafer vanilla": {
        value: 150,
        unit: "kcal/serving",
        note: "4 wafers",
    },
    "jules destrooper butter thins": {
        value: 150,
        unit: "kcal/serving",
        note: "4 biscuits",
    },

    // Yogurt & frozen
    "yoplait strawberry yogurt": {
        value: 150,
        unit: "kcal/serving",
        note: "1 container",
    },
    "chobani greek yogurt": {
        value: 120,
        unit: "kcal/serving",
        note: "1 container",
    },
    "haagen-dazs vanilla mini": {
        value: 220,
        unit: "kcal/serving",
        note: "1 mini cup",
    },
    "ben & jerry's cookie dough": {
        value: 280,
        unit: "kcal/serving",
        note: "1/2 cup",
    },
    "magnum mini classic": { value: 150, unit: "kcal/serving", note: "1 bar" },
    "cornetto classico": { value: 210, unit: "kcal/serving", note: "1 cone" },

    // Protein & healthy bars
    "rxbar berry": { value: 210, unit: "kcal/serving", note: "1 bar" },
    "quest protein bar": { value: 190, unit: "kcal/serving", note: "1 bar" },
    "kind nut bar": { value: 200, unit: "kcal/serving", note: "1 bar" },

    // Other
    "sabra hummus with pretzels": {
        value: 380,
        unit: "kcal/serving",
        note: "1 snack cup",
    },
    "laughing cow cheese wedge": {
        value: 30,
        unit: "kcal/serving",
        note: "1 wedge",
    },
    "babybel mini cheese": { value: 70, unit: "kcal/serving", note: "1 piece" },
    "go-gurt squeeze yogurt": {
        value: 50,
        unit: "kcal/serving",
        note: "1 tube",
    },
    "mott's applesauce": { value: 50, unit: "kcal/serving", note: "1 cup" },
    "mentos rainbow": { value: 10, unit: "kcal/serving", note: "1 piece" },
    "tic tac mint": { value: 2, unit: "kcal/serving", note: "1 mint" },
    "trident sugar free gum": {
        value: 5,
        unit: "kcal/serving",
        note: "1 stick",
    },
};

export function getCaloriesForItem(label: string): CalorieInfo | null {
    const key = label.toLowerCase();
    return CALORIE_DB[key] ?? null;
}

export function categorizeFood(): Record<string, string[]> {
    const categories: Record<string, string[]> = {
        "indonesian snacks": [],
        "international chips": [],
        "chocolate & candy": [],
        "cookies & biscuits": [],
        "pastries & desserts": [],
        "gummies & chewy": [],
        "jerky & nuts": [],
        "popcorn & veggie chips": [],
        "asian snacks": [],
        "yogurt & frozen": [],
        "protein & healthy": [],
        "fruits & vegetables": [],
        other: [],
    };

    const categoryMap: Record<string, string> = {
        // Indonesian snacks
        "chitato sapi panggang": "indonesian snacks",
        "lays rumput laut": "indonesian snacks",
        "koko crunch": "indonesian snacks",
        "nestle honey star": "indonesian snacks",
        "guribee layers": "indonesian snacks",
        potabee: "indonesian snacks",
        "taro net": "indonesian snacks",
        kusuka: "indonesian snacks",
        "chimi keripik ubi": "indonesian snacks",
        qtela: "indonesian snacks",
        chitato: "indonesian snacks",
        lays: "indonesian snacks",
        guribee: "indonesian snacks",
        taro: "indonesian snacks",
        chimi: "indonesian snacks",

        // International chips
        "doritos nacho cheese": "international chips",
        "cheetos crunchy": "international chips",
        "pringles original": "international chips",
        "tostitos tortilla chips": "international chips",
        "takis fuego": "international chips",
        "funyuns onion rings": "international chips",
        "sunchips harvest cheddar": "international chips",
        "ritz crackers": "international chips",
        "goldfish crackers": "international chips",
        "wheat thins": "international chips",
        "kettle brand sea salt chips": "international chips",
        "walkers crisps (uk)": "international chips",

        // Chocolate & candy
        "oreo sandwich cookies": "chocolate & candy",
        "snickers bar": "chocolate & candy",
        "kitkat milk chocolate": "chocolate & candy",
        "m&m's milk chocolate": "chocolate & candy",
        "twix caramel": "chocolate & candy",
        "skittles original": "chocolate & candy",
        "kinder bueno": "chocolate & candy",
        "ferrero rocher": "chocolate & candy",
        "lindt excellence 70% dark": "chocolate & candy",
        "toblerone milk choco": "chocolate & candy",
        "milka alpine milk": "chocolate & candy",
        "cadbury dairy milk": "chocolate & candy",
        "nutella b-ready": "chocolate & candy",
        "reese's peanut butter cups": "chocolate & candy",
        "hershey's milk choco": "chocolate & candy",
        "mars bar": "chocolate & candy",
        "bounty mini": "chocolate & candy",
        maltesers: "chocolate & candy",
        "aero peppermint": "chocolate & candy",
        "smarties (nestle)": "chocolate & candy",
        "milky way": "chocolate & candy",

        // Cookies & biscuits
        "belvita breakfast biscuits": "cookies & biscuits",
        "nature valley oats & honey": "cookies & biscuits",
        "kellogg's rice krispies treat": "cookies & biscuits",
        "quaker chewy granola bar": "cookies & biscuits",
        "cliff bar energy bar": "cookies & biscuits",
        "biscoff cookies": "cookies & biscuits",
        "mcvitie's digestive": "cookies & biscuits",
        "walker's shortbread": "cookies & biscuits",
        "carr's water crackers": "cookies & biscuits",
        "mary's gone crackers": "cookies & biscuits",

        // Pastries & desserts
        "pop-tarts strawberry": "pastries & desserts",
        "hostess twinkies": "pastries & desserts",
        "little debbie cosmic brownie": "pastries & desserts",
        "annie's bunny grahams": "pastries & desserts",

        // Gummies & chewy
        "haribo goldbears": "gummies & chewy",
        "trolli sour brite crawlers": "gummies & chewy",
        "welch's fruit snacks": "gummies & chewy",
        "hi-chew fruit chews": "gummies & chewy",

        // Jerky & nuts
        "slim jim giant": "jerky & nuts",
        "jack link's beef jerky": "jerky & nuts",
        "blue diamond almonds": "jerky & nuts",
        "wonderful pistachios": "jerky & nuts",
        "planters peanuts": "jerky & nuts",

        // Popcorn & veggie chips
        "skinnypop popcorn": "popcorn & veggie chips",
        "boomchickapop sweet & salty": "popcorn & veggie chips",
        "snyder's pretzel pieces": "popcorn & veggie chips",
        "terra vegetable chips": "popcorn & veggie chips",
        "bare apple chips": "popcorn & veggie chips",
        "veggie straws": "popcorn & veggie chips",
        "popchips potato": "popcorn & veggie chips",

        // Asian snacks
        "pocky chocolate (japan)": "asian snacks",
        "koala's march": "asian snacks",
        "calbee shrimp chips": "asian snacks",
        "nongshim shrimp crackers": "asian snacks",
        "bin bin rice crackers": "asian snacks",
        "tao kae noi seaweed": "asian snacks",
        "wasabi peas": "asian snacks",
        "pretz salad flavor": "asian snacks",
        "loacker wafer vanilla": "asian snacks",
        "jules destrooper butter thins": "asian snacks",

        // Yogurt & frozen
        "yoplait strawberry yogurt": "yogurt & frozen",
        "chobani greek yogurt": "yogurt & frozen",
        "haagen-dazs vanilla mini": "yogurt & frozen",
        "ben & jerry's cookie dough": "yogurt & frozen",
        "magnum mini classic": "yogurt & frozen",
        "cornetto classico": "yogurt & frozen",

        // Protein & healthy
        "rxbar berry": "protein & healthy",
        "quest protein bar": "protein & healthy",
        "kind nut bar": "protein & healthy",

        // Fruits & vegetables
        banana: "fruits & vegetables",
        apple: "fruits & vegetables",
        broccoli: "fruits & vegetables",

        // Other
        "sabra hummus with pretzels": "other",
        "laughing cow cheese wedge": "other",
        "babybel mini cheese": "other",
        "go-gurt squeeze yogurt": "other",
        "mott's applesauce": "other",
        "mentos rainbow": "other",
        "tic tac mint": "other",
        "trident sugar free gum": "other",
        sandwich: "other",
        "hot dog": "other",
        pizza: "other",
        donut: "other",
        cake: "other",
    };

    Object.keys(CALORIE_DB).forEach((food) => {
        const category = categoryMap[food.toLowerCase()] || "other";
        if (!categories[category].includes(food)) {
            categories[category].push(food);
        }
    });

    return categories;
}
