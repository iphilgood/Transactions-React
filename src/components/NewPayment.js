// @flow

import React from 'react'
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
        <form>
          <div>
            <label htmlFor="from">From</label>
            <input type="text" name="from" value={this.props.user.accountNr} required disabled />
          </div>

          <div>
            <label htmlFor="target">To</label>
            <input placeholder="Target Account Number" value={target} onChange={this.targetChanged} type="text" name="target" required />
          </div>

          <div>
            <label htmlFor="amount">Amount [CHF]</label>
            <input placeholder="Amount in CHF" value={amount} onChange={this.amountChanged} type="number" name="amount" required />
          </div>

          <button onClick={this.handleSubmit}>Zahlen</button>
        </form>
        { error && <p>Es ist ein Fehler aufgetreten!</p> }
      </div>
    )
  }
}

export default NewPayment
