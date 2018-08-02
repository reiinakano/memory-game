import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p><Link to='/'>Go to back</Link></p>
      </div>
    )
  }
})
