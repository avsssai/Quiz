import React from 'react';
import Loader from '../../Loader/Loader';
import Answer from './Answer/Answer';

const Answers = (props) => {
      
    let {answers} = props;
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
        // return (<div className="answer" key={i}>
        //     <div className="answer-option">
        //         {options(i)})
        //     </div>
        //     <div className="answer-text" onClick={()=>props.selectedAnswer(i)}>
        //         {answer}
        //     </div>
        // </div>)
        return <Answer option={options(i)} answer={answer} selectedAnswer={()=>props.selectedAnswer(i)} key={i} i={i}/>
    });
}else{
    answerElements = <Loader />
}
    return answerElements;
}
export default Answers;