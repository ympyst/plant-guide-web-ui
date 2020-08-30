import React from 'react';
import styles from './Selection.module.css';

export function Selection(props) {
    return (
        <div>
            <Thesis {...props.selection[0]} selectCallback={props.selectCallback} />
            <p className={styles.or}>или</p>
            <Thesis {...props.selection[1]} selectCallback={props.selectCallback} />
        </div>
    );
}

function Thesis(props) {
    const {selectCallback, ...selectParams } = props;
    return (
        <div onClick={() => selectCallback(selectParams)} className={styles.thesis}>
            <div>{props.thesis}</div>
            <button>Выбрать</button>
        </div>
    );
}