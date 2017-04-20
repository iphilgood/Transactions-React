// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { signup } from '../api'

class Signup extends React.Component {

  state: {
    login: String,
    didChangeLogin: Boolean,
    firstname: String,
    lastname: String,
    password: String,
    didChangePassword: Boolean,
    error: String,
    redirectToReferrer: Boolean,
  }

  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false,
  }

  didChangeLogin = false
  didChangeFirstname = false
  didChangeLastname = false
  didChangePassword = false

  isFormValid = () => {
    if (!this.didChangeLogin || !this.didChangePassword || !this.didChangeFirstname || !this.didChangeLastname) {
      return false
    }
    return this.isLoginValid() && this.isPasswordValid() && this.isFirstnameValid() && this.isLastnameValid()
  }

  handleLoginChanged = (event: Event) => {
    this.didChangeLogin = true
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  isLoginValid = () => {
    if (!this.didChangeLogin) {
      return true
    }
    return this.state.login.length >= 3
  }

  handleFirstNameChanged = (event: Event) => {
    this.didChangeFirstname = true
    if(event.target instanceof HTMLInputElement) {
      this.setState({firstname: event.target.value})
    }
  }

  isFirstnameValid = () => {
    if (!this.didChangeFirstname) {
      return true
    }
    return this.state.firstname.length >= 2
  }

  handleLastNameChanged = (event: Event) => {
    this.didChangeLastname = true
    if(event.target instanceof HTMLInputElement) {
      this.setState({lastname: event.target.value})
    }
  }

  isLastnameValid = () => {
    if (!this.didChangeLastname) {
      return true
    }
    return this.state.lastname.length >= 2
  }

  handlePasswordChanged = (event: Event) => {
    this.didChangePassword = true
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  isPasswordValid = () => {
    if (!this.didChangePassword) {
      return true
    }
    return this.state.password.length >= 3;
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

            <Form.Input className={this.isLoginValid() ? "" : "error"} label="Username" onChange={this.handleLoginChanged} placeholder='Username' value={this.state.login} />
            <Message error hidden={this.isLoginValid()} header='Username invalid' content='Username must have at least 3 characters.' />
            <Form.Input className={this.isFirstnameValid() ? "" : "error"} label="First name" onChange={this.handleFirstNameChanged} placeholder='First name' value={this.state.firstname} />
            <Message error hidden={this.isFirstnameValid()} header='First name invalid' content='First name must have at least 2 characters.' />
            <Form.Input className={this.isLastnameValid() ? "" : "error"} label="Last name" onChange={this.handleLastNameChanged} placeholder='Last name' value={this.state.lastname} />
            <Message error hidden={this.isLastnameValid()} header='First name invalid' content='First name must have at least 2 characters.' />
            <Form.Input className={this.isPasswordValid() ? "" : "error"} label="Password" onChange={this.handlePasswordChanged} placeholder='Password' type="password" value={this.state.password} />
            <Message error hidden={this.isPasswordValid()} header='Password invalid' content='Password must have at least 3 characters.' />

            { error && <Message error header='Hoppla!' content='Es ist ein Fehler aufgetreten.' /> }

            <Button primary fluid className={this.isFormValid() ? "" : "disabled"} onClick={this.handleSubmit}>Account eröffnen</Button>
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
