// @flow

import React from 'react'
import { User } from '../api'
import LatestTransactions from './LatestTransactions'
import NewPayment from './NewPayment'

export type Props = {
  token: string,
  user: ?User,
}

class Dashboard extends React.Component {

  props: Props

  render() {
    return (
      <div>
        <h1>Kontoübersicht {this.props.user.accountNr}</h1>
        This is the dashboard
        <NewPayment {...this.props} />
        <LatestTransactions {...this.props} />
      </div>
    )
  }
}

export default Dashboard
