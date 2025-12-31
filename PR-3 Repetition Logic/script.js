  let secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log("Secret Number:", secretNumber);
  let score = 20; 
  let highscore = 0;

  function checkNumber() {
    var guess = Number(document.getElementById('guessInput').value);

    if (!guess) {
      document.getElementById('message').textContent = ' Number daalo!';
   
    } else if (guess < 1 || guess > 20) {
      document.getElementById('message').textContent = ' 1 se 20 ke beech number dalo!';

    } else if (guess === secretNumber) {
      document.getElementById('message').textContent = '🎉 Sahi jawab!';
      document.getElementById('numberBox').textContent = secretNumber; 
      document.body.style.background = "green"; 
      if (score > highscore) {
        highscore = score;   
        document.getElementById('highscore').textContent = highscore;
      }
    } else {
      if (score > 1) {
        document.getElementById('message').textContent = 
          guess > secretNumber ? '📈 Zyada hai!' : '📉 Kam hai!';
        score--;
        document.getElementById('score').textContent = score;
      } else {
        document.getElementById('message').textContent = '💥 Game Over!';
        document.getElementById('score').textContent = 0;
        document.body.style.background = "red"; 
      }
    }
  }

  function resetGame() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.getElementById('numberBox').textContent = "?";
    document.getElementById('score').textContent = score;
    document.getElementById('message').textContent = 'Start guessing...';
    document.body.style.background = "#222";
    document.getElementById('guessInput').value = "";
  }