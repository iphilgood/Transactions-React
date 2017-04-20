// @flow

import React from 'react';

function TransactionsList({transactions}) {

    const renderTransactionRow = ({date, from, target, amount, total}, index) =>
      <tr key={index}>
        <td>{date}</td>
        <td>{from}</td>
        <td>{target}</td>
        <td>{amount} CHF</td>
        <td>{total} CHF</td>
      </tr>

    return <tbody>{transactions.map(renderTransactionRow)}</tbody>
}

export default TransactionsList
