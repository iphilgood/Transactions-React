// @flow

import React from 'react';
import Moment from 'react-moment';

function TransactionsList({transactions}) {

    const renderTransactionRow = ({date, from, target, amount, total}, index) =>
      <tr key={index}>
        <td><Moment format="DD.MM.YYYY">{date}</Moment></td>
        <td>{from}</td>
        <td>{target}</td>
        <td>{amount} CHF</td>
        <td>{total} CHF</td>
      </tr>

    return <tbody>{transactions.map(renderTransactionRow)}</tbody>
}

export default TransactionsList
