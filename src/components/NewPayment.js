// @flow

import React from 'react'
import { Button, Form, Header, Message } from 'semantic-ui-react'

import { transfer, AccountNr, User } from '../api'

export type Props = {
  token: string,
  user: ?User
}

class NewPayment extends React.Component {

  props: Props

  state: {
    error?: Error,
    target: AccountNr,
    amount: Number
  }

  state = {
    error: undefined,
    target: "",
    amount: 0
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { target, amount } = this.state
    transfer(target, amount, this.props.token).then(result => {
      console.log("Transaction successful ", result)
      this.setState({ target: "", amount: 0, error: null })
    }).catch(error =>
      this.setState({ error })
    )
  }

  targetChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({ target: event.target.value })
    }
  }

  amountChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({ amount: event.target.value })
    }
  }

  render() {
    const { target, amount, error } = this.state

    return (
      <div>
        <Header as='h3'>Neue Zahlung</Header>
        <Form className={error ? 'error' : ''}>
          <Form.Field>
            <label htmlFor="from">From</label>
            <input type="text" name="from" value={this.props.user.accountNr} required disabled />
          </Form.Field>

          <Form.Field>
            <label htmlFor="target">To</label>
            <input placeholder="Zielkonto" value={target} onChange={this.targetChanged} type="text" name="target" required />
          </Form.Field>

          <Form.Field>
            <label htmlFor="amount">Betrag [CHF]</label>
            <input placeholder="Betrag in CHF" value={amount} onChange={this.amountChanged} type="number" name="amount" required />
          </Form.Field>

          { error && <Message error header='Hoppla!' content='Es ist ein Fehler aufgetreten.' /> }

          <Button primary fluid onClick={this.handleSubmit}>Betrag Überweisen</Button>
        </Form>
      </div>
    )
  }
}

export default NewPayment
