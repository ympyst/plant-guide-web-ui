import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
        <Card onClick={() => selectCallback(selectParams)} bg="light">
            <Card.Body>
                <Card.Text>
                    {props.thesis}
                </Card.Text>
                <div className="text-center">
                    <Button>Выбрать</Button>
                </div>
            </Card.Body>
        </Card>
    );
}