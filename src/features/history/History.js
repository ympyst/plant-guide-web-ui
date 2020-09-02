import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import styles from './History.module.css';

export function History(props) {
    const items = props.history.slice(0).reverse().map((h) => <HistoryItem {...h} selectCallback={props.selectCallback} key={h.id}/>);
    const hasHistory = items.length > 0;
    return (
        <div>
            {hasHistory && <h3>История выбора</h3>}
            <Table variant='light'>
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