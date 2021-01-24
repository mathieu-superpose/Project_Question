const questionwrapper = document.querySelector("#questionwrapper");
const scoreContainer = document.querySelector("#score-container");
const card = document.querySelector(".card");
const front = document.querySelector(".front");
const back = document.querySelector(".back");

let playing = false;
let count = 0;
let round = 0;

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const rotation = (data) => {
    count++;
    playing = true;
    anime({
        targets: card,
        scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
        rotateY: { value: '+=180', delay: 200 },
        easing: 'easeInOutSine',
        duration: 400,
        complete: function(anim) {
            playing = false;
        }
    });
}

const askQuestion = (rounds, data) => {
    front.innerHTML = '';
    back.innerHTML = '';
     count++;
    playing = true;
    anime({
        targets: card,
        scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
        rotateY: { value: '+=180', delay: 200 },
        easing: 'easeInOutSine',
        duration: 400,
        complete: function(anim) {
            playing = false;
                let answers = shuffle([data.results[round].correct_answer, data.results[round].incorrect_answers[0], data.results[round].incorrect_answers[1], data.results[round].incorrect_answers[2]]);

            front.innerHTML = `<div class='question'><H2>${data.results[round].question}</H2></div>
                        <div class='answer-group'>
                        <div class='answer-left'>
                        <div class='answer'>
                        <p>${answers[0]}<p>
                        </div>
                        <div class='answer'>
                        <p>${answers[1]}<p>
                        </div>
                        </div>
                        <div class='answer-right'>
                        <div class='answer'>
                        <p>${answers[2]}<p>
                        </div>
                        <div class='answer'>
                        <p>${answers[3]}<p>
                        </div>
                        </div>
                        </div>
                        <button onclick="loadQuestions()">Next</button>
                        `;
            back.innerHTML = front.innerHTML;
        }
    });
}

const loadQuestions = (rounds=10) => {
    
  let quest = `https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple`;
  fetch(quest)
    .then((response) => response.json())
    .then((data) => askQuestion(rounds, data))
    .catch((error) => console.error(`error: ${error}`))
}

// perform
// title animation
let lineDrawing = anime({
    targets: '#titlecontainer .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: false
});

loadQuestions();
