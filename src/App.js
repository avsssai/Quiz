import React, { Component } from 'react';
import Header from './Header/Header';
import Game from './Game/Game';
import Loader from './Loader/Loader';
import { Link } from 'react-router-dom';
import './App.css';
import Button from 'react-bootstrap/Button';

import {TransitionGroup} from 'react-transition-group';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      questionNumber: 0,
      selectedOptions: Array(10).fill(null),
      selectedAnswer: Array(10).fill(null),
      selectedCategory: this.props.chosenCategory,
      selectedDifficulty: this.props.chosenDifficulty,
      inProp:false
    };
  }
  componentDidMount () {
    let category = this.state.selectedCategory[0].number;
    let difficulty = this.state.selectedDifficulty[0].namespace;

    let url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`;
    console.log(url);

    // fetch(`https://opentdb.com/api.php?amount=10&category=23&difficulty=easy`)
    fetch(url)
      .then(res => res.json())
      .then(result => {

        this.setState({
          isLoaded: true,
          data: result.results
        })




      }
        ,
        (error) => {
          this.setState({
            isLoaded: false,
            error
          })
          console.error('Error');

        })
      .then(() => {
        let clone = [...this.state.data];

        let shuffle = (array) => {
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }

        // let shuffledAnswers = clone.map((el,i) => {
        //   let combinedAnswers = [el.correct_answer,...el.incorrect_answers];
        //   clone[i].combinedAnswers =  shuffle(combinedAnswers);
        // })
        clone.forEach((el, i) => {
          let combinedAnswers = [el.correct_answer, ...el.incorrect_answers];
          let shuffledAnswers = shuffle(combinedAnswers);
          clone[i].shuffledAnswers = shuffledAnswers
        })
        this.setState({ data: clone })
      })
      .then(() => {
        console.log(this.props.chosenCategory[0].number)
        console.log(this.props.chosenDifficulty[0].category);
      })
  }


  prevQuestion = () => {
    let questionNumber = this.state.questionNumber;
    if (questionNumber < 1) {
      return;
    }
    this.setState({ questionNumber: this.state.questionNumber - 1 });
  }
  nextQuestion = () => {
    
    let questionNumber = this.state.questionNumber;
    if (questionNumber >= 9) {
      return;
    }
    this.setState({ questionNumber: this.state.questionNumber + 1 ,inProp:true});
  }
  selectedOption = (questionSet, questionNumber) => {
    let selectedOptions = this.state.selectedOptions.slice();
    selectedOptions[questionNumber] = questionSet;
    this.setState({
      selectedOptions
    });
  }
  recordSelected = (questionNumber, i) => {
    let clone = [...this.state.selectedAnswer]
    clone[questionNumber] = i;
    this.setState({
      selectedAnswer: clone
    })
  }

  endGame = () => {
    this.props.endGame(this.state.selectedOptions, this.state.data);
  }

  render () {
    let { data, questionNumber } = this.state;
    let currentQuestion, display;
    let gameEndButton = this.state.questionNumber === 9 ? <Button onClick={this.endGame} className='end-game-button'>End Game</Button> : "";

    if (this.state.isLoaded) {
      currentQuestion = data[questionNumber];
      display = (
        <TransitionGroup>

        <Game className="Game-component"
          data={currentQuestion}
          questionNumber={this.state.questionNumber}
          nextQuestion={this.nextQuestion}
          prevQuestion={this.prevQuestion}
          selectedOption={this.selectedOption}
          selected={this.state.selectedAnswer}
          recordSelected={this.recordSelected}
          inProp={this.state.inProp}
        ></Game>
        </TransitionGroup>

      )
    } else {
      display = <Loader />
    }
    return (
      <div className="App">
        <Header></Header>
        {display}
        <div className="end-button">

          <Link to={{
            pathname: '/results',
            state: { questionSet: this.state.questionSet }
          }}>        {gameEndButton}
          </Link>
        </div>
      </div>
    )
  }
}
export default App;
