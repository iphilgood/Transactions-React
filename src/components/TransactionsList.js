// @flow

import React from 'react';

function TransactionsList({transactions}) {

    const renderTransactionRow = ({from, target, amount, total}, index) =>
      <tr key={index}>
        <td>{from}</td>
        <td>{target}</td>
        <td>{amount} CHF</td>
        <td>{total} CHF</td>
      </tr>

    return <tbody>{transactions.map(renderTransactionRow)}</tbody>
}

export default TransactionsList
