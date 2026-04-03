import { state, appState, loadState, saveState } from './storage.js';
import { rawBeingsData, zonesData, strataColors, strataOrder, extendedBeingsLibrary, massiveBeingsLibrary, ecologicalRules } from './data.js';

// ==========================================
// BIBLIOTECA UNIFICADA Y CACHÉ
// ==========================================
function getUnifiedLibrary() {
    const cached = JSON.parse(localStorage.getItem("beings_cache") || "[]");
    return [
        ...rawBeingsData,
        ...extendedBeingsLibrary,
        ...massiveBeingsLibrary,
        ...cached
    ];
}

function addToCache(being) {
    const cache = JSON.parse(localStorage.getItem("beings_cache") || "[]");
    if (!cache.find(b => b.name === being.name)) {
        cache.push(being);
        localStorage.setItem("beings_cache", JSON.stringify(cache));
    }
}

function searchBeings(query) {
    const library = getUnifiedLibrary();
    const unique = library.filter((item, index, self) =>
        index === self.findIndex(i => i.name === item.name)
    );
    return unique.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
}

// ==========================================
// RESOLUCIÓN DE DATOS (Render)
// ==========================================
function resolveBeing(being) {
    const library = getUnifiedLibrary();
    const def = library.find(b => b.name === being.type || b.id === being.id || b.name === being.name);
    
    if (def) return { ...being, name: def.name, icon: def.icon, cat: def.cat, role: def.role };
    return being;
}

const getOrder = (cat) => strataOrder[cat] !== undefined ? strataOrder[cat] : 99;

// ==========================================
// LÓGICA CLIMÁTICA Y TEMPORAL (NUEVA)
// ==========================================
async function updateWeatherAndDate() {
    const lat = 28.1388; // Santa María de Guía
    const lon = -15.6328;
    const weatherEl = document.querySelector('.weather-compact');
    if (!weatherEl) return;

    // 1. Obtener Fecha y Día actual
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = now.toLocaleDateString('es-ES', options);

    // 2. Calcular Estación del año
    const month = now.getMonth() + 1;
    let season = "Invierno";
    let sIcon = "❄️";
    if (month >= 3 && month <= 5) { season = "Primavera"; sIcon = "🌸"; }
    else if (month >= 6 && month <= 8) { season = "Verano"; sIcon = "☀️"; }
    else if (month >= 9 && month <= 11) { season = "Otoño"; sIcon = "🍂"; }

    // 3. Consultar API de Clima Real
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);

        weatherEl.innerHTML = `
            <span class="icon">${sIcon}</span>
            <div class="weather-info">
                <span class="temp">${temp}°C · ${season}</span>
                <span class="altitude-tag">${dateStr} · 445 msnm</span>
            </div>
        `;
    } catch (e) {
        // Fallback si falla la red o API
        weatherEl.innerHTML = `
            <span class="icon">${sIcon}</span>
            <div class="weather-info">
                <span class="temp">--°C · ${season}</span>
                <span class="altitude-tag">${dateStr} · 445 msnm</span>
            </div>
        `;
    }
}

// ==========================================
// RENDERIZADO
// ==========================================
function renderAllViews() {
    const beingsArray = Object.values(state.beings).map(resolveBeing);
    
    const unassigned = beingsArray.filter(b => !b.zoneId).sort((a,b) => getOrder(a.cat) - getOrder(b.cat));
    const grid = document.getElementById('unassignedGrid');
    if (grid) {
        grid.innerHTML = unassigned.map(b => `
            <div class="being-tile" data-id="${b.id}" draggable="true" onclick="openInspectModal('${b.id}')" style="--strata-color: ${strataColors[b.cat] || '#6BCB77'}">
                <div class="tile-icon">${b.icon}</div>
                <div class="tile-name">${b.name}</div>
            </div>`).join('');
    }
    document.getElementById('unassignedCount').textContent = unassigned.length;

    const container = document.getElementById('zonesGridContainer');
    if (!container) return;

    container.innerHTML = zonesData.map(zone => {
        const nests = state.nests[zone.id] || [];
        const nestsHTML = nests.map(n => {
            const nestBeings = beingsArray.filter(b => b.zoneId === zone.id && b.nestId === n.id).sort((a,b) => getOrder(a.cat) - getOrder(b.cat));
            return `
                <div class="nest-card drop-zone" data-zone-id="${zone.id}" data-nest-id="${n.id}">
                    <div class="nest-header">
                        <div class="nest-title" contenteditable="true" onblur="updateNestName('${zone.id}', '${n.id}', this.innerText)">${n.name}</div>
                        <button class="nest-delete" onclick="deleteNest('${zone.id}', '${n.id}')">✖</button>
                    </div>
                    <div class="nest-drop-area">
                        ${nestBeings.map(b => `
                            <div class="being-tile" data-id="${b.id}" draggable="true" onclick="openInspectModal('${b.id}')" style="--strata-color: ${strataColors[b.cat] || '#6BCB77'}">
                                <div class="tile-icon">${b.icon}</div>
                                <div class="tile-name">${b.name}</div>
                            </div>`).join('')}
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="zone-card ${zone.cssClass} drop-zone" data-zone-id="${zone.id}">
                <div class="zone-header"><h3>${zone.name}</h3><button class="btn-add-nest" onclick="addNest('${zone.id}')">+ Nido</button></div>
                <div class="nests-container">${nestsHTML}</div>
            </div>`;
    }).join('');
}

// ==========================================
// DRAG AND DROP
// ==========================================
function initDragAndDrop() {
    document.addEventListener('dragstart', e => {
        const tile = e.target.closest('.being-tile');
        if (!tile) return;
        e.dataTransfer.setData('text/plain', tile.dataset.id);
        setTimeout(() => tile.classList.add('is-dragging'), 0);
    });

    document.addEventListener('dragover', e => {
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone) {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        }
    });

    document.addEventListener('dragleave', e => {
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone) dropZone.classList.remove('drag-over');
    });

    document.addEventListener('drop', e => {
        const dropZone = e.target.closest('.drop-zone');
        if (!dropZone) return;
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const beingId = e.dataTransfer.getData('text/plain');
        if (!beingId || !state.beings[beingId]) return;

        const zoneId = dropZone.dataset.zoneId || null;
        const nestId = dropZone.dataset.nestId || null;

        if (zoneId !== 'vivero' && zoneId && !nestId) {
            const newNestId = 'nido_' + Date.now();
            if (!state.nests[zoneId]) state.nests[zoneId] = [];
            state.nests[zoneId].unshift({ id: newNestId, name: 'Nuevo Nido' });
            state.beings[beingId].zoneId = zoneId;
            state.beings[beingId].nestId = newNestId;
        } else if (zoneId === 'vivero') {
            state.beings[beingId].zoneId = null;
            state.beings[beingId].nestId = null;
        } else {
            state.beings[beingId].zoneId = zoneId;
            state.beings[beingId].nestId = nestId;
        }

        saveState();
        renderAllViews();
    });

    document.addEventListener('dragend', () => {
        document.querySelectorAll('.is-dragging').forEach(el => el.classList.remove('is-dragging'));
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });
}

// ==========================================
// MODAL DE CATÁLOGO
// ==========================================
window.filterCatalog = (query) => {
    const results = searchBeings(query);
    const container = document.getElementById('catalogResults');
    container.innerHTML = results.map(r => `
        <div onclick="selectFromCatalog('${r.name}')" onmouseover="this.style.background='#E8EFE1'" onmouseout="this.style.background='#F8FAF5'" style="display: flex; align-items: center; gap: 15px; padding: 10px; background: #F8FAF5; border: 1px solid #EBF4E5; border-radius: 8px; cursor: pointer; transition: background 0.2s;">
            <span style="font-size: 24px;">${r.icon}</span>
            <div style="display: flex; flex-direction: column;">
                <strong style="font-size: 13px; color: #2D3748;">${r.name}</strong>
                <span style="font-size: 11px; color: #718096;">${r.cat}</span>
            </div>
        </div>`).join('');
};

window.openAddModal = () => {
    document.getElementById('catalogSearch').value = '';
    window.filterCatalog(''); 
    document.getElementById('addModal').classList.add('open');
};

window.closeAddModal = () => document.getElementById('addModal').classList.remove('open');

window.selectFromCatalog = (typeName) => {
    const library = getUnifiedLibrary();
    const selected = library.find(b => b.name === typeName);
    
    if (selected) {
        addToCache(selected); 
        const id = 'ins_' + Date.now();
        state.beings[id] = { id, type: selected.name, zoneId: null, nestId: null, createdAt: Date.now() };
        saveState();
        window.closeAddModal();
        renderAllViews();
    }
};

// ==========================================
// MOTOR ECOLÓGICO INTELIGENTE (Core Local)
// ==========================================
window.analyzeEcosystem = () => {
    const ecosystem = Object.values(state.beings)
        .filter(b => b.zoneId !== null)
        .map(resolveBeing);

    let html = ``;

    if (ecosystem.length === 0) {
        html = `<div style="padding: 15px; background: #F8FAF5; border-radius: 8px;">Aún no hay seres ubicados en las zonas de la Finca. Empieza a integrar vida desde el vivero para iniciar el análisis.</div>`;
        document.getElementById('analysisResults').innerHTML = html;
        document.getElementById('analysisModal').classList.add('open');
        return;
    }

    const presentStrata = new Set(ecosystem.map(b => b.cat).filter(Boolean));
    const essentialStrata = ['Estrato Emergente', 'Estrato Alto', 'Estrato Medio', 'Estrato Bajo', 'Estrato Subterráneo', 'Cobertura / Rastrero', 'Funcionales'];
    const missingStrata = essentialStrata.filter(s => !presentStrata.has(s));

    if (!presentStrata.has('Cobertura / Rastrero')) {
        html += `<div style="padding: 12px; background: #FED7D7; border-left: 4px solid #E53E3E; border-radius: 4px; margin-bottom: 15px;">
            <strong style="color: #9B2C2C;">⚠️ Alerta Hídrica por Clima Seco Subtropical:</strong> 
            Falta estrato de Cobertura/Rastrero. Con la alta radiación solar de Medianía Baja, el suelo perderá humedad rápidamente por evaporación directa.
        </div>`;
    }

    const diversityScore = presentStrata.size;
    let healthIcon = diversityScore >= 5 ? '🟢' : '🟠';
    let healthText = diversityScore >= 5 ? 'Ecosistema estructurado. Resiliencia alta.' : 'Baja diversidad estructural. Vulnerable a desequilibrios.';
    
    html += `<div style="padding: 12px; background: #EBF4E5; border-left: 4px solid #48BB78; border-radius: 4px; margin-bottom: 15px;">
        <strong>${healthIcon} Salud Estructural:</strong> ${healthText} (Se detectan ${diversityScore} de ${essentialStrata.length} estratos base).
    </div>`;

    const names = ecosystem.map(b => b.name);
    const cats = ecosystem.map(b => b.cat);
    
    ecologicalRules.avoid.forEach(rule => {
        if (names.includes(rule.target)) {
            const conflictExists = ecosystem.some(b => rule.affects.includes(b.cat));
            if (conflictExists) {
                html += `<div style="padding: 10px; border-bottom: 1px dashed #CBD5E0; color: #DD6B20;">
                    <strong>Conflicto detectado:</strong> ${rule.msg}
                </div>`;
            }
        }
    });

    ecologicalRules.synergy.forEach(rule => {
        if (cats.includes(rule.catA) && cats.includes(rule.catB)) {
            html += `<div style="padding: 10px; border-bottom: 1px dashed #CBD5E0; color: #319795;">
                <strong>Sinergia activa:</strong> ${rule.msg}
            </div>`;
        }
    });

    if (missingStrata.length > 0) {
        html += `<div style="margin-top: 15px;"><strong>💡 Sugerencias para equilibrar el ecosistema:</strong><ul style="margin-top: 8px; padding-left: 20px; color: #4A5568;">`;
        const library = getUnifiedLibrary();
        const suggestions = library.filter(s => missingStrata.includes(s.cat)).slice(0, 5);
        
        suggestions.forEach(s => {
            html += `<li style="margin-bottom: 5px;">Añadir <strong>${s.name}</strong> ${s.icon} para cubrir el hueco de <em>${s.cat}</em>.</li>`;
        });
        html += `</ul></div>`;
    }

    document.getElementById('analysisResults').innerHTML = html;
    document.getElementById('analysisModal').classList.add('open');
};

window.closeAnalysisModal = () => document.getElementById('analysisModal').classList.remove('open');

// ==========================================
// FUNCIONES GLOBALES RESTANTES
// ==========================================
window.openInspectModal = (id) => {
    let b = state.beings[id];
    if (!b) return;
    b = resolveBeing(b);
    appState.currentSelection = id;
    
    document.getElementById('inspectPhoto').textContent = b.icon;
    document.getElementById('inspectName').textContent = b.name;
    document.getElementById('inspectEstrato').textContent = b.cat;
    document.getElementById('inspectRole').textContent = b.role || 'En desarrollo';
    
    let loc = b.zoneId ? "UBICADO EN FINCA" : "EN BANDEJA DE VIVERO";
    document.getElementById('inspectLocationBadge').textContent = loc;
    document.getElementById('inspectModal').classList.add('open');
};

window.closeInspectModal = () => document.getElementById('inspectModal').classList.remove('open');

window.deleteCurrentBeing = () => {
    if (confirm("¿Estás seguro de retirar este ser por completo?")) {
        delete state.beings[appState.currentSelection];
        saveState();
        window.closeInspectModal();
        renderAllViews();
    }
};

window.addNest = (zoneId) => {
    if (!state.nests[zoneId]) state.nests[zoneId] = [];
    state.nests[zoneId].unshift({ id: 'nido_' + Date.now(), name: 'Nuevo nido' });
    saveState();
    renderAllViews();
};

window.updateNestName = (zoneId, nestId, newName) => {
    const nest = state.nests[zoneId]?.find(n => n.id === nestId);
    if (nest) { nest.name = newName; saveState(); }
};

window.deleteNest = (zoneId, nestId) => {
    if (confirm("¿Deshacer este nido? Los seres volverán a la bandeja de vivero.")) {
        Object.values(state.beings).forEach(b => {
            if (b.nestId === nestId) { b.zoneId = null; b.nestId = null; }
        });
        state.nests[zoneId] = state.nests[zoneId].filter(n => n.id !== nestId);
        saveState();
        renderAllViews();
    }
};

window.filterBeings = (term) => {
    const t = term.toLowerCase();
    document.querySelectorAll('.being-tile').forEach(tile => {
        const name = tile.querySelector('.tile-name').textContent.toLowerCase();
        tile.classList.toggle('hidden', !name.includes(t));
    });
};

// ==========================================
// ARRANQUE SEGURO
// ==========================================
function initApp() {
    loadState();
    updateWeatherAndDate(); // Lanzamos clima y fecha real al arrancar

    if (Object.keys(state.beings).length === 0) {
        rawBeingsData.forEach(b => { 
            state.beings[b.id] = { id: b.id, type: b.name, zoneId: null, nestId: null }; 
        });

        state.nests['z_bosque'] = [{ id: 'n_ini_1', name: 'Nido Estructural' }];
        state.nests['z_bienvenida'] = [{ id: 'n_ini_2', name: 'Seto Aromático' }];

        if (state.beings['b_aguacatero']) {
            state.beings['b_aguacatero'].zoneId = 'z_bosque';
            state.beings['b_aguacatero'].nestId = 'n_ini_1';
        }
        if (state.beings['b_lavanda']) {
            state.beings['b_lavanda'].zoneId = 'z_bienvenida';
            state.beings['b_lavanda'].nestId = 'n_ini_2';
        }

        saveState();
    }
    
    renderAllViews();
    initDragAndDrop();
}

document.addEventListener('DOMContentLoaded', initApp);
