/* ============================================
   AH COACHING — Recipe Detail Page
   Scaling engine + Dynamic rendering
   ============================================ */

(function() {
    'use strict';

    // --- SVG Icons ---
    var ICONS = {
        settings: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/></svg>',
        clipboard: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/></svg>',
        rocket: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>',
        bulb: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>',
        clock: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        bolt: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>',
        heart: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>'
    };

    // --- State ---
    var recipe = null;
    var portionMultiplier = 1.0;
    var proteinLevel = 'equilibre';
    var optionSelections = {};
    var servings = 1;
    var showRaw = false;

    // --- Get recipe from URL ---
    function getRecipeId() {
        var params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // --- Find recipe by ID ---
    function findRecipe(id) {
        for (var i = 0; i < RECIPES_DATA.length; i++) {
            if (RECIPES_DATA[i].id === id) return RECIPES_DATA[i];
        }
        return null;
    }

    // --- Get all active ingredients (base + option modifiers) ---
    function getActiveIngredients() {
        var ingredients = recipe.ingredients.slice();
        if (recipe.options) {
            recipe.options.forEach(function(opt) {
                var selected = optionSelections[opt.id] || opt.default;
                if (opt.modifiers && opt.modifiers[selected] && opt.modifiers[selected].add) {
                    ingredients = ingredients.concat(opt.modifiers[selected].add);
                }
            });
        }
        return ingredients;
    }

    // --- Calculate scaled quantity for an ingredient (per person, cooked) ---
    function getScaledQty(ing) {
        if (!ing.scalable) return ing.baseQty;
        var qty = ing.baseQty * portionMultiplier;
        if (proteinLevel === 'proteine') {
            if (ing.role === 'protein') qty *= 1.15;
            else if (ing.role === 'carb') qty *= 0.9;
        } else if (proteinLevel === 'hyper-prot') {
            if (ing.role === 'protein') qty *= 1.35;
            else if (ing.role === 'carb') qty *= 0.75;
            else if (ing.role === 'fat') qty *= 0.85;
        }
        if (ing.unit === 'g' || ing.unit === 'ml') {
            return Math.round(qty / 5) * 5;
        }
        return Math.round(qty);
    }

    // --- Display quantity (with raw conversion + servings) ---
    function getDisplayQty(ing) {
        var qty = getScaledQty(ing);
        // Apply raw conversion for display only
        if (showRaw && ing.rawRatio) {
            qty = qty * ing.rawRatio;
            if (ing.unit === 'g' || ing.unit === 'ml') {
                qty = Math.round(qty / 5) * 5;
            } else {
                qty = Math.round(qty);
            }
        }
        // Multiply by servings
        return qty * servings;
    }

    // --- Calculate macros from scaled ingredients ---
    function calculateMacros() {
        var ingredients = getActiveIngredients();
        var totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
        ingredients.forEach(function(ing) {
            var db = NUTRITION_DB[ing.id];
            if (!db) return;
            var qty = getScaledQty(ing);
            if ((ing.unit === 'unité' || ing.unit === 'unités' || ing.unit === 'unité(s)' || ing.unit === 'œufs' || ing.unit === 'tranches') && db.unit) {
                totals.cal += qty * db.unit.cal;
                totals.protein += qty * db.unit.protein;
                totals.carbs += qty * db.unit.carbs;
                totals.fat += qty * db.unit.fat;
            } else {
                totals.cal += (qty / 100) * db.cal;
                totals.protein += (qty / 100) * db.protein;
                totals.carbs += (qty / 100) * db.carbs;
                totals.fat += (qty / 100) * db.fat;
            }
        });
        return {
            cal: Math.round(totals.cal),
            protein: Math.round(totals.protein),
            carbs: Math.round(totals.carbs),
            fat: Math.round(totals.fat)
        };
    }

    // --- Render Recipe Header ---
    function renderHeader() {
        var categoryLabel = {
            'petit-dej-sucre': 'Petit-déjeuner sucré',
            'petit-dej-sale': 'Petit-déjeuner salé',
            'dejeuner': 'Déjeuner',
            'diner': 'Dîner',
            'collation-emporter': 'Collation à emporter',
            'collation-maison': 'Collation maison'
        };
        var tagsHtml = recipe.tags.join(' • ');
        document.getElementById('recipe-header').innerHTML =
            '<div class="brand"><span>Larousse Fit</span></div>' +
            '<span class="recipe-tag">' + (categoryLabel[recipe.category] || 'Recette adaptable') + '</span>' +
            '<h1>' + recipe.name + '</h1>' +
            '<p class="subtitle">' + recipe.subtitle + '</p>' +
            '<div class="recipe-meta">' +
                '<div class="meta-item">' + ICONS.clock + '<span>' + recipe.time + ' min</span></div>' +
                '<div class="meta-item">' + ICONS.bolt + '<span>' + recipe.difficulty + '</span></div>' +
                '<div class="meta-item">' + ICONS.heart + '<span>' + tagsHtml + '</span></div>' +
            '</div>';
        document.title = recipe.name + ' | Larousse Fit';
    }

    // --- Render Controls (once at init) ---
    function renderControls() {
        var html = '<h2 class="section-title"><span class="section-icon">' + ICONS.settings + '</span> Personnalise ta recette</h2>';
        html += '<div class="controls-grid">';

        // Portion slider (dynamic range per recipe)
        var sliderMin = recipe.sliderMin || 60;
        var sliderMax = recipe.sliderMax || 160;
        html += '<div class="control-group">' +
            '<span class="control-label">Taille de la portion</span>' +
            '<div class="slider-wrapper">' +
                '<span class="slider-label-left">&minus; kcals</span>' +
                '<div class="slider-container">' +
                    '<input type="range" id="portion-slider" min="' + sliderMin + '" max="' + sliderMax + '" step="5" value="100">' +
                '</div>' +
                '<span class="slider-label-right">+ kcals</span>' +
            '</div>' +
        '</div>';

        // Protein level
        html += '<div class="control-group">' +
            '<span class="control-label">Niveau de protéines</span>' +
            '<div class="protein-toggle" id="protein-toggle">' +
                '<button class="protein-btn active" data-level="equilibre">' +
                    '<span class="emoji">🥗</span>' +
                    '<span class="text-wrap"><span class="label">Équilibré</span><span class="desc">~20% protéines</span></span>' +
                '</button>' +
                '<button class="protein-btn" data-level="proteine">' +
                    '<span class="emoji">💪</span>' +
                    '<span class="text-wrap"><span class="label">Protéiné</span><span class="desc">~30% protéines</span></span>' +
                '</button>' +
                '<button class="protein-btn" data-level="hyper-prot">' +
                    '<span class="emoji">🏋️</span>' +
                    '<span class="text-wrap"><span class="label">Hyper-prot</span><span class="desc">~40% protéines</span></span>' +
                '</button>' +
            '</div>' +
        '</div>';

        // Recipe-specific options
        if (recipe.options) {
            recipe.options.forEach(function(opt) {
                html += '<div class="control-group">' +
                    '<span class="control-label">' + opt.label + '</span>' +
                    '<div class="option-toggle" id="option-' + opt.id + '">';
                opt.choices.forEach(function(choice, idx) {
                    var isActive = choice.value === opt.default;
                    html += '<button class="option-btn' + (isActive ? ' active' : '') + '" data-option="' + opt.id + '" data-value="' + choice.value + '">' +
                        '<span class="emoji">' + choice.emoji + '</span>' +
                        '<span class="text-wrap"><span class="label">' + choice.label + '</span><span class="desc">' + choice.desc + '</span></span>' +
                    '</button>';
                });
                html += '</div></div>';
            });
        }

        // Servings selector
        html += '<div class="control-group">' +
            '<span class="control-label">Nombre de couverts</span>' +
            '<div class="servings-selector" id="servings-selector">';
        for (var s = 1; s <= 6; s++) {
            html += '<button class="servings-btn' + (s === 1 ? ' active' : '') + '" data-servings="' + s + '">' + s + '</button>';
        }
        html += '</div></div>';

        // Raw/cooked toggle (only if recipe has applicable starches)
        var hasRawToggle = false;
        var allIng = getActiveIngredients();
        allIng.forEach(function(ing) { if (ing.rawRatio) hasRawToggle = true; });
        if (recipe.options) {
            recipe.options.forEach(function(opt) {
                Object.values(opt.modifiers).forEach(function(mod) {
                    if (mod.add) mod.add.forEach(function(ing) { if (ing.rawRatio) hasRawToggle = true; });
                });
            });
        }
        if (hasRawToggle) {
            html += '<div class="control-group">' +
                '<span class="control-label">Féculents <span class="control-label-hint">(glucides uniquement)</span></span>' +
                '<div class="option-toggle" id="raw-cooked-toggle">' +
                    '<button class="option-btn active" data-mode="cuit">' +
                        '<span class="emoji">🍲</span>' +
                        '<span class="text-wrap"><span class="label">Cuit</span><span class="desc">Poids après cuisson</span></span>' +
                    '</button>' +
                    '<button class="option-btn" data-mode="cru">' +
                        '<span class="emoji">🌾</span>' +
                        '<span class="text-wrap"><span class="label">Cru</span><span class="desc">Poids avant cuisson</span></span>' +
                    '</button>' +
                '</div>' +
            '</div>';
        }

        html += '</div>';

        // Macros container (updated separately)
        html += '<div id="macros-container"></div>';

        document.getElementById('customization-section').innerHTML = html;

        // --- Attach event listeners ---
        // Slider
        var slider = document.getElementById('portion-slider');
        slider.addEventListener('input', function() {
            portionMultiplier = parseInt(this.value) / 100;
            updateDynamic();
        });

        // Protein buttons
        document.querySelectorAll('#protein-toggle .protein-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                proteinLevel = this.dataset.level;
                document.querySelectorAll('#protein-toggle .protein-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                updateDynamic();
            });
        });

        // Option buttons (recipe-specific)
        document.querySelectorAll('.option-toggle:not(#raw-cooked-toggle) .option-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var optId = this.dataset.option;
                var val = this.dataset.value;
                optionSelections[optId] = val;
                document.querySelectorAll('#option-' + optId + ' .option-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                updateDynamic();
            });
        });

        // Servings buttons
        document.querySelectorAll('#servings-selector .servings-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                servings = parseInt(this.dataset.servings);
                document.querySelectorAll('#servings-selector .servings-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                updateDynamic();
            });
        });

        // Raw/cooked toggle
        if (document.getElementById('raw-cooked-toggle')) {
            document.querySelectorAll('#raw-cooked-toggle .option-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    showRaw = (this.dataset.mode === 'cru');
                    document.querySelectorAll('#raw-cooked-toggle .option-btn').forEach(function(b) { b.classList.remove('active'); });
                    this.classList.add('active');
                    updateDynamic();
                });
            });
        }
    }

    // --- Update Macros Display (without touching controls) ---
    function updateMacrosDisplay() {
        var m = calculateMacros();
        var protCal = m.protein * 4;
        var carbCal = m.carbs * 4;
        var fatCal = m.fat * 9;
        var totalMacroCal = protCal + carbCal + fatCal;
        var protPct = totalMacroCal > 0 ? Math.round((protCal / totalMacroCal) * 100) : 0;
        var carbPct = totalMacroCal > 0 ? Math.round((carbCal / totalMacroCal) * 100) : 0;
        var fatPct = 100 - protPct - carbPct;
        var protDeg = (protPct / 100) * 360;
        var carbDeg = (carbPct / 100) * 360;

        var perPersonNote = servings > 1 ? '<div class="macros-per-person">👤 Par personne · ' + servings + ' couverts au total</div>' : '';
        var html = perPersonNote + '<div class="macros-grid">' +
            '<div class="macro-card highlight-green"><div class="macro-value">' + m.cal + '</div><div class="macro-label">Calories</div></div>' +
            '<div class="macro-card highlight-green"><div class="macro-value">' + m.protein + '<span class="macro-unit">g</span></div><div class="macro-label">Protéines</div></div>' +
            '<div class="macro-card"><div class="macro-value">' + m.carbs + '<span class="macro-unit">g</span></div><div class="macro-label">Glucides</div></div>' +
            '<div class="macro-card"><div class="macro-value">' + m.fat + '<span class="macro-unit">g</span></div><div class="macro-label">Lipides</div></div>' +
        '</div>';

        html += '<div class="macro-chart-container">' +
            '<div class="macro-pie" style="background: conic-gradient(var(--green) 0deg ' + protDeg + 'deg, var(--brown-light) ' + protDeg + 'deg ' + (protDeg + carbDeg) + 'deg, var(--orange) ' + (protDeg + carbDeg) + 'deg 360deg);">' +
                '<div class="macro-pie-center">Macros</div>' +
            '</div>' +
            '<div class="macro-legend">' +
                '<div class="legend-item"><span class="legend-dot protein"></span> Protéines <span class="legend-value">' + protPct + '%</span></div>' +
                '<div class="legend-item"><span class="legend-dot carbs"></span> Glucides <span class="legend-value">' + carbPct + '%</span></div>' +
                '<div class="legend-item"><span class="legend-dot fat"></span> Lipides <span class="legend-value">' + fatPct + '%</span></div>' +
            '</div>' +
        '</div>';

        document.getElementById('macros-container').innerHTML = html;
    }

    // --- Render Ingredients Section ---
    function renderIngredients() {
        var ingredients = getActiveIngredients();
        var totalLabel = servings > 1 ? ' <span class="servings-note">(pour ' + servings + ' personnes)</span>' : '';
        var html = '<h2 class="section-title"><span class="section-icon">' + ICONS.clipboard + '</span> Ingrédients' + totalLabel + '</h2>';
        html += '<div class="ingredients-list">';
        ingredients.forEach(function(ing) {
            var qty = getDisplayQty(ing);
            var unitLabel = ing.unit;
            var displayName = ing.name;
            var displayDetail = ing.detail;
            // Show raw name/detail when toggle is active
            if (showRaw && ing.rawRatio) {
                displayName = displayName.replace(/\bcuit\b/i, 'cru').replace(/\bcuites?\b/i, 'cru').replace(/\bcuits?\b/i, 'cru');
                displayDetail = 'Poids cru (avant cuisson)';
            }
            html += '<div class="ingredient-row' + (ing.role === 'base' ? ' optional-style' : '') + '">' +
                '<div class="ingredient-info">' +
                    '<span class="ingredient-emoji">' + ing.emoji + '</span>' +
                    '<div>' +
                        '<div class="ingredient-name">' + displayName + '</div>' +
                        (displayDetail ? '<div class="ingredient-detail">' + displayDetail + '</div>' : '') +
                    '</div>' +
                '</div>' +
                '<div class="ingredient-quantity">' +
                    (ing.role === 'base' ? '<span style="color: var(--brown-light); font-size: 16px; font-family: DM Sans, sans-serif;">À volonté</span>' : qty + ' <span class="unit">' + unitLabel + '</span>') +
                '</div>' +
            '</div>';
        });
        html += '</div>';
        document.getElementById('ingredients-section').innerHTML = html;
    }

    // --- Render Steps Section ---
    function renderSteps() {
        var html = '<h2 class="section-title"><span class="section-icon">' + ICONS.rocket + '</span> Préparation</h2>';
        html += '<div class="steps-list">';
        recipe.steps.forEach(function(step, i) {
            html += '<div class="step">' +
                '<div class="step-number">' + (i + 1) + '</div>' +
                '<div class="step-content">' +
                    '<div class="step-title">' + step.title + '</div>' +
                    '<div class="step-text">' + step.text + '</div>' +
                '</div>' +
            '</div>';
        });
        html += '</div>';
        document.getElementById('steps-section').innerHTML = html;
    }

    // --- Render Tips Section ---
    function renderTips() {
        var html = '<h2 class="section-title"><span class="section-icon">' + ICONS.bulb + '</span> Conseils du coach</h2>';
        recipe.tips.forEach(function(tip) {
            var cssClass = tip.type === 'green' ? 'tip-green' : (tip.type === 'red' ? 'tip-red' : '');
            var icon = tip.type === 'green' ? '✅' : (tip.type === 'red' ? '⛔' : '💡');
            html += '<div class="tips-box ' + cssClass + '">' +
                '<div class="tips-title">' + icon + ' ' + tip.title + '</div>' +
                '<div class="tips-text">' + tip.text + '</div>' +
            '</div>';
        });
        document.getElementById('tips-section').innerHTML = html;
    }

    // --- Update only dynamic parts (macros + ingredients) ---
    function updateDynamic() {
        updateMacrosDisplay();
        renderIngredients();
    }

    // --- Init ---
    function init() {
        var recipeId = getRecipeId();
        if (!recipeId) {
            window.location.href = 'index.html';
            return;
        }

        recipe = findRecipe(recipeId);
        if (!recipe) {
            document.getElementById('recipe-container').innerHTML =
                '<div class="empty-state" style="padding:120px 24px;text-align:center;">' +
                    '<div class="emoji">😕</div>' +
                    '<h3>Recette introuvable</h3>' +
                    '<p>Cette recette n\'existe pas. <a href="index.html">Retour à la bibliothèque</a></p>' +
                '</div>';
            return;
        }

        // Initialize option selections
        if (recipe.options) {
            recipe.options.forEach(function(opt) {
                optionSelections[opt.id] = opt.default;
            });
        }

        // Render all sections
        renderHeader();
        renderControls();      // Controls rendered once
        updateMacrosDisplay(); // Initial macros
        renderIngredients();
        renderSteps();
        renderTips();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
