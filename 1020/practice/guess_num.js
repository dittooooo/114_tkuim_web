const answer = Math.floor(Math.random()*100)+1
let guessNum = null;
let attempts = 0;

guessNum = parseInt(prompt("Guess a number between 1 and 100:"));

while(guessNum !==answer){
    attempts++;
    if(guessNum < answer){
        guessNum = parseInt(prompt("Too low! Try again:"));
    }else{
        guessNum = parseInt(prompt("Too high! Try again:"));    
    }
}
alert(`Correct answer!\nYou've guessed the number ${answer} in ${attempts} attempts.`);