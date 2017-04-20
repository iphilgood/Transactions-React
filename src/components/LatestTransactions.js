// @flow

import React from 'react'
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

  componentDidMount() {
    getTransactionsWithCount(3, this.props.token)
      .then(({ result: transactions }) => this.setState({ transactions }));
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Source</th>
              <th>Target</th>
              <th>Amount [CHF]</th>
              <th>Balance [CHF]</th>
            </tr>
          </thead>
          <TransactionsList transactions={this.state.transactions} />
        </table>
      </div>
    )
  }
}

export default LatestTransactions
