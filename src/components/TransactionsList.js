// @flow

import React from 'react';
import Moment from 'react-moment';
import { Table } from 'semantic-ui-react'

function TransactionsList({transactions}) {

    const renderTransactionRow = ({date, from, target, amount, total}, index) =>
      <Table.Row key={index}>
        <Table.Cell><Moment format="DD.MM.YYYY">{date}</Moment></Table.Cell>
        <Table.Cell>{from}</Table.Cell>
        <Table.Cell>{target}</Table.Cell>
        <Table.Cell>{amount} CHF</Table.Cell>
        <Table.Cell>{total} CHF</Table.Cell>
      </Table.Row>

    return <Table.Body>{transactions.map(renderTransactionRow)}</Table.Body>
}

export default TransactionsList
