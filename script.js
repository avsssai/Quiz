// // if i press a button, I want the data to be fetched,
// // I will expand it to be in the form of questions and answers.
// let fetchedData;
// async function getData () {
//     const res = await fetch("https://opentdb.com/api.php?amount=10");
//     let json = await res.json();
//     // console.log(json);
//     return json;
// };

// // let data = async() => {
// //     fetchedData = await getData()
// //     return fetchedData;
// // };

// console.log(fetchedData);

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


    console.log(quiz);
}


let fetchData = document.querySelector('button');

fetchData.addEventListener('click',(e)=>{
    useData();

})