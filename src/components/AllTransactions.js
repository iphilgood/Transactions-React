// @flow

import React from 'react'

import { getTransactionsBetween, Transaction } from '../api'
import TransactionsList from './TransactionsList'

export type Props = {
  token: string,
  transactions: Array<Transaction>,
}

class AllTransactions extends React.Component {

  props: Props

  years: Array<Number>
  months: Array<String>

  state: {
    transactions: Array<Transaction>,
    selectedYear: Number,
    selectedMonth: Number
  }

  constructor(props: any) {
    super(props)

    this.years = Array.from(Array(3)).map((x, i) => new Date().getFullYear() - i);
    this.months = Array.from(Array(12)).map((x, i) => new Date(`${i + 1} / 01/2000`).toLocaleString('en-us', { month: 'long' }));

    const date = new Date();
    this.state = {
      transactions: [],
      selectedYear: date.getFullYear(),
      selectedMonth: date.getMonth()
    }
  }

  componentDidMount() {
    const { selectedYear, selectedMonth } = this.state
    this.updateTransactions(selectedYear, selectedMonth);
  }

  yearChanged = (event: Event) => {
    const year = event.target.value
    this.setState({ selectedYear: year });
    this.updateTransactions(year, this.state.selectedMonth);
  }

  monthChanged = (event: Event) => {
    const month = event.target.value
    this.setState({ selectedMonth: month });
    this.updateTransactions(this.state.selectedYear, month);
  }

  updateTransactions = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, parseInt(month, 10) + 1, 0);
    getTransactionsBetween(firstDay, lastDay, this.props.token)
        .then(({ result: transactions }) => this.setState({ transactions }));
  }

  render() {
    return (
      <div>
        <h1>All Transactions</h1>

        <h4>Filter</h4>

        <div>
          <label htmlFor="year">Select a year</label>
          <select name="year" value={this.state.selectedYear} onChange={this.yearChanged}>
            {this.years.map((value, index) =>
              <option key={index} value={value}>{value}</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="month">Select a month</label>
          <select name="month" value={this.state.selectedMonth} onChange={this.monthChanged}>
          {this.months.map((value, index) =>
            <option key={index} value={index}>{value}</option>
          )}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Source</th>
              <th>Target</th>
              <th>Amount [CHF]</th>
              <th>Balance [CHF]</th>
            </tr>
          </thead>
          <TransactionsList transactions={this.state.transactions} />
        </table>
      </div>
    )
  }
}

export default AllTransactions
