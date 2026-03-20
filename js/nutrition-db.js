// ============================================================================
// NUTRITION DATABASE - Valeurs nutritionnelles pour 100g
// Sources : USDA FoodData Central, CIQUAL (ANSES)
// Derniere mise a jour : Mars 2026
// ============================================================================

const NUTRITION_DB = {

    // ========================================================================
    // PROTEINES
    // ========================================================================

    poulet_grille: {
        name: "Poulet grillé (blanc)",
        cal: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0
    },

    saumon: {
        name: "Saumon (filet)",
        cal: 208,
        protein: 20,
        carbs: 0,
        fat: 13.4,
        fiber: 0
    },

    thon_conserve: {
        name: "Thon en conserve (au naturel)",
        cal: 116,
        protein: 25.5,
        carbs: 0,
        fat: 1,
        fiber: 0
    },

    boeuf_hache_5: {
        name: "Boeuf haché 5% MG",
        cal: 137,
        protein: 21.4,
        carbs: 0,
        fat: 5,
        fiber: 0
    },

    dinde: {
        name: "Escalope de dinde",
        cal: 135,
        protein: 29.3,
        carbs: 0,
        fat: 1.5,
        fiber: 0
    },

    crevettes: {
        name: "Crevettes cuites",
        cal: 99,
        protein: 20.9,
        carbs: 0.2,
        fat: 1.7,
        fiber: 0
    },

    oeuf: {
        name: "Oeuf entier",
        cal: 143,
        protein: 12.6,
        carbs: 0.7,
        fat: 9.5,
        fiber: 0,
        unit: {
            unitWeight: 55,
            cal: 78,
            protein: 6.3,
            carbs: 0.4,
            fat: 5.3
        }
    },

    jambon_blanc: {
        name: "Jambon blanc découenné",
        cal: 115,
        protein: 19,
        carbs: 0.8,
        fat: 3.5,
        fiber: 0
    },

    blanc_oeuf: {
        name: "Blanc d'oeuf",
        cal: 52,
        protein: 10.9,
        carbs: 0.7,
        fat: 0.2,
        fiber: 0,
        unit: {
            unitWeight: 33,
            cal: 17,
            protein: 3.6,
            carbs: 0.2,
            fat: 0.1
        }
    },

    cabillaud: {
        name: "Cabillaud (filet)",
        cal: 82,
        protein: 17.8,
        carbs: 0,
        fat: 0.7,
        fiber: 0
    },

    tofu: {
        name: "Tofu ferme",
        cal: 144,
        protein: 15.6,
        carbs: 2.3,
        fat: 8.7,
        fiber: 1.2
    },

    porc_filet: {
        name: "Filet de porc",
        cal: 143,
        protein: 26,
        carbs: 0,
        fat: 3.5,
        fiber: 0
    },

    agneau_gigot: {
        name: "Gigot d'agneau",
        cal: 175,
        protein: 25,
        carbs: 0,
        fat: 8,
        fiber: 0
    },

    canard_filet: {
        name: "Filet de canard (sans peau)",
        cal: 135,
        protein: 24,
        carbs: 0,
        fat: 4,
        fiber: 0
    },

    moules: {
        name: "Moules cuites",
        cal: 86,
        protein: 12,
        carbs: 3.7,
        fat: 2.2,
        fiber: 0
    },

    calamar: {
        name: "Calamar",
        cal: 92,
        protein: 15.6,
        carbs: 3.1,
        fat: 1.4,
        fiber: 0
    },

    gambas: {
        name: "Gambas",
        cal: 85,
        protein: 18,
        carbs: 0,
        fat: 1.2,
        fiber: 0
    },

    truite: {
        name: "Truite",
        cal: 141,
        protein: 20,
        carbs: 0,
        fat: 6.6,
        fiber: 0
    },

    sardines_conserve: {
        name: "Sardines en conserve",
        cal: 208,
        protein: 24.6,
        carbs: 0,
        fat: 11.5,
        fiber: 0
    },

    tempeh: {
        name: "Tempeh",
        cal: 192,
        protein: 20,
        carbs: 7.6,
        fat: 10.8,
        fiber: 0
    },

    seitan: {
        name: "Seitan",
        cal: 150,
        protein: 28,
        carbs: 6,
        fat: 1,
        fiber: 0
    },

    // ========================================================================
    // PRODUITS LAITIERS
    // ========================================================================

    skyr_0: {
        name: "Skyr 0%",
        cal: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.2,
        fiber: 0
    },

    fromage_blanc_0: {
        name: "Fromage blanc 0%",
        cal: 46,
        protein: 7.5,
        carbs: 3.8,
        fat: 0.2,
        fiber: 0
    },

    cottage_cheese: {
        name: "Cottage cheese",
        cal: 98,
        protein: 11.1,
        carbs: 3.4,
        fat: 4.3,
        fiber: 0
    },

    lait_demi: {
        name: "Lait demi-écrémé",
        cal: 46,
        protein: 3.2,
        carbs: 4.8,
        fat: 1.6,
        fiber: 0
    },

    fromage_rape: {
        name: "Emmental râpé",
        cal: 380,
        protein: 27.4,
        carbs: 0.5,
        fat: 29.7,
        fiber: 0
    },

    mozzarella: {
        name: "Mozzarella",
        cal: 280,
        protein: 22.2,
        carbs: 2.2,
        fat: 20.3,
        fiber: 0
    },

    chevre_frais: {
        name: "Chèvre frais",
        cal: 209,
        protein: 12.8,
        carbs: 1,
        fat: 17,
        fiber: 0
    },

    ricotta: {
        name: "Ricotta",
        cal: 174,
        protein: 11.3,
        carbs: 3,
        fat: 13,
        fiber: 0
    },

    parmesan: {
        name: "Parmesan (Parmigiano Reggiano)",
        cal: 431,
        protein: 38.5,
        carbs: 3.2,
        fat: 29.7,
        fiber: 0
    },

    creme_fraiche_legere: {
        name: "Crème fraîche légère 15%",
        cal: 161,
        protein: 2.6,
        carbs: 3.5,
        fat: 15,
        fiber: 0
    },

    lait_coco: {
        name: "Lait de coco (conserve)",
        cal: 197,
        protein: 2.2,
        carbs: 2.7,
        fat: 19.7,
        fiber: 0
    },

    yaourt_grec: {
        name: "Yaourt grec nature",
        cal: 97,
        protein: 9,
        carbs: 3.6,
        fat: 5,
        fiber: 0
    },

    feta: {
        name: "Feta",
        cal: 264,
        protein: 14.2,
        carbs: 4.1,
        fat: 21.3,
        fiber: 0
    },

    lait_avoine: {
        name: "Lait d'avoine",
        cal: 46,
        protein: 1,
        carbs: 8,
        fat: 1.5,
        fiber: 0
    },

    // ========================================================================
    // GLUCIDES / FECULENTS
    // ========================================================================

    riz_basmati_cuit: {
        name: "Riz basmati cuit",
        cal: 130,
        protein: 2.7,
        carbs: 28.2,
        fat: 0.3,
        fiber: 0.4
    },

    pates_cuites: {
        name: "Pâtes cuites",
        cal: 158,
        protein: 5.8,
        carbs: 30.6,
        fat: 0.9,
        fiber: 1.8
    },

    quinoa_cuit: {
        name: "Quinoa cuit",
        cal: 120,
        protein: 4.4,
        carbs: 21.3,
        fat: 1.9,
        fiber: 2.8
    },

    patate_douce_cuite: {
        name: "Patate douce cuite",
        cal: 90,
        protein: 2,
        carbs: 20.7,
        fat: 0.1,
        fiber: 3.3
    },

    flocons_avoine: {
        name: "Flocons d'avoine (crus)",
        cal: 379,
        protein: 13.2,
        carbs: 67.7,
        fat: 6.5,
        fiber: 10.1
    },

    pain_complet: {
        name: "Pain complet",
        cal: 247,
        protein: 9.7,
        carbs: 43.1,
        fat: 3.4,
        fiber: 6.8
    },

    tortilla_ble: {
        name: "Tortilla de blé complet",
        cal: 295,
        protein: 8.8,
        carbs: 44,
        fat: 8.5,
        fiber: 4.5,
        unit: {
            unitWeight: 45,
            cal: 133,
            protein: 4,
            carbs: 19.8,
            fat: 3.8
        }
    },

    farine_complete: {
        name: "Farine complète",
        cal: 340,
        protein: 13.2,
        carbs: 61.5,
        fat: 2.5,
        fiber: 10.7
    },

    pain_mie_complet: {
        name: "Pain de mie complet",
        cal: 248,
        protein: 9.5,
        carbs: 42,
        fat: 4.2,
        fiber: 5.9,
        unit: {
            unitWeight: 28,
            cal: 69,
            protein: 2.7,
            carbs: 11.8,
            fat: 1.2
        }
    },

    galette_sarrasin: {
        name: "Galette de sarrasin",
        cal: 160,
        protein: 6,
        carbs: 30,
        fat: 1.5,
        fiber: 2.5,
        unit: {
            unitWeight: 50,
            cal: 80,
            protein: 3,
            carbs: 15,
            fat: 0.8
        }
    },

    galette_riz: {
        name: "Galette de riz soufflé",
        cal: 387,
        protein: 7.1,
        carbs: 85.8,
        fat: 2.8,
        fiber: 1.6,
        unit: {
            unitWeight: 9,
            cal: 35,
            protein: 0.6,
            carbs: 7.7,
            fat: 0.3
        }
    },

    nouilles_soba_cuites: {
        name: "Nouilles soba cuites",
        cal: 99,
        protein: 5.1,
        carbs: 21.4,
        fat: 0.1,
        fiber: 1.5
    },

    riz_complet_cuit: {
        name: "Riz complet cuit",
        cal: 123,
        protein: 2.7,
        carbs: 25.6,
        fat: 1,
        fiber: 1.8
    },

    corn_flakes: {
        name: "Corn flakes",
        cal: 378,
        protein: 7,
        carbs: 84,
        fat: 0.9,
        fiber: 3.3
    },

    granola: {
        name: "Granola",
        cal: 450,
        protein: 10,
        carbs: 58,
        fat: 18.5,
        fiber: 6
    },

    boulgour_cuit: {
        name: "Boulgour cuit",
        cal: 83,
        protein: 3.1,
        carbs: 18.6,
        fat: 0.2,
        fiber: 4.5
    },

    couscous_cuit: {
        name: "Couscous cuit",
        cal: 112,
        protein: 3.8,
        carbs: 23.2,
        fat: 0.2,
        fiber: 1.4
    },

    pomme_de_terre: {
        name: "Pomme de terre cuite",
        cal: 87,
        protein: 1.9,
        carbs: 20.1,
        fat: 0.1,
        fiber: 1.8
    },

    pain_pita: {
        name: "Pain pita complet",
        cal: 266,
        protein: 9.8,
        carbs: 55,
        fat: 1.2,
        fiber: 7.4,
        unit: {
            unitWeight: 60,
            cal: 160,
            protein: 5.9,
            carbs: 33,
            fat: 0.7
        }
    },

    vermicelles_riz: {
        name: "Vermicelles de riz cuits",
        cal: 109,
        protein: 0.9,
        carbs: 25.9,
        fat: 0.2,
        fiber: 1
    },

    // ========================================================================
    // FRUITS
    // ========================================================================

    banane: {
        name: "Banane",
        cal: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3,
        fiber: 2.6
    },

    pomme: {
        name: "Pomme",
        cal: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2,
        fiber: 2.4
    },

    fruits_rouges: {
        name: "Fruits rouges (mélange)",
        cal: 45,
        protein: 0.9,
        carbs: 10.2,
        fat: 0.3,
        fiber: 3.5
    },

    myrtilles: {
        name: "Myrtilles",
        cal: 57,
        protein: 0.7,
        carbs: 14.5,
        fat: 0.3,
        fiber: 2.4
    },

    fraises: {
        name: "Fraises",
        cal: 32,
        protein: 0.7,
        carbs: 7.7,
        fat: 0.3,
        fiber: 2
    },

    mangue: {
        name: "Mangue",
        cal: 60,
        protein: 0.8,
        carbs: 15,
        fat: 0.4,
        fiber: 1.6
    },

    acai_puree: {
        name: "Purée d'açaï surgelée",
        cal: 70,
        protein: 1,
        carbs: 4,
        fat: 5,
        fiber: 3
    },

    ananas: {
        name: "Ananas",
        cal: 50,
        protein: 0.5,
        carbs: 13.1,
        fat: 0.1,
        fiber: 1.4
    },

    kiwi: {
        name: "Kiwi",
        cal: 61,
        protein: 1.1,
        carbs: 14.7,
        fat: 0.5,
        fiber: 3
    },

    orange: {
        name: "Orange",
        cal: 47,
        protein: 0.9,
        carbs: 11.8,
        fat: 0.1,
        fiber: 2.4
    },

    citron_jus: {
        name: "Jus de citron",
        cal: 22,
        protein: 0.4,
        carbs: 6.9,
        fat: 0.2,
        fiber: 0.3
    },

    // ========================================================================
    // LEGUMES
    // ========================================================================

    brocoli: {
        name: "Brocoli",
        cal: 34,
        protein: 2.8,
        carbs: 7,
        fat: 0.4,
        fiber: 2.6
    },

    courgette: {
        name: "Courgette",
        cal: 17,
        protein: 1.2,
        carbs: 3.1,
        fat: 0.3,
        fiber: 1
    },

    tomate: {
        name: "Tomate",
        cal: 18,
        protein: 0.9,
        carbs: 3.9,
        fat: 0.2,
        fiber: 1.2
    },

    epinards: {
        name: "Épinards (crus)",
        cal: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4,
        fiber: 2.2
    },

    poivron_rouge: {
        name: "Poivron rouge",
        cal: 31,
        protein: 1,
        carbs: 6,
        fat: 0.3,
        fiber: 2.1
    },

    oignon: {
        name: "Oignon",
        cal: 40,
        protein: 1.1,
        carbs: 9.3,
        fat: 0.1,
        fiber: 1.7
    },

    champignon: {
        name: "Champignon de Paris",
        cal: 22,
        protein: 3.1,
        carbs: 3.3,
        fat: 0.3,
        fiber: 1
    },

    mais: {
        name: "Maïs doux (épi)",
        cal: 86,
        protein: 3.3,
        carbs: 19,
        fat: 1.4,
        fiber: 2.7
    },

    salade_verte: {
        name: "Salade verte (laitue)",
        cal: 15,
        protein: 1.4,
        carbs: 2.9,
        fat: 0.2,
        fiber: 1.3
    },

    concombre: {
        name: "Concombre",
        cal: 12,
        protein: 0.6,
        carbs: 2.2,
        fat: 0.2,
        fiber: 0.7
    },

    carotte: {
        name: "Carotte",
        cal: 41,
        protein: 0.9,
        carbs: 9.6,
        fat: 0.2,
        fiber: 2.8
    },

    haricots_verts: {
        name: "Haricots verts",
        cal: 31,
        protein: 1.8,
        carbs: 7,
        fat: 0.1,
        fiber: 3.4
    },

    aubergine: {
        name: "Aubergine",
        cal: 25,
        protein: 1,
        carbs: 5.9,
        fat: 0.2,
        fiber: 3
    },

    chou_fleur: {
        name: "Chou-fleur",
        cal: 25,
        protein: 1.9,
        carbs: 5,
        fat: 0.3,
        fiber: 2
    },

    patate_douce_crue: {
        name: "Patate douce (crue)",
        cal: 86,
        protein: 1.6,
        carbs: 20.1,
        fat: 0.1,
        fiber: 3
    },

    betterave_cuite: {
        name: "Betterave cuite",
        cal: 44,
        protein: 1.7,
        carbs: 9.6,
        fat: 0.2,
        fiber: 2
    },

    avocat: {
        name: "Avocat",
        cal: 160,
        protein: 2,
        carbs: 8.5,
        fat: 14.7,
        fiber: 6.7
    },

    chou_rouge: {
        name: "Chou rouge",
        cal: 31,
        protein: 1.4,
        carbs: 7.4,
        fat: 0.2,
        fiber: 2.1
    },

    fenouil: {
        name: "Fenouil",
        cal: 31,
        protein: 1.2,
        carbs: 7.3,
        fat: 0.2,
        fiber: 3.1
    },

    celeri_branche: {
        name: "Céleri branche",
        cal: 14,
        protein: 0.7,
        carbs: 3,
        fat: 0.2,
        fiber: 1.6
    },

    radis: {
        name: "Radis",
        cal: 16,
        protein: 0.7,
        carbs: 3.4,
        fat: 0.1,
        fiber: 1.6
    },

    petits_pois: {
        name: "Petits pois",
        cal: 81,
        protein: 5.4,
        carbs: 14.5,
        fat: 0.4,
        fiber: 5.7
    },

    edamame: {
        name: "Edamame",
        cal: 121,
        protein: 11.9,
        carbs: 8.9,
        fat: 5.2,
        fiber: 5.2
    },

    asperges: {
        name: "Asperges",
        cal: 20,
        protein: 2.2,
        carbs: 3.9,
        fat: 0.1,
        fiber: 2.1
    },

    poireaux: {
        name: "Poireaux",
        cal: 31,
        protein: 1.5,
        carbs: 7.3,
        fat: 0.3,
        fiber: 1.8
    },

    chou_kale: {
        name: "Chou kale",
        cal: 49,
        protein: 4.3,
        carbs: 8.8,
        fat: 0.9,
        fiber: 3.6
    },

    // ========================================================================
    // LEGUMINEUSES
    // ========================================================================

    haricots_noirs: {
        name: "Haricots noirs cuits",
        cal: 132,
        protein: 8.9,
        carbs: 23.7,
        fat: 0.5,
        fiber: 8.7
    },

    lentilles_cuites: {
        name: "Lentilles cuites",
        cal: 116,
        protein: 9,
        carbs: 20.1,
        fat: 0.4,
        fiber: 7.9
    },

    pois_chiches_cuits: {
        name: "Pois chiches cuits",
        cal: 164,
        protein: 8.9,
        carbs: 27.4,
        fat: 2.6,
        fiber: 7.6
    },

    haricots_rouges: {
        name: "Haricots rouges cuits",
        cal: 127,
        protein: 8.7,
        carbs: 22.8,
        fat: 0.5,
        fiber: 6.4
    },

    // ========================================================================
    // MATIERES GRASSES / OLEAGINEUX / GRAINES
    // ========================================================================

    huile_olive: {
        name: "Huile d'olive",
        cal: 884,
        protein: 0,
        carbs: 0,
        fat: 100,
        fiber: 0
    },

    beurre_cacahuete: {
        name: "Beurre de cacahuète",
        cal: 588,
        protein: 25.1,
        carbs: 20,
        fat: 50.4,
        fiber: 6.1
    },

    amandes: {
        name: "Amandes",
        cal: 579,
        protein: 21.2,
        carbs: 21.7,
        fat: 49.9,
        fiber: 12.5
    },

    noix: {
        name: "Noix",
        cal: 654,
        protein: 15.2,
        carbs: 13.7,
        fat: 65.2,
        fiber: 6.7
    },

    noix_coco_rapee: {
        name: "Noix de coco râpée (desséchée)",
        cal: 660,
        protein: 6.9,
        carbs: 23.7,
        fat: 64.5,
        fiber: 16.3
    },

    graines_chia: {
        name: "Graines de chia",
        cal: 486,
        protein: 16.5,
        carbs: 42.1,
        fat: 30.7,
        fiber: 34.4
    },

    graines_lin: {
        name: "Graines de lin",
        cal: 534,
        protein: 18.3,
        carbs: 28.9,
        fat: 42.2,
        fiber: 27.3
    },

    // ========================================================================
    // SAUCES / CONDIMENTS
    // ========================================================================

    sauce_soja: {
        name: "Sauce soja",
        cal: 53,
        protein: 8.1,
        carbs: 4.9,
        fat: 0.6,
        fiber: 0.8
    },

    pesto: {
        name: "Pesto alla genovese",
        cal: 387,
        protein: 5,
        carbs: 4,
        fat: 38,
        fiber: 1.5
    },

    sauce_tomate: {
        name: "Sauce tomate (passata)",
        cal: 26,
        protein: 1.3,
        carbs: 4.6,
        fat: 0.2,
        fiber: 1.3
    },

    concentre_tomate: {
        name: "Concentré de tomate",
        cal: 82,
        protein: 4.3,
        carbs: 18.9,
        fat: 0.5,
        fiber: 4.1
    },

    creme_coco: {
        name: "Crème de coco",
        cal: 230,
        protein: 2.3,
        carbs: 3.3,
        fat: 23.8,
        fiber: 0
    },

    pate_curry: {
        name: "Pâte de curry",
        cal: 113,
        protein: 2,
        carbs: 9,
        fat: 7.5,
        fiber: 3
    },

    mais_conserve: {
        name: "Maïs en conserve (égoutté)",
        cal: 82,
        protein: 2.4,
        carbs: 17.5,
        fat: 0.8,
        fiber: 1.9
    },

    sauce_sriracha: {
        name: "Sauce sriracha",
        cal: 93,
        protein: 2,
        carbs: 18.5,
        fat: 1,
        fiber: 2
    },

    sauce_tahini: {
        name: "Tahini (pâte de sésame)",
        cal: 595,
        protein: 17,
        carbs: 21,
        fat: 54,
        fiber: 9
    },

    vinaigre_balsamique: {
        name: "Vinaigre balsamique",
        cal: 88,
        protein: 0.5,
        carbs: 17,
        fat: 0,
        fiber: 0
    },

    moutarde: {
        name: "Moutarde de Dijon",
        cal: 66,
        protein: 4,
        carbs: 5.8,
        fat: 3.3,
        fiber: 3.3
    },

    harissa: {
        name: "Harissa",
        cal: 79,
        protein: 3,
        carbs: 9,
        fat: 3,
        fiber: 5
    },

    sauce_nuoc_mam: {
        name: "Sauce nuoc-mâm (fish sauce)",
        cal: 35,
        protein: 5.1,
        carbs: 3.6,
        fat: 0,
        fiber: 0
    },

    // ========================================================================
    // AUTRES / SUCRANTS / SUPPLEMENTS
    // ========================================================================

    cacao_poudre: {
        name: "Cacao en poudre (non sucré)",
        cal: 228,
        protein: 19.6,
        carbs: 57.9,
        fat: 13.7,
        fiber: 33.2
    },

    miel: {
        name: "Miel",
        cal: 304,
        protein: 0.3,
        carbs: 82.4,
        fat: 0,
        fiber: 0.2
    },

    sirop_erable: {
        name: "Sirop d'érable",
        cal: 260,
        protein: 0,
        carbs: 67.2,
        fat: 0.1,
        fiber: 0
    },

    chocolat_noir_70: {
        name: "Chocolat noir 70%",
        cal: 598,
        protein: 7.8,
        carbs: 45.9,
        fat: 42.6,
        fiber: 10.9
    },

    whey_protein: {
        name: "Whey protéine (poudre)",
        cal: 400,
        protein: 80,
        carbs: 6.7,
        fat: 5,
        fiber: 0,
        unit: {
            unitWeight: 30,
            cal: 120,
            protein: 24,
            carbs: 2,
            fat: 1.5
        }
    },

    poudre_acai: {
        name: "Poudre d'açaï",
        cal: 534,
        protein: 8.1,
        carbs: 52.2,
        fat: 32.5,
        fiber: 33
    },

    lait_amande: {
        name: "Lait d'amande (non sucré)",
        cal: 15,
        protein: 0.6,
        carbs: 0.3,
        fat: 1.1,
        fiber: 0.2
    },

    // ========================================================================
    // ALIAS (raccourcis utilisés dans les recettes)
    // ========================================================================

    get oeufs() { return this.oeuf; },
    get poulet() { return this.poulet_grille; },
    get boeuf() { return this.boeuf_hache_5; },
    get emmental() { return this.fromage_rape; },
    get poivron() { return this.poivron_rouge; },
    get riz() { return this.riz_basmati_cuit; },
    get salade() { return this.salade_verte; },
    get whey() { return this.whey_protein; },
    get tortilla() { return this.tortilla_ble; },
    get lait() { return this.lait_demi; },
    get jambon() { return this.jambon_blanc; },
    get cacao() { return this.cacao_poudre; },
    get skyr() { return this.skyr_0; },
    get creme_legere() { return this.creme_fraiche_legere; },
    get quinoa() { return this.quinoa_cuit; },
    get patate_douce() { return this.patate_douce_cuite; },
    get soba() { return this.nouilles_soba_cuites; },
    get pois_chiches() { return this.pois_chiches_cuits; },
    get pates() { return this.pates_cuites; },
    get thon() { return this.thon_conserve; },
    get pain_mie() { return this.pain_mie_complet; },
    get fromage_blanc() { return this.fromage_blanc_0; },
    get chevre() { return this.chevre_frais; },
    get noix_de_coco_rapee() { return this.noix_coco_rapee; },
    get lentilles() { return this.lentilles_cuites; },

    // Ajouts pour nouvelles recettes
    chorizo: { label: "Chorizo", cal: 455, p: 24, g: 38, gl: 2 },
    lardons: { label: "Lardons fumés", cal: 330, p: 15, g: 30, gl: 1 },
    reblochon: { label: "Reblochon", cal: 335, p: 21, g: 28, gl: 0.5 },
    ail: { label: "Ail", cal: 149, p: 6, g: 0.5, gl: 33 },
    gingembre: { label: "Gingembre frais", cal: 80, p: 2, g: 0.7, gl: 18 },
    huile_sesame: { label: "Huile de sésame", cal: 884, p: 0, g: 100, gl: 0 },
    cacahuetes: { label: "Cacahuètes", cal: 567, p: 26, g: 49, gl: 16 },
    citron_vert: { label: "Citron vert (jus)", cal: 25, p: 0.4, g: 0.1, gl: 8 },
    creme_fraiche: { label: "Crème fraîche épaisse 15%", cal: 160, p: 2.5, g: 15, gl: 3.5 },
    feuilles_lasagne: { label: "Feuilles de lasagne", cal: 355, p: 12, g: 1.5, gl: 72 },
    farine: { label: "Farine de blé T55", cal: 350, p: 10, g: 1, gl: 73 },
    levure: { label: "Levure boulangère", cal: 105, p: 8, g: 0.5, gl: 19 },
    coriandre: { label: "Coriandre fraîche", cal: 23, p: 2, g: 0.5, gl: 4 }
};
