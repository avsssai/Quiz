import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import './Results.css';

class Results extends Component {
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render () {
        console.log(this.props.questionSets);
        let selectedAnswers = this.props.selectedAnswers;
        console.log(selectedAnswers);

        let answeredQuestions = selectedAnswers.filter(el => el !== null);

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
                        <Card.Body>{el}</Card.Body>
                    </Card>

                )
            });
            return (
                <Card style={{ width: '80vw' }} key={i} className='result-card'>
                    <Card.Body>
                        <Card.Title>{i + 1}. {el.question}</Card.Title>
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
                <h1>Results Page</h1>
                <div>
                    <div className="score">
                        {score}/10
                    </div>

                    {questions}
                </div>
            </div>
        )
    }
}

export default Results;