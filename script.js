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

useData();
