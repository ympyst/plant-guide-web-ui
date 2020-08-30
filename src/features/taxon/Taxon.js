import React from 'react';
import styles from './Taxon.module.css';

export function Taxon(props) {
    const {type, name} = props;
    return (
        <div className={styles.taxon}>{type}:{name}</div>
    );
}