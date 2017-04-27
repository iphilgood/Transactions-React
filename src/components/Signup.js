// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { signup } from '../api'

class Signup extends React.Component {

  state: {
    login: String,
    firstname: String,
    lastname: String,
    password: String,
    confirmpassword: String,
    error: String,
    redirectToReferrer: Boolean,
  }

  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    error: null,
    redirectToReferrer: false,
  }

  isFormValid = () => {
    return this.isLoginValid() && this.isConfirmPasswordValid() && this.isFirstNameValid() && this.isLastNameValid()
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  isLoginValid = () => {
    return this.state.login.length >= 3
  }

  handleFirstNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({firstname: event.target.value})
    }
  }

  isFirstNameValid = () => {
    return this.state.firstname.length >= 2
  }

  handleLastNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({lastname: event.target.value})
    }
  }

  isLastNameValid = () => {
    return this.state.lastname.length >= 2
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  isPasswordValid = () => {
    return this.state.password.length >= 3;
  }

  handleConfirmPasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({confirmpassword: event.target.value})
    }
  }

  isConfirmPasswordValid = () => {
    return this.isPasswordValid() && this.state.confirmpassword === this.state.password;
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
      <Grid textAlign='center' centered>
        <Grid.Column className="column__tight">
          <Header as='h2'>Bank of Rapperswil</Header>
          <Form className={error ? 'error' : ''}>
            <Segment raised>
              <Header as='h3'>Sign up</Header>

              <Form.Field>
                <label>First name</label>
                <input onChange={this.handleFirstNameChanged} placeholder='First name' value={this.state.firstname} />
                <p hidden={this.isFirstNameValid()}>Please specify your first name.</p>
              </Form.Field>

              <Form.Field>
                <label>Last name</label>
                <input onChange={this.handleLastNameChanged} placeholder='Last name' value={this.state.lastname} />
                <p hidden={this.isLastNameValid()}>Please specify your last name.</p>
              </Form.Field>

              <Form.Field>
                <label>User name</label>
                <input onChange={this.handleLoginChanged} placeholder='User' value={this.state.login} />
                <p hidden={this.isLoginValid()}>Please specify your login, at least three characters.</p>
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input onChange={this.handlePasswordChanged} placeholder='Password' type='password' value={this.state.password} />
                <p hidden={this.isPasswordValid()}>Please specify your password, at least three characters.</p>
              </Form.Field>

              <Form.Field>
                <label>Confirm Password</label>
                <input onChange={this.handleConfirmPasswordChanged} placeholder='Password' type='password' value={this.state.confirmpassword} />
                <p hidden={this.isConfirmPasswordValid()}>Please confirm your password.</p>
              </Form.Field>

              { error && <Message error header='Ooops!' content='Unable to sign up.' /> }

              <Button primary fluid className={this.isFormValid() ? "" : "disabled"} onClick={this.handleSubmit}>Sign Up</Button>
            </Segment>
          </Form>

          <Message>
            <Link to="/">Back to home.</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Signup
