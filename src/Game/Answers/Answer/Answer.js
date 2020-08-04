import React from 'react';
import '../../Game.css';
import Card from 'react-bootstrap/Card';

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
      <div className="answer-card">
          <Card onClick={()=>props.selectedAnswer(i)} className={activeClass}>

              <Card.Text >
                <span>{option}) </span>
                <span dangerouslySetInnerHTML={{__html:answer}}></span>
              </Card.Text>
          </Card>
      </div>
  )
}
export default Answer;



    /* <div className="answer" onClick={()=>props.selectedAnswer(i)}>
            <div className="answer-option">
                {option})
            </div>
            <div className={activeClass} id="answer"  dangerouslySetInnerHTML={{__html:answer}}>
            </div>
        </div> */
