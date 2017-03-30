// @flow

import React from 'react'

import { getTransactions } from '../api'
import { User, Transaction } from '../api'

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

  componentDidMount() {
    getTransactions(this.props.token)
      .then(({ result: transactions }) => this.setState({ transactions }));
  }

  render() {

    return (
      <div>
        <h1>{this.props.user.accountNr}</h1>
        This is the dashboard
      </div>
    )
  }
}

export default Dashboard
