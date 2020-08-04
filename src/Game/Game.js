import React, { Component } from "react";
import './Game.css';
import Answers from './Answers/Answers';
import Card from 'react-bootstrap/Card';

import { Transition, CSSTransition } from 'react-transition-group';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'


class Game extends Component {
    state = {
        loadingAnswers: true
    }
    capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    selectedAnswer = (i) => {
        let { data } = this.props;

        let answers = data.shuffledAnswers;

        let questionSet = {
            selectedAnswer: answers[i],
            answers,
            correct_answer: data.correct_answer
        }
        console.log(i);
        let questionNumber = this.props.questionNumber;
        // this.setState({selected:i})
        this.props.selectedOption(questionSet, questionNumber);
        this.props.recordSelected(questionNumber, i);
        this.props.nextQuestion();
    }


    render () {
        let { data, questionNumber, nextQuestion, prevQuestion, selected, inProp } = this.props;
        let question = data.question;
        let category = data.category;
        let difficulty = data.difficulty;
        let answers = data.shuffledAnswers;

        const leftArrow = <FontAwesomeIcon icon={faChevronLeft} />
        const rightArrow = <FontAwesomeIcon icon={faChevronRight} />

        let selectedAns;
        if (selected[questionNumber] || selected[questionNumber] === 0) {
            selectedAns = selected[questionNumber]
        } else {
            selectedAns = '';
        }
        //category -> category
        //{this.capitalizeFirstLetter(difficulty)} -> difficulty
        //prevQuestion -> function to go to previous question
        //nextQuestion -> function to got to next question

        

        return (
            <Transition in={inProp} timeout="500" >

                <Card id='game-card' className='example' style={{ display: "flex", flexDirection: "row" }} key={questionNumber} >
                    {/* <img src={leftArrow} alt="" width="16px" className="prev-question-arrow" onClick={prevQuestion}/> */}
                    <div className="prev-question-arrow" onClick={prevQuestion}>{leftArrow}</div>

                        <Card className='question-card' key={questionNumber}>
                            <Card.Title>
                                <span>{questionNumber + 1}. </span>
                                <span dangerouslySetInnerHTML={{ __html: question }}></span>
                            </Card.Title>
                            <div className="card-subheadings" >
                                <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{this.capitalizeFirstLetter(difficulty)}</Card.Subtitle>
                            </div>
                            <div className="answers-section">
                                <Answers answers={answers} selectedAnswer={this.selectedAnswer} selected={selectedAns} questionNumber={questionNumber} />

                            </div>
                        </Card>

                    {/* <img src={rightArrow} alt="" className="prev-question-arrow" onClick={nextQuestion}/> */}
                    {/* <div className="prev-question-arrow" onClick={nextQuestion}>{rightArrow}</div> */}
                    <div className="prev-question-arrow" onClick={nextQuestion}>{rightArrow}</div>

                </Card>
            </Transition>
            
        )
    }
}

export default Game;


/*
                {/* <div className="Game">
                <div className="stats">
                    <div className="category">
                        <div className="category-heading">Category</div>
                        <div id="category-name">{category}</div>
                    </div>
                    <div className="score">
                        <div className="score-heading">Score</div>
                        <div className="score-number">1/10</div>
                    </div>
                    <div className="difficulty">
                        <div className="difficulty-heading">Difficulty</div>
                        <div id="difficulty-setting">{this.capitalizeFirstLetter(difficulty)}</div>
                    </div>

                </div>
                <div className="game-wrapper">
                    <div className="prevQuestion" onClick={prevQuestion}>prev</div>

                    <div className="play-area">
                        <div className="q-and-a">
                            <div className="question">
                                <span className="question-number">{questionNumber + 1}. </span>
                                <span dangerouslySetInnerHTML={{ __html: question }} ></span>

                            </div>
                            <div className="answers-field">
                                <Answers answers={answers} selectedAnswer={this.selectedAnswer} selected={selectedAns} questionNumber={questionNumber} />
                            </div>
                        </div>
                    </div>
                    <div className="nextQuestion" onClick={nextQuestion}>next</div>

                </div>

            </div> */
