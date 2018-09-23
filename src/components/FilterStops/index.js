import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from './Checkbox'
import './style.css'
import { plural } from '../../utils'

const labels = [
  'пересадок',
  'пересадка',
  'пересадки',
]

export class FilterStops extends PureComponent {
    filterByOne = (count) => {
      const { onChange, filter } = this.props
      const index = filter.indexOf(count)
      const newFilter = filter.includes(count)
        ? filter.slice(0, index).concat(filter.slice(index + 1))
        : filter.concat([count])
      onChange(newFilter)
    }

    filterByAll = (e) => {
      const { onChange, stops } = this.props
      const newFilter = e.target.checked ? stops : []
      onChange(newFilter)
    }

    handleChange = (e) => { return this.filterByOne(+e.target.value) }

    render() {
      const { stops, filter } = this.props
      const all = stops.length === filter.length
      return (
        <div className="filter">
          <div className="title">Количество пересадок</div>
          <Checkbox label="Все" checked={all} onChange={this.filterByAll} />
          {stops.map((item) => {
            return (
              <Checkbox
                key={item}
                count={item}
                label={`${item} ${plural(item, labels)}`}
                checked={filter.includes(item)}
                onChange={this.handleChange}
              />
            )
          })}
        </div>
      )
    }
}

FilterStops.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.arrayOf(PropTypes.number).isRequired,
}
