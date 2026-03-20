/* ============================================
   AH COACHING — Catalogue / Bibliothèque
   Système de filtres avancés
   ============================================ */

(function() {
    'use strict';

    // --- State ---
    var filterState = {
        category: 'all',
        difficulty: null,
        searchQuery: '',
        dietaryTags: [],
        goalTag: null,
        styleTags: [],
        timeMax: null,
        calRange: null,
        socialFilter: null,
        likedIngredients: [],
        dislikedIngredients: [],
        sortBy: 'default'
    };

    // --- Caches (built once at init) ---
    var macroCache = {};
    var ingredientMasterList = [];
    var panelOpen = false;

    // --- Constants ---
    var CATEGORY_LABELS = {
        'petit-dej-sucre': 'Petit-déj sucré',
        'petit-dej-sale': 'Petit-déj salé',
        'dejeuner': 'Déjeuner',
        'diner': 'Dîner',
        'collation-emporter': 'Collation',
        'collation-maison': 'Collation',
        'apero-partage': 'Apéro & Partage'
    };

    var ICONS = {
        clock: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        difficulty: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>',
        filter: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/></svg>',
        chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>',
        close: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>'
    };

    var STORAGE_KEY = 'ahcoaching_filters';

    // ============================================
    // INITIALIZATION
    // ============================================

    function buildMacroCache() {
        RECIPES_DATA.forEach(function(recipe) {
            macroCache[recipe.id] = calculateBaseMacros(recipe);
        });
    }

    function buildIngredientMasterList() {
        var map = {};
        RECIPES_DATA.forEach(function(recipe) {
            function addIng(ing) {
                if (!map[ing.id]) {
                    map[ing.id] = { id: ing.id, name: ing.name, emoji: ing.emoji || '' };
                }
            }
            recipe.ingredients.forEach(addIng);
            if (recipe.options) {
                recipe.options.forEach(function(opt) {
                    if (opt.modifiers) {
                        Object.keys(opt.modifiers).forEach(function(key) {
                            var mod = opt.modifiers[key];
                            if (mod.add) mod.add.forEach(addIng);
                        });
                    }
                });
            }
        });
        ingredientMasterList = Object.keys(map).map(function(k) { return map[k]; });
        ingredientMasterList.sort(function(a, b) { return a.name.localeCompare(b.name, 'fr'); });
    }

    // ============================================
    // MACRO CALCULATION
    // ============================================

    function calculateBaseMacros(recipe) {
        var cal = 0, protein = 0, carbs = 0, fat = 0;

        recipe.ingredients.forEach(function(ing) {
            var db = NUTRITION_DB[ing.id];
            if (!db) return;
            if (ing.unit === 'unité' || ing.unit === 'unités' || ing.unit === 'unité(s)' || ing.unit === 'œufs' || ing.unit === 'tranches') {
                if (db.unit) {
                    cal += ing.baseQty * db.unit.cal;
                    protein += ing.baseQty * db.unit.protein;
                    carbs += ing.baseQty * db.unit.carbs;
                    fat += ing.baseQty * db.unit.fat;
                } else {
                    cal += (ing.baseQty / 100) * db.cal;
                    protein += (ing.baseQty / 100) * db.protein;
                    carbs += (ing.baseQty / 100) * db.carbs;
                    fat += (ing.baseQty / 100) * db.fat;
                }
            } else {
                cal += (ing.baseQty / 100) * db.cal;
                protein += (ing.baseQty / 100) * db.protein;
                carbs += (ing.baseQty / 100) * db.carbs;
                fat += (ing.baseQty / 100) * db.fat;
            }
        });

        if (recipe.options) {
            recipe.options.forEach(function(opt) {
                var defaultChoice = opt.default;
                if (opt.modifiers && opt.modifiers[defaultChoice] && opt.modifiers[defaultChoice].add) {
                    opt.modifiers[defaultChoice].add.forEach(function(ing) {
                        var db = NUTRITION_DB[ing.id];
                        if (!db) return;
                        cal += (ing.baseQty / 100) * db.cal;
                        protein += (ing.baseQty / 100) * db.protein;
                        carbs += (ing.baseQty / 100) * db.carbs;
                        fat += (ing.baseQty / 100) * db.fat;
                    });
                }
            });
        }

        return {
            cal: Math.round(cal),
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fat: Math.round(fat)
        };
    }

    // ============================================
    // HELPERS
    // ============================================

    function getAllIngredientIds(recipe) {
        var ids = recipe.ingredients.map(function(i) { return i.id; });
        if (recipe.options) {
            recipe.options.forEach(function(opt) {
                if (opt.modifiers) {
                    Object.keys(opt.modifiers).forEach(function(key) {
                        var mod = opt.modifiers[key];
                        if (mod.add) {
                            mod.add.forEach(function(ing) {
                                if (ids.indexOf(ing.id) === -1) ids.push(ing.id);
                            });
                        }
                    });
                }
            });
        }
        return ids;
    }

    function countActiveFilters() {
        var count = 0;
        if (filterState.dietaryTags.length > 0) count += filterState.dietaryTags.length;
        if (filterState.goalTag) count++;
        if (filterState.styleTags.length > 0) count += filterState.styleTags.length;
        if (filterState.timeMax !== null) count++;
        if (filterState.calRange) count++;
        if (filterState.socialFilter) count++;
        if (filterState.likedIngredients.length > 0) count += filterState.likedIngredients.length;
        if (filterState.dislikedIngredients.length > 0) count += filterState.dislikedIngredients.length;
        return count;
    }

    function getIngredientById(id) {
        for (var i = 0; i < ingredientMasterList.length; i++) {
            if (ingredientMasterList[i].id === id) return ingredientMasterList[i];
        }
        return null;
    }

    // ============================================
    // LOCALSTORAGE PERSISTENCE
    // ============================================

    function savePreferences() {
        try {
            var prefs = {
                dietaryTags: filterState.dietaryTags,
                dislikedIngredients: filterState.dislikedIngredients,
                likedIngredients: filterState.likedIngredients
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        } catch(e) { /* silently fail */ }
    }

    function loadPreferences() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                var prefs = JSON.parse(saved);
                filterState.dietaryTags = prefs.dietaryTags || [];
                filterState.dislikedIngredients = prefs.dislikedIngredients || [];
                filterState.likedIngredients = prefs.likedIngredients || [];
            }
        } catch(e) { /* silently fail */ }
    }

    // ============================================
    // FILTER + SORT PIPELINE
    // ============================================

    function getFilteredAndSortedRecipes() {
        var query = filterState.searchQuery.toLowerCase().trim();

        var filtered = RECIPES_DATA.filter(function(recipe) {
            // Category
            if (filterState.category !== 'all' && recipe.category !== filterState.category) return false;

            // Difficulty
            if (filterState.difficulty && recipe.difficulty !== filterState.difficulty) return false;

            // Search (extended to ingredient names)
            if (query) {
                var searchStr = (recipe.name + ' ' + recipe.subtitle + ' ' + recipe.tags.join(' ') + ' ' + recipe.ingredients.map(function(i) { return i.name; }).join(' ')).toLowerCase();
                if (searchStr.indexOf(query) === -1) return false;
            }

            // Dietary tags (AND)
            for (var d = 0; d < filterState.dietaryTags.length; d++) {
                if (recipe.tags.indexOf(filterState.dietaryTags[d]) === -1) return false;
            }

            // Goal tag (single)
            if (filterState.goalTag && recipe.tags.indexOf(filterState.goalTag) === -1) return false;

            // Style tags (AND)
            for (var s = 0; s < filterState.styleTags.length; s++) {
                if (recipe.tags.indexOf(filterState.styleTags[s]) === -1) return false;
            }

            // Time
            if (filterState.timeMax !== null) {
                if (filterState.timeMax === 999) {
                    if (recipe.time <= 30) return false;
                } else {
                    if (recipe.time > filterState.timeMax) return false;
                }
            }

            // Calories
            if (filterState.calRange) {
                var macros = macroCache[recipe.id];
                if (filterState.calRange === 'low' && macros.cal >= 300) return false;
                if (filterState.calRange === 'medium' && (macros.cal < 300 || macros.cal >= 500)) return false;
                if (filterState.calRange === 'high' && (macros.cal < 500 || macros.cal >= 700)) return false;
                if (filterState.calRange === 'very-high' && macros.cal < 700) return false;
            }

            // Social
            if (filterState.socialFilter === 'famille') {
                if (recipe.tags.indexOf('Familial') === -1 && recipe.tags.indexOf('Convivial') === -1) return false;
            } else if (filterState.socialFilter === 'solo') {
                if (recipe.tags.indexOf('Familial') !== -1 || recipe.tags.indexOf('Convivial') !== -1) return false;
            }

            // Disliked ingredients (exclude if ANY match)
            if (filterState.dislikedIngredients.length > 0) {
                var recipeIngIds = getAllIngredientIds(recipe);
                for (var di = 0; di < filterState.dislikedIngredients.length; di++) {
                    if (recipeIngIds.indexOf(filterState.dislikedIngredients[di]) !== -1) return false;
                }
            }

            // Liked ingredients (include only if has at least one)
            if (filterState.likedIngredients.length > 0) {
                var recipeIngIds2 = getAllIngredientIds(recipe);
                var hasAny = false;
                for (var li = 0; li < filterState.likedIngredients.length; li++) {
                    if (recipeIngIds2.indexOf(filterState.likedIngredients[li]) !== -1) {
                        hasAny = true;
                        break;
                    }
                }
                if (!hasAny) return false;
            }

            return true;
        });

        // Sort
        if (filterState.sortBy !== 'default') {
            filtered.sort(function(a, b) {
                var ma = macroCache[a.id], mb = macroCache[b.id];
                switch (filterState.sortBy) {
                    case 'time-asc': return a.time - b.time;
                    case 'time-desc': return b.time - a.time;
                    case 'cal-asc': return ma.cal - mb.cal;
                    case 'cal-desc': return mb.cal - ma.cal;
                    case 'protein-desc': return mb.protein - ma.protein;
                    case 'alpha-asc': return a.name.localeCompare(b.name, 'fr');
                    default: return 0;
                }
            });
        }

        return filtered;
    }

    // ============================================
    // RENDERING
    // ============================================

    function renderCard(recipe) {
        var macros = macroCache[recipe.id];
        var categoryLabel = CATEGORY_LABELS[recipe.category] || recipe.category;

        return '<a href="recipe.html?id=' + recipe.id + '" class="recipe-card" data-category="' + recipe.category + '" data-difficulty="' + recipe.difficulty + '">' +
            '<div class="card-header">' +
                '<div class="card-emoji">' + recipe.emoji + '</div>' +
                '<div class="card-info">' +
                    '<div class="card-category">' + categoryLabel + '</div>' +
                    '<div class="card-title">' + recipe.name + '</div>' +
                    '<div class="card-subtitle">' + recipe.subtitle + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="card-meta">' +
                '<span class="card-tag">' + ICONS.clock + ' ' + recipe.time + ' min</span>' +
                '<span class="card-tag">' + ICONS.difficulty + ' ' + recipe.difficulty + '</span>' +
                (recipe.tags[0] ? '<span class="card-tag">' + recipe.tags[0] + '</span>' : '') +
            '</div>' +
            '<div class="card-macros">' +
                '<div class="card-macro highlight">' +
                    '<div class="card-macro-value">' + macros.cal + '</div>' +
                    '<div class="card-macro-label">Calories</div>' +
                '</div>' +
                '<div class="card-macro highlight">' +
                    '<div class="card-macro-value">' + macros.protein + '<span class="unit">g</span></div>' +
                    '<div class="card-macro-label">Protéines</div>' +
                '</div>' +
                '<div class="card-macro">' +
                    '<div class="card-macro-value">' + macros.carbs + '<span class="unit">g</span></div>' +
                    '<div class="card-macro-label">Glucides</div>' +
                '</div>' +
                '<div class="card-macro">' +
                    '<div class="card-macro-value">' + macros.fat + '<span class="unit">g</span></div>' +
                    '<div class="card-macro-label">Lipides</div>' +
                '</div>' +
            '</div>' +
        '</a>';
    }

    function renderRecipes() {
        var grid = document.getElementById('recipes-grid');
        var countEl = document.getElementById('results-count');
        var filtered = getFilteredAndSortedRecipes();

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="empty-state">' +
                '<div class="emoji">🔍</div>' +
                '<h3>Aucune recette trouvée</h3>' +
                '<p>Essaye de modifier tes filtres ou ta recherche.</p>' +
            '</div>';
        } else {
            grid.innerHTML = filtered.map(renderCard).join('');
        }

        countEl.textContent = filtered.length;

        // Re-trigger animations
        var cards = grid.querySelectorAll('.recipe-card');
        cards.forEach(function(card, i) {
            card.style.animationDelay = (i * 0.05) + 's';
        });

        // Update active chips
        renderActiveChips();

        // Update toggle button badge
        updateToggleBadge();
    }

    // ============================================
    // ACTIVE FILTER CHIPS
    // ============================================

    function renderActiveChips() {
        var chips = [];

        // Dietary
        filterState.dietaryTags.forEach(function(t) {
            chips.push({ label: t, type: 'dietary', value: t });
        });

        // Goal
        if (filterState.goalTag) {
            chips.push({ label: filterState.goalTag, type: 'goal' });
        }

        // Style
        filterState.styleTags.forEach(function(t) {
            chips.push({ label: t, type: 'style', value: t });
        });

        // Time
        if (filterState.timeMax !== null) {
            var timeLabel = filterState.timeMax === 999 ? '30+ min' : '≤ ' + filterState.timeMax + ' min';
            chips.push({ label: timeLabel, type: 'time' });
        }

        // Calories
        if (filterState.calRange) {
            var calLabels = { 'low': '< 300 kcal', 'medium': '300-500 kcal', 'high': '500-700 kcal', 'very-high': '700+ kcal' };
            chips.push({ label: calLabels[filterState.calRange], type: 'calories' });
        }

        // Social
        if (filterState.socialFilter) {
            chips.push({ label: filterState.socialFilter === 'solo' ? '👤 Solo' : '👨‍👩‍👧‍👦 Famille', type: 'social' });
        }

        // Liked ingredients
        filterState.likedIngredients.forEach(function(id) {
            var ing = getIngredientById(id);
            if (ing) chips.push({ label: (ing.emoji ? ing.emoji + ' ' : '') + ing.name, type: 'liked', value: id });
        });

        // Disliked ingredients
        filterState.dislikedIngredients.forEach(function(id) {
            var ing = getIngredientById(id);
            if (ing) chips.push({ label: '🚫 ' + ing.name, type: 'disliked', value: id });
        });

        var bar = document.getElementById('active-chips-bar');
        var list = document.getElementById('active-chips-list');

        if (chips.length === 0) {
            bar.style.display = 'none';
            list.innerHTML = '';
            return;
        }

        bar.style.display = '';
        list.innerHTML = chips.map(function(chip) {
            return '<span class="active-chip' + (chip.type === 'disliked' ? ' chip-exclude' : '') + '" data-chip-type="' + chip.type + '"' +
                (chip.value ? ' data-chip-value="' + chip.value + '"' : '') + '>' +
                chip.label +
                '<button class="chip-remove" aria-label="Supprimer">&times;</button>' +
            '</span>';
        }).join('');
    }

    function updateToggleBadge() {
        var count = countActiveFilters();
        var badge = document.getElementById('af-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-flex' : 'none';
        }
    }

    // ============================================
    // INGREDIENT SELECTOR COMPONENT
    // ============================================

    function setupIngredientSelector(searchInputId, dropdownId, chipsContainerId, stateKey) {
        var searchInput = document.getElementById(searchInputId);
        var dropdown = document.getElementById(dropdownId);
        var chipsContainer = document.getElementById(chipsContainerId);

        if (!searchInput || !dropdown || !chipsContainer) return;

        function renderDropdown(query) {
            var q = (query || '').toLowerCase().trim();
            var selected = filterState[stateKey];
            var matches = ingredientMasterList.filter(function(ing) {
                if (selected.indexOf(ing.id) !== -1) return false;
                if (!q) return true;
                return ing.name.toLowerCase().indexOf(q) !== -1;
            });

            if (matches.length === 0 || !q) {
                dropdown.classList.remove('visible');
                dropdown.innerHTML = '';
                return;
            }

            dropdown.innerHTML = matches.slice(0, 12).map(function(ing) {
                return '<div class="af-ingredient-option" data-ing-id="' + ing.id + '">' +
                    (ing.emoji ? '<span class="af-ing-emoji">' + ing.emoji + '</span>' : '') +
                    '<span>' + ing.name + '</span>' +
                '</div>';
            }).join('');
            dropdown.classList.add('visible');
        }

        function renderChips() {
            var selected = filterState[stateKey];
            chipsContainer.innerHTML = selected.map(function(id) {
                var ing = getIngredientById(id);
                if (!ing) return '';
                return '<span class="af-chip">' +
                    (ing.emoji ? ing.emoji + ' ' : '') + ing.name +
                    '<button class="af-chip-remove" data-ing-id="' + id + '">&times;</button>' +
                '</span>';
            }).join('');
        }

        searchInput.addEventListener('input', function() {
            renderDropdown(searchInput.value);
        });

        searchInput.addEventListener('focus', function() {
            if (searchInput.value.trim()) {
                renderDropdown(searchInput.value);
            }
        });

        dropdown.addEventListener('click', function(e) {
            var option = e.target.closest('.af-ingredient-option');
            if (!option) return;
            var ingId = option.dataset.ingId;
            if (filterState[stateKey].indexOf(ingId) === -1) {
                filterState[stateKey].push(ingId);
            }
            searchInput.value = '';
            dropdown.classList.remove('visible');
            dropdown.innerHTML = '';
            renderChips();
            savePreferences();
            renderRecipes();
        });

        chipsContainer.addEventListener('click', function(e) {
            var btn = e.target.closest('.af-chip-remove');
            if (!btn) return;
            var ingId = btn.dataset.ingId;
            filterState[stateKey] = filterState[stateKey].filter(function(id) { return id !== ingId; });
            renderChips();
            savePreferences();
            renderRecipes();
        });

        // Close dropdown on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#' + searchInputId) && !e.target.closest('#' + dropdownId)) {
                dropdown.classList.remove('visible');
            }
        });

        // Render initial chips from loaded preferences
        renderChips();
    }

    // ============================================
    // PANEL UI SYNC
    // ============================================

    function syncPanelUI() {
        // Sync dietary checkboxes
        document.querySelectorAll('[data-dietary]').forEach(function(cb) {
            cb.checked = filterState.dietaryTags.indexOf(cb.dataset.dietary) !== -1;
        });

        // Sync style checkboxes
        document.querySelectorAll('[data-style]').forEach(function(cb) {
            cb.checked = filterState.styleTags.indexOf(cb.dataset.style) !== -1;
        });

        // Sync time pills
        document.querySelectorAll('[data-time-max]').forEach(function(btn) {
            var val = btn.dataset.timeMax === '999' ? 999 : parseInt(btn.dataset.timeMax, 10);
            btn.classList.toggle('active', filterState.timeMax === val);
        });

        // Sync goal pills
        document.querySelectorAll('[data-goal]').forEach(function(btn) {
            btn.classList.toggle('active', filterState.goalTag === btn.dataset.goal);
        });

        // Sync cal pills
        document.querySelectorAll('[data-cal-range]').forEach(function(btn) {
            btn.classList.toggle('active', filterState.calRange === btn.dataset.calRange);
        });

        // Sync social pills
        document.querySelectorAll('[data-social]').forEach(function(btn) {
            btn.classList.toggle('active', filterState.socialFilter === btn.dataset.social);
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    function init() {
        // Build caches
        buildMacroCache();
        buildIngredientMasterList();

        // Load saved preferences
        loadPreferences();

        // --- Category & Difficulty filters (existing) ---
        var filterBtns = document.querySelectorAll('.filter-bar .filter-btn:not(#toggle-advanced)');
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (btn.dataset.filter !== undefined) {
                    document.querySelectorAll('.filter-btn[data-filter]').forEach(function(b) {
                        b.classList.remove('active');
                    });
                    btn.classList.add('active');
                    filterState.category = btn.dataset.filter;
                } else if (btn.dataset.difficulty !== undefined) {
                    if (btn.classList.contains('active')) {
                        btn.classList.remove('active');
                        filterState.difficulty = null;
                    } else {
                        document.querySelectorAll('.filter-btn[data-difficulty]').forEach(function(b) {
                            b.classList.remove('active');
                        });
                        btn.classList.add('active');
                        filterState.difficulty = btn.dataset.difficulty;
                    }
                }
                renderRecipes();
            });
        });

        // --- Search ---
        var searchInput = document.getElementById('search-input');
        var searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                filterState.searchQuery = searchInput.value;
                renderRecipes();
            }, 200);
        });

        // --- Toggle Advanced Filters Panel ---
        var toggleBtn = document.getElementById('toggle-advanced');
        var panel = document.getElementById('advanced-filters');
        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', function() {
                panelOpen = !panelOpen;
                panel.classList.toggle('open', panelOpen);
                toggleBtn.classList.toggle('active', panelOpen);
            });
        }

        // --- Close panel button ---
        var closeBtn = document.getElementById('af-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                panelOpen = false;
                panel.classList.remove('open');
                toggleBtn.classList.remove('active');
            });
        }

        // --- Dietary checkboxes ---
        document.querySelectorAll('[data-dietary]').forEach(function(cb) {
            cb.addEventListener('change', function() {
                var tag = cb.dataset.dietary;
                if (cb.checked) {
                    if (filterState.dietaryTags.indexOf(tag) === -1) filterState.dietaryTags.push(tag);
                } else {
                    filterState.dietaryTags = filterState.dietaryTags.filter(function(t) { return t !== tag; });
                }
                savePreferences();
                renderRecipes();
            });
        });

        // --- Style checkboxes ---
        document.querySelectorAll('[data-style]').forEach(function(cb) {
            cb.addEventListener('change', function() {
                var tag = cb.dataset.style;
                if (cb.checked) {
                    if (filterState.styleTags.indexOf(tag) === -1) filterState.styleTags.push(tag);
                } else {
                    filterState.styleTags = filterState.styleTags.filter(function(t) { return t !== tag; });
                }
                renderRecipes();
            });
        });

        // --- Time pills (single-select toggle) ---
        document.querySelectorAll('[data-time-max]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var val = btn.dataset.timeMax === '999' ? 999 : parseInt(btn.dataset.timeMax, 10);
                filterState.timeMax = (filterState.timeMax === val) ? null : val;
                document.querySelectorAll('[data-time-max]').forEach(function(b) {
                    var bVal = b.dataset.timeMax === '999' ? 999 : parseInt(b.dataset.timeMax, 10);
                    b.classList.toggle('active', filterState.timeMax === bVal);
                });
                renderRecipes();
            });
        });

        // --- Goal pills (single-select toggle) ---
        document.querySelectorAll('[data-goal]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterState.goalTag = (filterState.goalTag === btn.dataset.goal) ? null : btn.dataset.goal;
                document.querySelectorAll('[data-goal]').forEach(function(b) {
                    b.classList.toggle('active', filterState.goalTag === b.dataset.goal);
                });
                renderRecipes();
            });
        });

        // --- Calorie range pills (single-select toggle) ---
        document.querySelectorAll('[data-cal-range]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterState.calRange = (filterState.calRange === btn.dataset.calRange) ? null : btn.dataset.calRange;
                document.querySelectorAll('[data-cal-range]').forEach(function(b) {
                    b.classList.toggle('active', filterState.calRange === b.dataset.calRange);
                });
                renderRecipes();
            });
        });

        // --- Social pills (single-select toggle) ---
        document.querySelectorAll('[data-social]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterState.socialFilter = (filterState.socialFilter === btn.dataset.social) ? null : btn.dataset.social;
                document.querySelectorAll('[data-social]').forEach(function(b) {
                    b.classList.toggle('active', filterState.socialFilter === b.dataset.social);
                });
                renderRecipes();
            });
        });

        // --- Sort ---
        var sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                filterState.sortBy = sortSelect.value;
                renderRecipes();
            });
        }

        // --- Ingredient selectors ---
        setupIngredientSelector('liked-search', 'liked-dropdown', 'liked-chips', 'likedIngredients');
        setupIngredientSelector('disliked-search', 'disliked-dropdown', 'disliked-chips', 'dislikedIngredients');

        // --- Active chips: remove individual + clear all ---
        document.getElementById('active-chips-list').addEventListener('click', function(e) {
            var removeBtn = e.target.closest('.chip-remove');
            if (!removeBtn) return;
            var chip = removeBtn.closest('.active-chip');
            var type = chip.dataset.chipType;
            var value = chip.dataset.chipValue;

            switch (type) {
                case 'dietary':
                    filterState.dietaryTags = filterState.dietaryTags.filter(function(t) { return t !== value; });
                    savePreferences();
                    break;
                case 'goal':
                    filterState.goalTag = null;
                    break;
                case 'style':
                    filterState.styleTags = filterState.styleTags.filter(function(t) { return t !== value; });
                    break;
                case 'time':
                    filterState.timeMax = null;
                    break;
                case 'calories':
                    filterState.calRange = null;
                    break;
                case 'social':
                    filterState.socialFilter = null;
                    break;
                case 'liked':
                    filterState.likedIngredients = filterState.likedIngredients.filter(function(id) { return id !== value; });
                    savePreferences();
                    break;
                case 'disliked':
                    filterState.dislikedIngredients = filterState.dislikedIngredients.filter(function(id) { return id !== value; });
                    savePreferences();
                    break;
            }
            syncPanelUI();
            renderRecipes();
            // Re-render ingredient chips
            if (type === 'liked') {
                var likedContainer = document.getElementById('liked-chips');
                if (likedContainer) {
                    likedContainer.innerHTML = filterState.likedIngredients.map(function(id) {
                        var ing = getIngredientById(id);
                        if (!ing) return '';
                        return '<span class="af-chip">' + (ing.emoji ? ing.emoji + ' ' : '') + ing.name + '<button class="af-chip-remove" data-ing-id="' + id + '">&times;</button></span>';
                    }).join('');
                }
            }
            if (type === 'disliked') {
                var dislikedContainer = document.getElementById('disliked-chips');
                if (dislikedContainer) {
                    dislikedContainer.innerHTML = filterState.dislikedIngredients.map(function(id) {
                        var ing = getIngredientById(id);
                        if (!ing) return '';
                        return '<span class="af-chip">' + (ing.emoji ? ing.emoji + ' ' : '') + ing.name + '<button class="af-chip-remove" data-ing-id="' + id + '">&times;</button></span>';
                    }).join('');
                }
            }
        });

        document.getElementById('clear-all-filters').addEventListener('click', function() {
            filterState.dietaryTags = [];
            filterState.goalTag = null;
            filterState.styleTags = [];
            filterState.timeMax = null;
            filterState.calRange = null;
            filterState.socialFilter = null;
            filterState.likedIngredients = [];
            filterState.dislikedIngredients = [];
            savePreferences();
            syncPanelUI();
            // Clear ingredient chip containers
            var lc = document.getElementById('liked-chips');
            var dc = document.getElementById('disliked-chips');
            if (lc) lc.innerHTML = '';
            if (dc) dc.innerHTML = '';
            renderRecipes();
        });

        // --- Reset button inside panel ---
        var resetBtn = document.getElementById('af-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                filterState.dietaryTags = [];
                filterState.goalTag = null;
                filterState.styleTags = [];
                filterState.timeMax = null;
                filterState.calRange = null;
                filterState.socialFilter = null;
                filterState.likedIngredients = [];
                filterState.dislikedIngredients = [];
                savePreferences();
                syncPanelUI();
                var lc = document.getElementById('liked-chips');
                var dc = document.getElementById('disliked-chips');
                if (lc) lc.innerHTML = '';
                if (dc) dc.innerHTML = '';
                renderRecipes();
            });
        }

        // Sync UI with loaded preferences
        syncPanelUI();

        // Initial render
        renderRecipes();
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
