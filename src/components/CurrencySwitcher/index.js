import React from 'react'
import PropTypes from 'prop-types'
import { CURRENCY_RUB, CURRENCY_USD, CURRENCY_EUR } from '../../constant'
import './style.css'

const availableCurrency = [
  CURRENCY_RUB, CURRENCY_USD, CURRENCY_EUR,
]

export const CurrencySwitcher = ({ onChange, currentCurrency }) => {
  return (
    <div className="currency-container">
      <div className="title">Валюта</div>
      <div>
        {availableCurrency.map((currency) => {
          return (
            <button
              type="button"
              className={currency === currentCurrency ? 'button active' : 'button'}
              key={currency}
              onClick={() => { return onChange(currency) }}
            >
              {currency}
            </button>
          )
        })}
      </div>
    </div>
  )
}

CurrencySwitcher.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentCurrency: PropTypes.string.isRequired,
}
