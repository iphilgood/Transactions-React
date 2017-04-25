// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

import { getTransactionsWithCount, Transaction } from '../api'
import TransactionsList from './TransactionsList'

export type Props = {
  token: string
}

class LatestTransactions extends React.Component {

  state: {
    transactions: Array<Transaction>,
  }

  state = {
    transactions: []
  }

  refresh = () => {
    console.log('will refresh latest transactions')
    getTransactionsWithCount(3, this.props.token)
      .then(({ result: transactions }) => this.setState({ transactions }));
  }

  componentDidMount() {
    this.props.emitter.on('paymentCompleted', this.refresh)
    this.refresh()
  }

  componentWillUnmount() {
    this.props.emitter.off('paymentCompleted', this.refresh)
  }

  render() {
    return (
      <div>
        <Header as='h3'>Letzte Zahlungen</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Source</Table.HeaderCell>
              <Table.HeaderCell>Target</Table.HeaderCell>
              <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
              <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <TransactionsList transactions={this.state.transactions} />
        </Table>

        <Link to='/transactions' className='ui button right floated'>Alle Transaktionen anzeigen</Link>
      </div>
    )
  }
}

export default LatestTransactions
