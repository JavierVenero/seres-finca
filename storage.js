export const state = { beings: {}, nests: {} };
export const appState = { currentSelection: null };

export function loadState() {
    const savedBeings = localStorage.getItem('finca_beings_v2');
    const savedNests = localStorage.getItem('finca_zones_v2');
    if (savedBeings) state.beings = JSON.parse(savedBeings);
    if (savedNests) state.nests = JSON.parse(savedNests);
}

export function saveState() {
    localStorage.setItem('finca_beings_v2', JSON.stringify(state.beings));
    localStorage.setItem('finca_zones_v2', JSON.stringify(state.nests));
}
