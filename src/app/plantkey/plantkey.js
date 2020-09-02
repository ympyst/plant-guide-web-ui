import { createSlice } from '@reduxjs/toolkit';

export const plantKeySlice = createSlice({
    name: 'plantKey',
    initialState: {
        loaded: false,
        keys: [],
        currentSelectionId: 0,
        selectionHistory: [],
        taxon: {
            found: false,
            type: "",
            name: ""
        }
    },
    reducers: {
        load: (state, action) => {
            if (Array.isArray(action.payload)) {
                action.payload.forEach((k) => {
                    if (state.keys[k.selection_id] === undefined) {
                        state.keys[k.selection_id] = [];
                    }
                    state.keys[k.selection_id].push(k);
                });
                state.loaded = true;
                state.currentSelectionId = 1;
            }
        },
        select: (state, action) => {
            state.selectionHistory.push(action.payload);
            if (action.payload.next_selection_id !== 0) {
                state.currentSelectionId = action.payload.next_selection_id;
            } else {
                state.taxon.found = true;
                state.taxon.type = action.payload.bio_taxon_type;
                state.taxon.name = action.payload.bio_taxon_name;
            }
        },
        selectFromHistory: (state, action) => {
            state.taxon.found = false;
            state.taxon.name = "";
            state.taxon.type = "";
            state.currentSelectionId = action.payload.selection_id;
            const historyIndex = state.selectionHistory.findIndex((h) =>  h.selection_id === action.payload.selection_id );
            state.selectionHistory.splice(historyIndex);
        }
    },
});

export const { load, select, selectFromHistory } = plantKeySlice.actions;

export default plantKeySlice.reducer;