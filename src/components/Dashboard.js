// @flow

import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

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
      <Segment.Group raised>
        <Segment>
          <h1>Kontoübersicht {this.props.user.accountNr}</h1>
        </Segment>
        <Segment>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={6}>
                <NewPayment {...this.props} />
              </Grid.Column>
              <Grid.Column width={10}>
                <LatestTransactions {...this.props} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    )
  }
}

export default Dashboard
