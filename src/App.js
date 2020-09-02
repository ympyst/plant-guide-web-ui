import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { load, select, selectFromHistory } from './app/plantkey/plantkey.js';
import Container from 'react-bootstrap/Container';
import { Selection } from './features/selection/Selection.js';
import { Taxon } from './features/taxon/Taxon.js';
import { History } from './features/history/History.js';
import './App.css';

function App() {
    const dataSource = 'familia_guide.json';
    const dispatch = useDispatch();
    const keysLoaded = useSelector((state) => state.plantkey.loaded);
    const history = useSelector((state) => state.plantkey.selectionHistory);
    const selectCallback = useCallback((item) => dispatch(selectFromHistory(item)), [dispatch]);

    useEffect(
        () => {
           fetch(dataSource)
               .then((r) => r.json())
               .then((r) => { dispatch(load(r)); });
        },
        [dispatch, dataSource]
    );
    
    return (
        <Container className="App">
          <h1>Определитель семейств</h1>
            {!keysLoaded && <div>Loading...</div>}
            {keysLoaded && <div className="selection"><SelectionContainer/></div>}
            {keysLoaded && <History history={history} selectCallback={selectCallback}/>}
        </Container>
    );
}

function SelectionContainer() {
    const dispatch = useDispatch();
    const taxon = useSelector((state) => state.plantkey.taxon);
    const currentSelection = useSelector((state) => state.plantkey.keys[state.plantkey.currentSelectionId] );
    const selectCallback = useCallback((item) => dispatch(select(item)), [dispatch]);

    return (
        <div>
            {!taxon.found && <Selection selection={currentSelection} selectCallback={selectCallback}/>}
            {taxon.found && <Taxon {...taxon} />}
        </div>
    );
}

export default App;
