// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { signup } from '../api'

class Signup extends React.Component {

  state: {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    error: string,
    redirectToReferrer: boolean,
  }

  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  handleFirstNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({firstname: event.target.value})
    }
  }

  handleLastNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({lastname: event.target.value})
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, firstname, lastname, password } = this.state
    signup(login, firstname, lastname, password).then(result => {
      console.log("Signup result ", result)
      this.setState({redirectToReferrer: true, error: null})
    }).catch(error =>
      this.setState({error})
    )
  }

  render() {
    const { redirectToReferrer, error } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to='/login'/>
      )
    }

    return (
      <Grid.Column>
        <Header as='h2'>Bank of Rapperswil</Header>
        <Form className={error ? 'error' : ''}>
          <Segment raised>
            <Header as='h3'>Registrieren</Header>
            <Form.Field>
              <input onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login} />
            </Form.Field>
            <Form.Field>
              <input onChange={this.handleFirstNameChanged} placeholder='Vorname' value={this.state.firstname} />
            </Form.Field>
            <Form.Field>
              <input onChange={this.handleLastNameChanged} placeholder='Nachname' value={this.state.lastname} />
            </Form.Field>
            <Form.Field>
              <input onChange={this.handlePasswordChanged} placeholder='Passwort' type="password" value={this.state.password} />
            </Form.Field>

            { error && <Message error header='Hoppla!' content='Es ist ein Fehler aufgetreten.' /> }

            <Button primary fluid onClick={this.handleSubmit}>Account eröffnen</Button>
          </Segment>
        </Form>

        <Message>
          <Link to="/">Zurück zur Startseite</Link>
        </Message>
      </Grid.Column>
    )
  }
}

export default Signup
