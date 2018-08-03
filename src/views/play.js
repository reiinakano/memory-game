import React from 'react'
import Lightbox from 'react-images'
import shuffle from 'lodash/shuffle'

import Cards from '../cards'
import Card from '../components/card'
import Spinner from '../components/double-bounce-spinner'
import Victory from '../components/victory'

const REVEAL_PERIOD = 850 // ms
const NUM_OF_PAIRS = 3 // max: Cards.length (12)

function merge (...args) {
  return [{}, ...args].reduce(Object.assign)
}

export default React.createClass({
  getInitialState () {
    return {
      currentImage: 0,
      cardsList: this.generateGame(),
      victory: false,
      match: {},
      modalVisible: false
    }
  },

  componentWillMount () {
    clearTimeout(this.timeout)
  },

  componentDidMount () {
    this.enableCardClick()
  },

  render () {
    return (
      <div className='play-view'>
        <div className='control'>
          <Spinner />
          <h3>Match the images</h3>
        </div>
        <div className='cards'>
          {this.renderCardsList()}
        </div>
        {this.state.victory && <Victory onClick={() => this.resetGame()}/>}
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.getUniquePhotos()}
          isOpen={this.state.modalVisible}
          onClose={this.hideModal}
          onClickImage={() => {
            if (this.state.currentImage === NUM_OF_PAIRS - 1) return
            this.setState({ currentImage: this.state.currentImage + 1 })
          }}
          onClickNext={() => this.setState({ currentImage: this.state.currentImage + 1 })}
          onClickPrev={() => this.setState({ currentImage: this.state.currentImage - 1 })}
          onClickThumbnail={(idx) => this.setState({ currentImage: idx })}
          showThumbnails
        />
      </div>
    )
  },

  componentWillUnmount () {
    clearTimeout(this.timeout)
  },

  renderCardsList () {
    return this.state.cardsList.map((data, i) => {
      return (
        <Card
          key={i}
          index={i}
          onClick={!data.revealed ? this.cardClicked : this.revealedCardClicked}
          {...data} />
      )
    })
  },

  getUniquePhotos () {
    const duplicates = []
    return this.state.cardsList.filter((x) => {
      let duplicate = duplicates.includes(x.label)
      duplicates.push(x.label)
      return !duplicate
    }).map((x) => { return {src: x.fullPath, caption: x.caption, label: x.label} })
  },

  labelToPhotoIndex (label) {
    const uniquePhotos = this.getUniquePhotos()
    return uniquePhotos.findIndex((x) => x.label === label)
  },

  timeExpired () {
    this.setState({ gameOver: true })
  },

  revealedCardClicked (currentCard) {
    if (this.state.victory) this.setState({ modalVisible: true, currentImage: this.labelToPhotoIndex(currentCard.label) })
  },

  cardClicked (currentCard) {
    if (this.isCardClickDisabled) return
    this.disableCardClick()

    const cardsList = this.updateCurrentCard(this.state.cardsList, currentCard)
    const match = this.updateRevealedCard(currentCard)

    if (this.isVictory(match)) {
      clearTimeout(this.timeout)
      this.setState({ cardsList, match, victory: true })
    } else {
      this.setState({ cardsList, match }, () => {
        this.timeout = setTimeout(() => this.cleanBoard(currentCard), REVEAL_PERIOD)
      })
    }
  },

  updateCurrentCard (list, current) {
    return [].concat(list.map((item, i) => i === current.index ? merge(item, current) : item))
  },

  updateRevealedCard (current) {
    let match = Object.assign({}, this.state.match)
    match[current.label] = match[current.label] || 0

    if (current.revealed) match[current.label]++
    return match
  },

  isVictory (match) {
    return Object
      .keys(match)
      .map((key) => match[key])
      .reduce((n, total) => n + total, 0) === (2 * NUM_OF_PAIRS)
  },

  cleanBoard (currentCard) {
    const match = this.updateUnmatchedCards(currentCard)
    const cardsList = this.updateBoard(currentCard, match)

    this.setState({ cardsList, match }, function () {
      this.enableCardClick()
    })
  },

  updateUnmatchedCards (current) {
    let match = Object.assign({}, this.state.match)
    Object
      .keys(match)
      .forEach((key) => match[key] < 2 && (match[key] = 0))

    // If the current reveal is not a match, keep the last one
    if (match[current.label] < 2) match[current.label] = 1
    return match
  },

  updateBoard (currentCard, match) {
    return [].concat(this.state.cardsList.map((item, i) => {
      const otherCard = (i !== currentCard.index)
      const completelyRevelead = (match[item.label] >= 2)
      return otherCard && !completelyRevelead ? merge(item, { revealed: false }) : item
    }))
  },

  resetGame () {
    this.setState({victory: false, cardsList: this.state.cardsList.map((x) => Object.assign(x, { revealed: false }))})
    setTimeout(() => {
      this.setState(this.getInitialState())
      this.enableCardClick()
    }, 1000)
  },

  generateGame () {
    const cardsList = shuffle([].concat(Cards)).slice(0, NUM_OF_PAIRS)
    const cardsListFirstPair = cardsList.map((x) => Object.assign({firstPath: true}, x))
    const cardsListTwoPair = cardsList.map((x) => Object.assign({firstPath: false}, x))
    return shuffle(cardsListFirstPair.concat(cardsListTwoPair))
  },

  enableCardClick () {
    this.isCardClickDisabled = false
  },

  disableCardClick () {
    this.isCardClickDisabled = true
  },

  hideModal () {
    this.setState({ modalVisible: false })
  },

  showModal () {
    this.setState({ modalVisible: true })
  }
})
