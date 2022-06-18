// rules
// game time 5 minutes
let gameTime = 3 * 60;

// start game
const start = document.getElementById('start'),
  controlSection = document.querySelector('.control'),
  userName = document.getElementById('user-name'),
  errorMsg = document.querySelector('.msg-name');
playerName = document.querySelector('.player-name span');

// add even listner to page ovelay collapse
start.addEventListener('click', function (e) {
  if (userName.value === '') {
    errorMsg.style.display = 'block';
    errorMsg.style.opacity = 1;
  } else {
    playerName.textContent = ', ' + userName.value;
    controlSection.style.display = 'none';
    document.getElementById('bg-audio').play();
    document.querySelector('.mute').style.display = 'block';
    timeStart();
  }
});

// shuffle the cards
let cardsArray = Array.from(document.querySelectorAll('.card'));
let randomArray = [...Array(cardsArray.length).keys()]; // create a new array that hold ordered values
// shuffle function
function shuffle(arr) {
  let current = arr.length,
    random,
    temp;
  while (current > 0) {
    // swape values inside array
    random = Math.floor(Math.random() * current);
    temp = arr[current - 1];
    arr[current - 1] = arr[random];
    arr[random] = temp;
    current--;
    console.log();
  }
}
shuffle(randomArray);

// style order of cards based on their index
cardsArray.forEach(function (card, indx) {
  card.style.order = randomArray[indx];
});

// flip the card
const cards = document.querySelectorAll('.card'),
  wrongTryNumber = document.querySelector('.wrong-tries span');
let openCardsArray = [];
cards.forEach(function (card) {
  card.addEventListener('click', flip);
});
function flip() {
  // check open cards array length and flip the card if it less than two
  if (openCardsArray.length < 2 && !this.classList.contains('is-flipped')) {
    openCardsArray.push(this.dataset.card); // add card to open cards array
    this.classList.add('is-flipped'); // flip the card
    if (openCardsArray.length === 2) {
      // check if two card are open
      if (openCardsArray[0] === openCardsArray[1]) {
        // in case two open cards are the same
        document.getElementById('success').play();
        setTimeout(function () {
          document.querySelectorAll('.is-flipped').forEach(function (elem) {
            elem.classList.replace('is-flipped', 'is-match');
          });
          openCardsArray.length = 0; // empty the open cards array
          if (
            document.querySelectorAll('.is-match').length === cardsArray.length
          ) {
            gameWin();
          }
        }, 600);
      } else if (openCardsArray[0] !== openCardsArray[1]) {
        document.getElementById('fail').play();
        setTimeout(function () {
          document.querySelectorAll('.is-flipped').forEach(function (elem) {
            elem.classList.remove('is-flipped');
          });
          wrongTryNumber.textContent++;
          openCardsArray.length = 0;
        }, 600);
      }
    }
  }
}

// ability to mute the musice

document.querySelector('.mute i').addEventListener('click', function () {
  this.classList.toggle('fa-volume-mute');
  this.classList.toggle('fa-volume-down');
  if (this.classList.contains('fa-volume-mute')) {
    console.log(this);
    document.getElementById('bg-audio').pause();
  } else if (this.classList.contains('fa-volume-down')) {
    document.getElementById('bg-audio').play();
  }
});

function timeStart() {
  const timerFrom = new Date().getTime();
  const timerTo = new Date().getTime() + gameTime * 60 * 1000;
  let timer = setInterval(function () {
    --gameTime;
    // minutes
    let minutes = Math.floor(gameTime / 60);
    document.getElementById('minutes').textContent =
      minutes < 10 ? '0' + minutes : minutes;
    // seconds
    let seconds = gameTime % 60;
    document.getElementById('seconds').textContent =
      seconds < 10 ? '0' + seconds : seconds;
    if (gameTime === 0) {
      clearInterval(timer);
      gameDone();
    }
  }, 1000);
}

function gameDone() {
  document.getElementById('bg-audio').pause();
  document.getElementById('lose').play();
  controlSection.style.display = 'flex';
  document.querySelector('.content').style.display = 'none';
  document.querySelector('.close i').classList.add('fa-thumbs-down');
  document.querySelector('.close').style.display = 'block';
}
document.querySelector('.close p').addEventListener('click', function () {
  window.location.reload(false);
});

function gameWin() {
  document.getElementById('bg-audio').pause();
  document.getElementById('winning').play();
  controlSection.style.display = 'flex';
  document.querySelector('.content').style.display = 'none';
  document.querySelector('.close i').classList.add('fa-thumbs-up');
  document.querySelector('.close').style.display = 'block';
}
