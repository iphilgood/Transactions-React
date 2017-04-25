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
              <p>Willkommen zurück!</p>
              <Link className='ui button' to={'/dashboard'}>Zum Dashboard</Link>
            </div>
          : <div>
              <Link className='ui primary button fluid' to={'/login'}>Einloggen</Link>
              <p style={{ marginTop: 16 }}>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
              <Link className='ui button fluid' to={'/signup'}>Registrieren</Link>
            </div>
        }
      </Segment>
    </Grid.Column>
  </Grid>
)

export default Home
