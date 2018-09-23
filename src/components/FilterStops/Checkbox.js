import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export const Checkbox = ({
  checked, onChange, count, label,
}) => {
  return (
    <label htmlFor={count} className={checked ? 'checkbox checked' : 'checkbox'}>
      <input id={count} className="input" type="checkbox" value={count} checked={checked} onChange={onChange} />
      <span className="icon" />
      <span className="text">{label}</span>
    </label>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
}
