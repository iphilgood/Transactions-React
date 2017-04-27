// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Segment } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <Grid textAlign='center' centered>
    <Grid.Column className="column__tight">
      <Header as='h2'>Bank of Rapperswil</Header>
      <Segment raised>
        <Header as='h3'>E-Banking-Portal</Header>
        { isAuthenticated
          ? <div>
              <p>Welcome back!</p>
              <Link className='ui button' to={'/dashboard'}>Go to dashboard</Link>
            </div>
          : <div>
              <Link className='ui primary button fluid' to={'/login'}>Login</Link>
              <p style={{ marginTop: 16 }}>If you don't have an account yet please sign up.</p>
              <Link className='ui button fluid' to={'/signup'}>Register</Link>
            </div>
        }
      </Segment>
    </Grid.Column>
  </Grid>
)

export default Home
