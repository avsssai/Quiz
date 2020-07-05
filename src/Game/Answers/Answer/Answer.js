import React from 'react';

const Answer = (props) => {
    let { option , i ,answer} = props;
  return(
    <div className="answer" >
            <div className="answer-option">
                {/* {options(i)}) */}
                {option})
            </div>
            <div className="answer-text" onClick={()=>props.selectedAnswer(i)}>
                {answer}
            </div>
        </div>
  )
}
export default Answer;