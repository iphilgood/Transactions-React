// @flow

import React from 'react'
import { Button, Form, Header, Message } from 'semantic-ui-react'

import { transfer, getAccount, getAccountDetails, AccountNr, User } from '../api'

export type Props = {
  token: string,
  user: ?User
}

class NewPayment extends React.Component {

  props: Props

  state: {
    source: AccountNr,
    balance?: Number,
    success: Bool,
    error?: Error,
    target: AccountNr,
    targetValid: Bool,
    targetMessage: String,
    amount: Number
  }

  state = {
    source: this.props.user.accountNr,
    balance: undefined,
    success: false,
    error: undefined,
    target: "",
    targetValid: false,
    targetMessage: "",
    amount: 0
  }

  componentDidMount() {
    this.updateSource()
    this.validateTarget("")
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { target, amount } = this.state
    transfer(target, amount, this.props.token).then(result => {
      this.setState({ balance: result.total, success: true })
      this.props.emitter.emit('paymentCompleted')
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

  validateTarget = (target: String) => {
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
    return this.state.amount >= 0.05 && this.state.amount <= this.state.balance && Math.round(Math.round(this.state.amount * 100) % 5) === 0
  }

  isTargetValid = () => {
    return this.state.targetValid
  }

  isFormValid = () => {
    return this.isAmountValid() && this.isTargetValid()
  }

  startOver = () => {
    this.setState({ success: false, amount: 0, error: null })
    this.validateTarget("")
  }

  updateSource = () => {
    getAccountDetails(this.props.token).then(result => {
      this.setState({ balance: result.amount })
    })
  }

  render() {
    const { source, balance, target, amount, success, error } = this.state
    const sourceText = `${source} ${balance === undefined ? "" : `[CHF ${balance}]`}`

    return (
      <div>
        <Header as='h3'>New payment</Header>
        <Form hidden={success} className={error ? 'error' : ''} onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor="from">Source</label>
            <input type="text" name="from" value={sourceText} required disabled />
          </Form.Field>

          <Form.Field>
            <label htmlFor="target">Target</label>
            <input placeholder="Target account number" value={target} onChange={this.targetChanged} type="text" name="target" pattern=".{7,}" min="1000000" max="9999999" step="1" required />
            <p>{this.state.targetMessage}</p>
          </Form.Field>

          <Form.Field>
            <label htmlFor="amount">Amount [CHF]</label>
            <input placeholder="Amount in CHF" value={amount} onChange={this.amountChanged} type="number" name="amount" min="0.05" step="0.05" required />
            <p hidden={this.isAmountValid()}>Please specify the amount.</p>
          </Form.Field>

          { error && <Message error header='Ooops!' content='Unable to pay.' /> }

          <Button className={this.isFormValid() ? "" : "disabled"} primary fluid>Pay</Button>
        </Form>
        <div hidden={!success}>
          <p>Transaction to {target} succeeded!</p>
          <p>New balance: {balance}</p>
          <Button primary fluid onClick={this.startOver}>Start over</Button>
        </div>
      </div>
    )
  }
}

export default NewPayment
