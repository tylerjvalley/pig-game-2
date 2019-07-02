
//Create game variables
let roundScore, player1Total, player2Total, activePlayer, winningScore;
const initialize = () => {
  roundScore = 0;
  player1Total = 0;
  player2Total = 0;
  activePlayer = 1; //1 or 2 depending on whose turn it is.
  document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector('.player-2-panel').classList.remove('active');
  document.getElementById('score-1').innerHTML = '0';
  document.getElementById('score-2').innerHTML = '0';
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
  document.getElementById('current-1').innerHTML = '0';
  document.getElementById('current-2').innerHTML = '0';
}

const diceRoll = (dice) => {
  if (dice === 'dice1') {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    return dice1;
  } else if (dice === 'dice2') {
    const dice2 = Math.floor(Math.random() * 6) + 1;
    return dice2
  }

}

const switchPlayer = () => {
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
  if (activePlayer === 1) {
    activePlayer = 2;
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-2-panel').classList.add('active');
  } else if (activePlayer === 2) {
    activePlayer = 1;
    document.querySelector('.player-2-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
  }
}

initialize();







// Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    let dice1 = diceRoll('dice1');
    let dice2 = diceRoll('dice2');
    switch(dice1) {
      case 1:
        document.getElementById('dice1').src = 'images/dice-1-blk.png';
        roundScore += 1;
        break;
      case 2:
        document.getElementById('dice1').src = 'images/dice-2-blk.png';
        roundScore += 2;
        break;
      case 3:
        document.getElementById('dice1').src = 'images/dice-3-blk.png';
        roundScore += 3;
        break;
      case 4:
        document.getElementById('dice1').src = 'images/dice-4-blk.png';
        roundScore += 4;
        break;
      case 5:
        document.getElementById('dice1').src = 'images/dice-5-blk.png';
        roundScore += 5;
        break;
      case 6:
        document.getElementById('dice1').src = 'images/dice-6-blk.png';
        roundScore += 6;
        break;
    }

    switch(dice2) {
      case 1:
        document.getElementById('dice2').src = 'images/dice-1-blk.png';
        roundScore += 1;
        break;
      case 2:
        document.getElementById('dice2').src = 'images/dice-2-blk.png';
        roundScore += 2;
        break;
      case 3:
        document.getElementById('dice2').src = 'images/dice-3-blk.png';
        roundScore += 3;
        break;
      case 4:
        document.getElementById('dice2').src = 'images/dice-4-blk.png';
        roundScore += 4;
        break;
      case 5:
        document.getElementById('dice2').src = 'images/dice-5-blk.png';
        roundScore += 5;
        break;
      case 6:
        document.getElementById('dice2').src = 'images/dice-6-blk.png';
        roundScore += 6;
        break;
    }

    if (dice1 === 1 || dice2 === 1) {
      alert('Yikes... you rolled a one.');
      roundScore = 0;
      document.getElementById('current-' + activePlayer).innerHTML = roundScore;
      switchPlayer();
    }

    if (dice1 === 6 && dice2 === 6) {
      alert('Oh no! You rolled two sixes... you lose everything.')
      roundScore = 0;
      document.getElementById('current-' + activePlayer).innerHTML = roundScore;
      if (activePlayer === 1) {
        player1Total = 0;
        document.getElementById('score-1').innerHTML = '0';
        switchPlayer();
      } else if (activePlayer === 2) {
        player2Total = 0;
        document.getElementById('score-2').innerHTML = '0';
        switchPlayer();
      }
    }

    document.getElementById('current-' + activePlayer).innerHTML = roundScore;



});


//Add current score to total score if player presses Hold
document.querySelector('.btn-hold').addEventListener('click', function() {

  let previousPlayer;

  //add round score to total score and switch active player
  if (activePlayer === 1) {
    player1Total += roundScore;
    document.getElementById('score-1').innerHTML = player1Total;
    //reset round score
    roundScore = 0
    document.getElementById('current-' + activePlayer).innerHTML = roundScore;
    switchPlayer();
    previousPlayer = 1;
  } else if (activePlayer === 2) {
    player2Total += roundScore;
    document.getElementById('score-2').innerHTML = player2Total;
    //reset round score
    roundScore = 0
    document.getElementById('current-' + activePlayer).innerHTML = roundScore;
    switchPlayer();
    previousPlayer = 2;
  }

  // user select score
  const userScore = document.getElementById('user-score').value;

  if(userScore) {
    winningScore = userScore;
  } else {
    winningScore = 100;
  }

  //End the game if winning score is met.
  if (player1Total >= winningScore || player2Total >= winningScore) {
    alert(`Game over. Player ${previousPlayer} wins!`); //btn-hold switches player so previous player is used.
    initialize();
  }


});

//Start a new game
document.querySelector('.btn-new').addEventListener('click', function() {
  initialize();
});
