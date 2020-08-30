import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './History.module.css';

export function History(props) {
    const items = props.history.slice(0).reverse().map((h) => <HistoryItem {...h} selectCallback={props.selectCallback} key={h.id}/>);
    return (
        <div>
            <h3>История выбора</h3>
            {items}
        </div>
    );
}

function HistoryItem(props) {
    const {selectCallback, ...selectParams } = props;
    return (
        <Card className={styles.item} onClick={() => selectCallback(selectParams)} bg="success">
            <Card.Body>
                <Card.Text>{props.thesis}</Card.Text>
            </Card.Body>
        </Card>
    );
}