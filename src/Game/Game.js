import React, { Component } from "react";
import './Game.css';
import Answers from './Answers/Answers';

class Game extends Component {
    state = {
        loadingAnswers:true   
     }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
    selectedAnswer = (i)=> {
        let {data} = this.props;

        let answers = data.shuffledAnswers;
        
        let questionSet = {
            selectedAnswer:answers[i],
            answers,
            correct_answer:data.correct_answer
        }
        console.log(i);
        let questionNumber = this.props.questionNumber;
        // this.setState({selected:i})
        this.props.selectedOption(questionSet,questionNumber);  
        this.props.recordSelected(questionNumber,i);     
    }
    

    render () {
        let { data, questionNumber, nextQuestion, prevQuestion, selected } = this.props;
        let question = data.question;
        let category = data.category;
        let difficulty = data.difficulty;
        let answers = data.shuffledAnswers;
        let selectedAns;
        if(selected[questionNumber] || selected[questionNumber] === 0){
            selectedAns = selected[questionNumber]
        }else{
            selectedAns = '';
        }
        return (
            <div className="Game">
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
                <div className="play-area">
                    <div className="prevQuestion" onClick={prevQuestion}>prev</div>
                    <div className="q-and-a">
                        <div className="question">
                            <span className="question-number">{questionNumber + 1}. </span>
                            <span dangerouslySetInnerHTML={{ __html: question }} ></span>

                        </div>
                        <div className="answers-field">
                            <Answers answers={answers}  selectedAnswer={this.selectedAnswer} selected={selectedAns} questionNumber={questionNumber} />
                        </div>
                    </div>
                    <div className="nextQuestion" onClick={nextQuestion}>next</div>
                </div>
            </div>
        )
    }
}

export default Game;