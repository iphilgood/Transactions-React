// @flow

import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

import { User } from '../api'
import LatestTransactions from './LatestTransactions'
import NewPayment from './NewPayment'
import mitt from './mitt'

export type Props = {
  token: string,
  user: ?User,
}

class Dashboard extends React.Component {

  emitter = mitt()
  props: Props

  render() {
    return (
      <Segment.Group raised>
        <Segment>
          <h1>Account {this.props.user.accountNr}</h1>
        </Segment>
        <Segment>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={6}>
                <NewPayment emitter={this.emitter} {...this.props} />
              </Grid.Column>
              <Grid.Column width={10}>
                <LatestTransactions emitter={this.emitter} {...this.props} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    )
  }
}

export default Dashboard
