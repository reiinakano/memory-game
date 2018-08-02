import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    return (
      <div className='menu'>
        <div className='animation-wrapper'>
          <div className='guard left' />
          <ul>
            <li className='item'><Link to='/play'>Play</Link></li>
            <li className='item'><Link to='/scores'>Scores</Link></li>
            <li className='item'><Link to='/about'>About</Link></li>
            <li className='item'></li>
            <li className='item'></li>
          </ul>
          <div className='guard right' />
        </div>
      </div>
    )
  }
})
