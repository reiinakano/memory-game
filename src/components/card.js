import React from 'react'

export default React.createClass({
  propTypes: {
    index: React.PropTypes.number,
    image: React.PropTypes.string,
    background: React.PropTypes.string,
    label: React.PropTypes.string,
    revealed: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    firstPath: React.PropTypes.bool
  },

  getDefaultProps () {
    return { revealed: false }
  },

  render () {
    const className = this.props.revealed ? '' : 'rotate'
    const path = this.props.firstPath ? this.props.path : this.props.path2

    return (
      <div className={`card ${className}`} onClick={this.clickHandler}>
        <a href='#'>
          <div className='card-icon'
            style={{backgroundColor: this.props.backgroundColor}}
            dangerouslySetInnerHTML={{__html: `<img src='${path}' alt='${path}' width='100%' margin='auto'></img>`}}>
          </div>
        </a>
      </div>
    )
  },

  clickHandler (e) {
    e.preventDefault()
    this.props.onClick &&
      this.props.onClick({
        index: this.props.index,
        label: this.props.label,
        revealed: !this.props.revealed
      })
  }
})
