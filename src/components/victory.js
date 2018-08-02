import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    return (
      <div className='message'>
        <h3>You win! Click on the images to see some more details. <Link to='/'>Click here to reload with a new set of images.</Link></h3>
      </div>
    )
  }
})
