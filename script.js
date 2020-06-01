// // if i press a button, I want the data to be fetched,
// // I will expand it to be in the form of questions and answers.

class Quiz {
    constructor(data){
        this.data = data;
        this.start = false;
        this.end = false;
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
    clear (){
        this.data = {};
    }
    updateScore(){
        console.log(this.score);
    }
    
}   

let score = 0;
let difficulty = document.getElementById('difficulty');
let numberOfQuestions = document.getElementById('number-of-questions');
let category = document.getElementById('category');
let cards = document.getElementById('cards');

function removeElements (parent,childName){
    let arrOfChildren = Array.from(parent.getElementsByClassName(childName));
    for(i=0; i<arrOfChildren.length; i++){
        parent.removeChild(arrOfChildren[i]);
    };
}

async function getData(difficultyOfQuestions,numberOfQuestions,category) {
if(cards.children.length > 0){
    removeElements(cards,'card');
}
  try {
    let dataFetch = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficultyOfQuestions}`);
    let json = await dataFetch.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function useData() {
    
    let difficultyOfQuestions = getRadioValue('difficulty');
    let numberOfQ = getRadioValue('number');
    let categoryOfQuestions = category.options[category.selectedIndex].value;
    let data = await getData(difficultyOfQuestions,numberOfQ,categoryOfQuestions);
    let quiz = new Quiz(data);

    let scoreDiv = document.getElementById('score');
    scoreDiv.innerText = `Score : ${score}/${getRadioValue('number')}`;

    if(quiz && quiz.data.results.length > 0){
        quiz.clear();
    }
    console.log(difficultyOfQuestions,numberOfQ,categoryOfQuestions);

    quiz.questionSets.forEach(set => {
        createCard(set.question,set.allAnswers,set.correct_answer);
    })
    console.log(quiz);
}


let fetchData = document.querySelector('button');
let game = document.getElementById('game');

function getRadioValue (name){
    let radios = document.getElementsByName(name);
    for(let i=0; i<radios.length; i++){
        if(radios[i].checked){
            return radios[i].value;
        }
    }
}

function scoreIncrease() {
    score += 1;
    let scoreDiv = document.getElementById('score');
    scoreDiv.innerText = `Score : ${score}/${getRadioValue('number')}`;
}

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
                scoreIncrease();
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
    score = 0;
    // createQuestions();
});

 
