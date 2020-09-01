import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './History.module.css';
import Table from 'react-bootstrap/Table';

export function History(props) {
    const items = props.history.slice(0).reverse().map((h) => <HistoryItem {...h} selectCallback={props.selectCallback} key={h.id}/>);
    const hasHistory = items.length > 0;
    return (
        <div>
            {hasHistory && <h3>История выбора</h3>}
            <Table className={styles.item} bg="success" variant='light'>
                <tbody>
                    {items}
                </tbody>
            </Table>
        </div>
    );
}

function HistoryItem(props) {
    const {selectCallback, ...selectParams } = props;
    return (
        <tr>
            <td>{props.thesis}</td>
            <td>
                 <Button onClick={() => selectCallback(selectParams)} size="sm" variant="outline-info"> → </Button> 
            </td>
        </tr>
    );
}