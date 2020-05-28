// // if i press a button, I want the data to be fetched,
// // I will expand it to be in the form of questions and answers.

class Quiz {
    constructor(data){
        this.data = data;
        this.start = false;
        this.end = false;
        this.round = 0;
        this.score = 0;
        this.makeQuestionSets();
    };
    makeQuestionSets() {
        let questionSets = [...this.data.results];
        questionSets.forEach(set => {
            set.allAnswers = this.shuffle([set.correct_answer,...set.incorrect_answers]);
            this.questionSets = questionSets;
        })
    };
    choseIncorrectly() {
        this.score = this.score - 1;
    }
    choseCorrectly() {
        this.score = this.score + 1;
    };
    newGame() {
        this.end = true;
        this.round = 0;
        this.score = 0;
    }
    shuffle(array) {
        let arrayToShuffle = [...array];
        // Fisher-Yates algorithm
        for(let i=arrayToShuffle.length-1; i>0; i--){
            let j = Math.floor(Math.random()* (i+1)); // random number between 1 to i;
            [arrayToShuffle[i],arrayToShuffle[j]] = [arrayToShuffle[j],arrayToShuffle[i]];
        }
        return arrayToShuffle;
    };
    
}   

async function getData() {
  try {
    let dataFetch = await fetch("https://opentdb.com/api.php?amount=10");
    let json = await dataFetch.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function useData() {
    
    let data = await getData();
    let quiz = new Quiz(data);
    
    quiz.questionSets.forEach(set => {
        createCard(set.question,set.allAnswers,set.correct_answer);
    })
    console.log(quiz);
}


let fetchData = document.querySelector('button');
let game = document.getElementById('game');
let cards = document.getElementById('cards');

function createCard (question,answers,correct_answer) {
    let card = document.createElement('div');
    card.className = 'card';

    let questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    // let questionText = document.createTextNode(question);
    // questionDiv.appendChild(questionText);

    questionDiv.innerHTML = question;

    let answersDiv = document.createElement('div');
    answersDiv.className = "answers";

    for(answer of answers){
        let answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
       
        answerDiv.innerHTML = answer;
        
        
        answersDiv.appendChild(answerDiv);
    };
    
    let checkCorrectAnswer =  (e)=>{
        if(e.target.className ==='answer'){
            if(e.target.innerHTML === correct_answer){
                console.log('picked correct answer',answersDiv);
                e.target.style.backgroundColor = "green";
                answersDiv.removeEventListener('click',checkCorrectAnswer);
            }else if(e.target.innerHTML !== correct_answer) {
                console.log('picked wrong answer');
                e.target.style.backgroundColor = "red";
                answersDiv.removeEventListener('click',checkCorrectAnswer);
                let elements = answersDiv.getElementsByClassName("answer");
                Array.from(elements).forEach(el => {
                    if(el.innerHTML === correct_answer){
                        el.style.backgroundColor = "green";
                    }
                    
                })
            }
        }else{
            return;
        }
    };   
    
    answersDiv.addEventListener('click',checkCorrectAnswer,false);

    

    card.appendChild(questionDiv);
    card.appendChild(answersDiv);
    let cards = document.getElementById('cards');
    cards.appendChild(card);
}

fetchData.addEventListener('click',(e)=>{
    useData();
    // createQuestions();
});


