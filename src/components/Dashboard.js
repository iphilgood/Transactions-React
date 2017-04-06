// @flow

import React from 'react'

import { getTransactions } from '../api'
import { User, Transaction } from '../api'
import TransactionsList from './TransactionsList'

/*
  Use the api functions to call the API server. For example, the transactions
  can be retrieved and stored in the state as follows:

  getTransactions(this.props.token)
    .then(({result: transactions}) =>
      this.setState({transactions})
    )

  import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
*/

export type Props = {
  token: string,
  user: ?User,
}

class Dashboard extends React.Component {

  state: {
    user: ?User,
    transactions: Array<Transaction>,
  }

  state = {
    transactions: []
  }

  componentDidMount() {
    getTransactions(this.props.token)
      .then(({ result: transactions }) => this.setState({ transactions }));
  }

  render() {

    return (
      <div>
        <h1>Kontoübersicht {this.props.user.accountNr}</h1>
        This is the dashboard
        <table>
          <thead>
            <tr>
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

export default Dashboard
