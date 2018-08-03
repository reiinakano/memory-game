import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='message'>
        <h3>
          <p className='you-win'>You win!</p>
          <p className='subtitle'>But I win too cause you're the best girlfriend in the world. I love you!</p>
          <p className='subtitle'>Click on the images to see some more details. <a href='#' onClick={this.props.onClick}>Click here to reload with a new set of images.</a></p>
        </h3>
      </div>
    )
  }
})
