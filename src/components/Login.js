// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {

      from: string,
    }
  }
}

class Login extends React.Component {

  props: Props

  state: {
    login: string,
    password: string,
    error?: Error,
    redirectToReferrer: boolean,
  }

  state = {
    login: "",
    password: "",
    error: undefined,
    redirectToReferrer: false,
  }

  isLoginValid = () => {
    return this.state.login.length >= 3
  }

  isPasswordValid = () => {
      return this.state.password.length >= 3
  }

  isFormValid = () => {
    return this.isLoginValid() && this.isPasswordValid()
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, password } = this.state
    this.props.authenticate(login, password, (error) => {
      if (error) {
        this.setState({error})
      } else {
        this.setState({redirectToReferrer: true, error: null})
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer, error } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <Grid textAlign='center' centered>
        <Grid.Column className="column__tight">
          <Header as='h2'>Bank of Rapperswil</Header>
          <Form className={error ? 'error' : ''}>
            <Segment raised>
              <Header as='h3'>Log in</Header>
              <Form.Field>
                <label>Username</label>
                <input onChange={this.handleLoginChanged} placeholder='Username' value={this.state.login} />
                <p hidden={this.isLoginValid()}>Please specify your username, at least three characters</p>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input onChange={this.handlePasswordChanged} placeholder='Password' type="password" value={this.state.password} />
                <p hidden={this.isPasswordValid()}>Please specify your password, at least three characters</p>
              </Form.Field>

              { error && <Message error header='Ooops!' content='Invalid username or password.' /> }

              <Button className={this.isFormValid() ? "" : "disabled"} primary fluid onClick={this.handleSubmit}>Log in</Button>
            </Segment>
          </Form>

          <Message>
            <Link to="/signup">No account yet? Sign up here.</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
