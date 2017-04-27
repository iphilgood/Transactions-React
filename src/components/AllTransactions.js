// @flow

import React from 'react'
import { Form, Header, Segment, Table } from 'semantic-ui-react'

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
    this.yearOptions = this.years.map((value, index) => { return { key: index, text: value, value: value}})

    this.months = Array.from(Array(12)).map((x, i) => new Date(`${i + 1} / 01/2000`).toLocaleString('en-us', { month: 'long' }));
    this.monthOptions = this.months.map((value, index) => { return { key: index, text: value, value: index}})

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

  yearChanged = (event: Event, { value }) => {
    const year = value
    this.setState({ selectedYear: year });
    this.updateTransactions(year, this.state.selectedMonth);
  }

  monthChanged = (event: Event, { value }) => {
    const month = value
    this.setState({ selectedMonth: month });
    this.updateTransactions(this.state.selectedYear, month);
  }

  updateTransactions = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, parseInt(month, 10) + 1, 0);
    getTransactionsBetween(firstDay, lastDay, this.props.token)
        .then(({ result: transactions }) => this.setState({ transactions }));
  }

  const

  render() {
    return (
      <Segment raised>
        <Header as='h3'>All Transactions</Header>

        <Form>
          <Form.Group widths='equal'>
            <Form.Select label='Select a year' options={this.yearOptions} placeholder='Select a year' onChange={this.yearChanged} value={this.state.selectedYear} />
            <Form.Select label='Select a month' options={this.monthOptions} placeholder='Select a month' onChange={this.monthChanged} value={this.state.selectedMonth} />
          </Form.Group>
        </Form>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Source</Table.HeaderCell>
              <Table.HeaderCell>Target</Table.HeaderCell>
              <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
              <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <TransactionsList transactions={this.state.transactions} />
        </Table>
      </Segment>
    )
  }
}

export default AllTransactions
