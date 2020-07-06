import React from 'react';
import '../../Game.css';
const Answer = (props) => {
    let { option , i ,answer, selected} = props;
    let activeClass;
    if(selected === ''){
        activeClass = 'answer-text';
    }
    if(i === selected){
        activeClass += 'answer-text active';
    }
  return(
    <div className="answer" onClick={()=>props.selectedAnswer(i)}>
            <div className="answer-option">
                {option})
            </div>
            <div className={activeClass} id="answer"  dangerouslySetInnerHTML={{__html:answer}}>
            </div>
        </div>
  )
}
export default Answer;