import plantKeyReducer from './plantkey';

const initialState = {
    loaded: false,
    keys: [],
    currentSelectionId: 0,
    selectionHistory: [],
    taxon: {
        found: false,
        type: "",
        name: ""
    }
};

describe('plantKeyReducer', () => {
    it('should return the initial state', () => {
        expect(plantKeyReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle "load" action', () => {
        const selection_id = 2;
        const selection = [
            {
              id: 1,
              bio_taxon_name: '',
              bio_taxon_type: '',
              thesis: 'Thesis 1',
              selection_id: selection_id,
              next_selection_id: 3,
            },
            {
              id: 2,
              bio_taxon_name: '',
              bio_taxon_type: '',
              thesis: 'Thesis 2',
              selection_id: selection_id,
              next_selection_id: 30,
            }
        ];
        const newState = plantKeyReducer(initialState, {
            type: 'plantKey/load',
            payload: selection
          });
        
        expect(newState.loaded).toEqual(true);
        expect(newState.currentSelectionId).toEqual(1);
        expect(newState.keys[selection_id]).toEqual(selection);
    });
    it('should handle "select" action', () => {
        const thesis = {
            id: 1,
            bio_taxon_name: '',
            bio_taxon_type: '',
            thesis: 'Thesis 1',
            selection_id: 1,
            next_selection_id: 3,
          };
        const newState = plantKeyReducer(initialState, {
            type: 'plantKey/select',
            payload: thesis
          });
        expect(newState.currentSelectionId).toEqual(3);
        expect(newState.selectionHistory[0]).toEqual(thesis);
        expect(newState.taxon.found).toEqual(false);
    });
    it('should handle "select" action with bio taxon', () => {
        const thesis = {
            id: 1,
            bio_taxon_name: 'Ephedraceae',
            bio_taxon_type: 'familia',
            thesis: 'Thesis 1',
            selection_id: 22,
            next_selection_id: 0,
          };
        const newState = plantKeyReducer(initialState, {
            type: 'plantKey/select',
            payload: thesis
          });
        expect(newState.currentSelectionId).toEqual(0);
        expect(newState.selectionHistory[0]).toEqual(thesis);
        expect(newState.taxon.found).toEqual(true);
        expect(newState.taxon.name).toEqual('Ephedraceae');
        expect(newState.taxon.type).toEqual('familia');
    });
    it('should handle "selectFromHistory" action', () => {
        const selection = {
            selection_id: 33
        };
        const state = {
            ...initialState, 
            selectionHistory: [
                {
                    id: 1,
                    bio_taxon_name: '',
                    bio_taxon_type: '',
                    thesis: 'Thesis 1',
                    selection_id: 2,
                    next_selection_id: 33,
                },
                {
                    id: 2,
                    bio_taxon_name: '',
                    bio_taxon_type: '',
                    thesis: 'Thesis 2',
                    selection_id: 33,
                    next_selection_id: 44,
                }
            ]
        };
        const newState = plantKeyReducer(state, {
            type: 'plantKey/selectFromHistory',
            payload: selection
        });
        expect(newState.currentSelectionId).toEqual(33);
        expect(newState.taxon.found).toEqual(false);
        expect(newState.taxon.name).toEqual('');
        expect(newState.taxon.type).toEqual('');
        expect(newState.selectionHistory).toEqual(expect.not.objectContaining([
            {
                id: 2,
                bio_taxon_name: '',
                bio_taxon_type: '',
                thesis: 'Thesis 2',
                selection_id: 33,
                next_selection_id: 44,
            }
        ]));
    });
});