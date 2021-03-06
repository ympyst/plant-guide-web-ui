import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'
import styles from './Selection.module.css';

export function Selection(props) {
    return (
        <div>
            <Thesis {...props.selection[0]} selectCallback={props.selectCallback} />
                <div className="text-center">
                    <h3 className={styles.or}>или</h3>
                </div>
            <Thesis {...props.selection[1]} selectCallback={props.selectCallback} />
        </div>
    );
}

function Thesis(props) {
    const {selectCallback, ...selectParams } = props;
    return (
        <Jumbotron>
            <p>
                {props.thesis}
            </p>
            <div className="text-center">
                <Button onClick={() => selectCallback(selectParams)}>Выбрать</Button>
            </div>
        </Jumbotron>
    );
}