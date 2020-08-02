import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import './Results.css';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    toggleAnswers = () => {
        this.setState({
            open: !this.state.open
        })
    }
    
    render () {
        function options (number) {
            let res;
            switch (number) {
                case 0:
                    res = 'A';
                    break;
                case 1:
                    res = 'B';
                    break;
                case 2:
                    res = 'C';
                    break;
                case 3:
                    res = 'D';
                    break;
                default:
                    res = '';
    
            }
            return res;
        }
        console.log(this.props.questionSets);
        let selectedAnswers = this.props.selectedAnswers;
        console.log(selectedAnswers);

        let answeredQuestions = selectedAnswers.filter(el => el !== null);
        let displayState = this.state.open ? "Hide" : "Show";

        let score = answeredQuestions.reduce((acc, el) => {
            if (el.selectedAnswer === el.correct_answer) {
                acc++
            }
            return acc;
        }, 0);

        console.log(score);

        let questionSets = this.props.questionSets;

        let questions = questionSets.map((el, i) => {

            let shuffledAnswers = el.shuffledAnswers;
            let correctAnswer = el.correct_answer;

            let selectedAnswer = selectedAnswers[i] !== null ? selectedAnswers[i].selectedAnswer : null;

            let answerDisplay = shuffledAnswers.map((el, i) => {
                let customClass = el === correctAnswer ? 'correct' : '';
                let selectedClass;

                if (selectedAnswer === null) {
                    selectedClass = 'noSelection';
                } else if (el === selectedAnswer && el !== correctAnswer) {
                    selectedClass = 'wrongSelection';
                } else {
                    selectedClass = '';
                }

                let unAnsweredQuestion = selectedAnswer === null ? 'unAnsweredQuestion' : '';

                return (
                    <Card key={i} className={`answer-card ${customClass} ${selectedClass} ${unAnsweredQuestion} `}>
                        <Card.Body>{options(i)}) <span dangerouslySetInnerHTML={{__html:el}}></span></Card.Body>
                    </Card>

                )
            });
            return (
                <Card style={{ width: '80vw' }} key={i} className='result-card'>
                    <Card.Body>
                        <Card.Title>{i + 1}. <span dangerouslySetInnerHTML={{__html:el.question}}></span></Card.Title>
                        <div className="subtexts">

                            <Card.Subtitle className="mb-2 text-muted">{el.category}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">{this.capitalize(el.difficulty)}</Card.Subtitle>
                        </div>
                        <div className='answers'>
                            {answerDisplay}
                        </div>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>

            )
        })
        return (
            <div>
                <h1 className='results-heading'>Results Page</h1>

                <div>
                    <div className="final-score">
                        <h2>Score</h2>
                        <Card>
                            <Card.Body>
                                <span className="player-score">{score}</span> <span className="divider">/</span> <span className='total-score'>10</span>
                            </Card.Body>
                        </Card>
                    </div>

                </div>
                <div className="correct-answers">
                    <div className="result-page-buttons">
                    <Button onClick={() => this.toggleAnswers()} className='result-button'>
                        {displayState} Answers!
                    </Button>
                    <Button className='result-button'>
                        New Game
                    </Button>

                    </div>
                    <Collapse in={this.state.open}>
                        <div className="questions">
                            {questions}
                        </div>
                    </Collapse>

                </div>
            </div>
        )
    }
}

export default Results;