import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='message'>
        <h3>You win! Click on the images to see some more details. <a href='#' onClick={this.props.onClick}>Click here to reload with a new set of images.</a></h3>
      </div>
    )
  }
})
