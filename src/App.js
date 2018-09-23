import React, { Component } from 'react'
import moment from 'moment'
import './App.css'
import data from './tickets.json'
import { FilterStops } from './components/FilterStops'
import { CurrencySwitcher } from './components/CurrencySwitcher'
import { CURRENCY_RUB, CURRENCY_USD, CURRENCY_EUR } from './constant'
import { TicketList } from './components/TicketsList/TicketList'
import logo from './assets/Logo.svg'

const currencyRate = {
  [CURRENCY_RUB]: 1,
  [CURRENCY_EUR]: 0.013,
  [CURRENCY_USD]: 0.015,
}

class App extends Component {
  state = {
    tickets: [],
    stops: [],
    filter: [],
    currency: CURRENCY_RUB,
  }

  componentDidMount() {
    const ticketsList = data.tickets.map((item, index) => {
      return { ...item, id: Math.round(new Date().getMilliseconds() + index) }
    })
    const stops = [...new Set(data.tickets.map((ticket) => { return ticket.stops }))]
    this.setState({
      tickets: ticketsList,
      stops: stops.sort((a, b) => { return a - b }),
      filter: stops,
    })
  }

  handeFilterByStop = (countStops) => {
    this.setState({
      filter: countStops,
    })
  }

  handleChangeCurrency = (currency) => { return this.setState({ currency }) }

  render() {
    const {
      tickets, stops, filter, currency,
    } = this.state
    const filterTickets = tickets.filter((ticket) => { return filter.includes(ticket.stops) })
      .map((ticket) => {
        return {
          ...ticket,
          departure_date: moment(ticket.departure_date, 'DD.MM.YY').format('D MMM YYYY, dd'),
          arrival_date: moment(ticket.arrival_date, 'DD.MM.YY').format('D MMM YYYY, dd'),
          price: Math.round(ticket.price * currencyRate[currency]),
          currency,
        }
      })
    return (
      <div className="app">
        <div className="header">
          <img src={logo} alt="logo-aviasales" />
        </div>
        <div className="container">
          <div className="side-bar">
            <CurrencySwitcher currentCurrency={currency} onChange={this.handleChangeCurrency} />
            <FilterStops stops={stops} filter={filter} onChange={this.handeFilterByStop} />
          </div>
          <div className="ticket-list">
            <TicketList tickets={filterTickets} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
