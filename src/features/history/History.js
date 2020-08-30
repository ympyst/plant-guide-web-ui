import React from 'react';
import styles from './History.module.css';

export function History(props) {
    const items = props.history.map((h, i) => <HistoryItem {...h} selectCallback={props.selectCallback} key={h.id}/>);
    return (
        <div>
            {items}
        </div>
    );
}

function HistoryItem(props) {
    const {selectCallback, ...selectParams } = props;
    return (
        <div className={styles.item} onClick={() => selectCallback(selectParams)}>
            {props.thesis}
        </div>
    );
}