// @flow

import React from 'react'
import { Button, Form, Header, Message } from 'semantic-ui-react'

import { transfer, getAccount, AccountNr, User } from '../api'

export type Props = {
  token: string,
  user: ?User
}

class NewPayment extends React.Component {

  props: Props

  state: {
    error?: Error,
    target: AccountNr,
    targetValid: Bool,
    targetMessage: String,
    amount: Number
  }

  state = {
    error: undefined,
    target: "",
    targetValid: false,
    targetMessage: "",
    amount: 0
  }

  componentDidMount() {
    this.validateTarget()
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { target, amount } = this.state
    transfer(target, amount, this.props.token).then(result => {
      console.log("Transaction successful ", result)
      this.setState({ target: "", amount: 0, error: null })
      this.validateTarget()
    }).catch(error =>
      this.setState({ error })
    )
  }

  targetChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.validateTarget(event.target.value)
    }
  }

  amountChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({ amount: event.target.value })
    }
  }

  validateTarget = (target: String = this.state.target) => {
    if (target.length <= 2) {
      this.setState({ target: target, targetValid: false, targetMessage: "Please specify the target account number."})
      return
    }

    getAccount(target, this.props.token).then(result => {
      this.setState({ target: target, targetValid: true, targetMessage: `${result.owner.firstname} ${result.owner.lastname}`})
    }).catch(error =>
      this.setState({ target: target, targetValid: false, targetMessage: "Unknown account number specified."})
    )
  }

  isAmountValid = () => {
    return this.state.amount >= 0.05
  }

  isTargetValid = () => {
    return this.state.targetValid
  }

  isFormValid = () => {
    return this.isAmountValid() && this.isTargetValid()
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
            <p>{this.state.targetMessage}</p>
          </Form.Field>

          <Form.Field>
            <label htmlFor="amount">Betrag [CHF]</label>
            <input placeholder="Betrag in CHF" value={amount} onChange={this.amountChanged} type="number" name="amount" required />
            <p hidden={this.isAmountValid()}>Please specify the amount.</p>
          </Form.Field>

          { error && <Message error header='Hoppla!' content='Es ist ein Fehler aufgetreten.' /> }

          <Button className={this.isFormValid() ? "" : "disabled"} primary fluid onClick={this.handleSubmit}>Pay</Button>
        </Form>
      </div>
    )
  }
}

export default NewPayment
