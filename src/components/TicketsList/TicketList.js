import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import logo from '../../assets/tk_logo.png'
import { plural } from '../../utils'
import { CURRENCY_RUB, CURRENCY_USD, CURRENCY_EUR } from '../../constant'

const currencyCode = {
  [CURRENCY_RUB]: '₽',
  [CURRENCY_EUR]: '€',
  [CURRENCY_USD]: '$',
}

const Destination = ({ name, fullName, date }) => {
  return (
    <div>
      <div className="city">{`${name}, ${fullName}`}</div>
      <div className="date">{date}</div>
    </div>
  )
}

Destination.propTypes = {
  name: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export const TicketList = ({ tickets }) => {
  return tickets.map((item) => {
    return (
      <div className="ticket" key={item.id}>
        <div className="price">
          <img src={logo} alt="tk_logo" />
          <button type="button" className="buy">
                Купить
            <br />
            {`за ${item.price} ${currencyCode[item.currency]}`}
          </button>
        </div>
        <div className="info">
          <div className="time">
            <div className="left">{item.departure_time}</div>
            <div className="stops">
              <div className={item.stops === 0 ? 'text hidden' : 'text'}>{`${item.stops} ${plural(item.stops)}`}</div>
              <div className="line" />
            </div>
            <div className="right">{item.arrival_time}</div>
          </div>
          <div className="destination">
            <Destination
              name={item.origin}
              fullName={item.origin_name}
              date={item.departure_date}
            />
            <Destination
              name={item.destination}
              fullName={item.destination_name}
              date={item.arrival_date}
            />
          </div>
        </div>
      </div>
    )
  })
}

TicketList.propTypes = {
  ticket: PropTypes.arrayOf(PropTypes.object).isRequired,
}
