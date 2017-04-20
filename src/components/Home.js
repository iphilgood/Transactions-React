// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Segment } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <Segment raised>
          <p>Willkommen zurück!</p>
          <Button as='a' href={'/dashboard'}>Zum Dashboard</Button>
        </Segment>
      : <Segment raised>
          <Button as='a' primary fluid href={'/login'}>Einloggen</Button>
          <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
          <Button as='a' fluid href={'/signup'}>Registrieren</Button>
        </Segment>
    }
  </div>
)

export default Home
