import React, { Component } from 'react';
import Loader from '../../Loader/Loader';
import Answer from './Answer/Answer';

class Answers extends Component {
    selectedAnswer = (i) => {
        this.props.selectedAnswer(i)
    }
    render() {
        let {answers,selected,questionNumber} = this.props;
        // let selectedAns;
        // if(selected[questionNumber] === null){
        //     selectedAns = 5
        // }else if(selected[questionNumber]){
        //     selectedAns = selected[questionNumber];
        // }
        let answerElements;
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
    
        if(answers){
        answerElements = answers.map((answer, i) => {
            return <Answer option={options(i)} answer={answer} selectedAnswer={()=>this.selectedAnswer(i)} key={i} i={i} selected={selected} questionNumber={questionNumber}/>
        });
    }else{
        answerElements = <Loader />
    }
    return (answerElements);

    }
}
export default Answers;