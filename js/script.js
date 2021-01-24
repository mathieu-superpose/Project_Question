const questionwrapper = document.querySelector("#questionwrapper");
const scoreContainer = document.querySelector("#score-container");
const card = document.querySelector(".card");
const front = document.querySelector(".front");
const back = document.querySelector(".back");

let playing = false;
let count = 0;
let round = 0;

const rotation = () => {
    count++;
    playing = true;
    front.innerHTML = '';
    back.innerHTML = '';
    anime({
        targets: card,
        scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
        rotateY: { value: '+=180', delay: 200 },
        easing: 'easeInOutSine',
        duration: 400,
        complete: function(anim) {
            playing = false;
            //front.innerHTML = count;
            //back.innerHTML = count;
        }
    });
}

const askQuestion = (rounds, data) => {
    rotation();
    front.innerHTML = `<H2>${data.results[round].question}</H2>`;
    back.innerHTML = front.innerHTML;

}

const loadQuestions = (rounds=10) => {
    
  let quest = `https://opentdb.com/api.php?amount=${rounds}&category=18&difficulty=medium&type=multiple`;
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
