# Balloon Pop 🎈 🎈 🎈

## <a href="https://chelseajcaines.github.io/balloon-pop-game/" style="text-decoration: none; color: #8562EF;">PLAY HERE!</a>

### Description

Balloon Pop is a fun word puzzle game where the player guesses one letter per turn to try to figure out the puzzle based on the category chosen. If a player guesses a letter correctly, great--keep going. If a player guesses a letter wrong, one of the player's precious balloons pop, and the player only has six balloons!

#### Some fun features include:

🔊 Sound Effects - With the option to turn them on or off.<br/>
🐱 Avatars - Choose your player! Each comes with their own silly name and back story.<br/>
🎉 Animations - The balloon popping animations are files I drew and created myself using ProCreate on my iPad.<br/>
🌙 Dark Mode - With the option to go back and forth to light mode when the player desires.<br/>
🎈 Single Player - Try your best to get the longest winning streak!<br/>
⚔️ Two Player - Battle your friend for most wins! Turns alternate when a player guesses wrong.<br/>
⌨️ 🖱️ Mouse and Keyboard functionallity - Use the mouse or keyboard to navigate and play the game!

### Motivation

I love games; boardgames, video games, card games.. you name it. I am also interested in touching on all sorts of fields of development so building a game was definitely up there on my to do list. I went with a word puzzle game becuase it is my favourite type of game to play on my phone :D.

<hr/>

### Built with

<br/>
<span><img src="https://static.vecteezy.com/system/resources/previews/032/050/116/original/figma-3d-icon-free-png.png" alt="figma" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://github.com/chelseajcaines/chelseajcaines/assets/132682524/9d5090cd-847b-4d85-b73a-300ba08009fc" alt="CSS" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="vite" height="40" width="40" style="max-width: 100%;"/></span><span><img src="/src/assets/science.png" alt="react" height="40" width="40" style="max-width: 100%;"/></span><span><img src="https://logos-world.net/wp-content/uploads/2023/02/Procreate-Symbol.png" alt="procreate" height="40" width="70" style="max-width: 100%;"/></span>

<hr/>

### How to use

From the home page, the player is able to choose Single Player mode, Two Player mode or display the leaderboard with the current top ten scorers of the game played within the same browser.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgOne.PNG?raw=true"/>
<br/>
<hr/>

Once Single Player is selected, the player then chooses an avatar and enters a name.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgTwo.PNG?raw=true"/>
<br/>
<hr/>

The player then chooses a category that the puzzles will be based around. Each category contains 200 puzzles. The Movie Titles category uses an API where I made a custom list on that site. The other three categories I created lists and hard coded them in VS myself. The game also keeps track of what puzzle is played whether a player wins or loses, that way the player avoids playing the same puzzle more than once during that game session. If all 200 puzzles within a category happened to be played in a single game session, a modal appears conradulating them and thanking them for playing the game. If during a game session the player goes back to the home page, the puzzles played goes back to zero.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgThree.PNG?raw=true"/>
<br/>
<hr/>

The player can then start guessing letters by clicking on a letter with the mouse or hitting the corresponding key on the keyboard.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgFour.PNG?raw=true"/>
<br/>
<hr/>

When a letter is guessed correctly, the key turns green and the letter is show in its correct spot within the puzzle.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgFive.PNG?raw=true"/>
<br/>
<hr/>

When a letter is guessed incorrectly, the key greys out and a balloon pops.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgSix.PNG?raw=true"/>
<br/>
<hr/>

When a player is able to guess all letters correctly, they are decalred a winner and awarded points depending on how many balloons are left standing. (ex. if there are two balloons left when the player wins the game, the player is awarded two points). They can then choose to continue playing or quit. For each consecutive win, the new points won are added to the previous points to equal the player's overall current score.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgSeven.PNG?raw=true"/>
<br/>
<hr/>

If a player is unable to guess all letters correctly and all six balloons pop, the puzzle answer is revealed and they lose the game. If the player loses a game during a winning streak, their current score is knocked back to zero and their highest winning streak score is posted in the leaderboard if they are within the top ten players. They can then choose to continue to start a new winning streak or quit the game.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgEight.PNG?raw=true"/>
<br/>
<hr/>

Here is an example of the leaderboard that is accessible from Single Player mode and the Home page.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgNine.PNG?raw=true"/>
<br/>
<hr/>

When a player chooses Two Player mode from the Home page, two players may choose an avatar and enter a name to battle off against each other. Only player one is able to setup first.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgTwelve.PNG?raw=true"/>
<br/>
<hr/>

The option for player two to choose an avatar and name is only available when player one is all done.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgThirteen.PNG?raw=true"/>
<br/>
<hr/>

While player two is choosing an avatar and name, player one is locked in and ready to go. Only when both players are ready are they able to move to the next page.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgFourteen.PNG?raw=true"/>
<br/>
<hr/>

In Two Player mode, after choosing a category, it starts a player having the first turn to guess a letter.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgFifteen.PNG?raw=true"/>
<br/>
<hr/>

When a player guesses a letter incorrectly, a balloon pops and it is now the other player's turn.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgSixteen.PNG?raw=true"/>
<br/>
<hr/>

When a player guesses a letter correctly, the letter appears in its correct place in the puzzle and the player continues guessing until they get a letter wrong or they win the game.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgSeventeen.PNG?raw=true"/>
<br/>
<hr/>

When a player guesses the puzzle correctly, they are declared the winner and are awarded one point per game. A little crown then appears over the player's avatar who has the most wins so far. When neither one of the players can guess the puzzle correctly and all of the balloons pop, they both lose the game and are given the option to play again or quit.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgEighteen.PNG?raw=true"/>
<br/>
<hr/>

On both the Single Player mode and Two Player mode pages, these buttons are shown on the bottom of the page. The Home gives the player an option to leave the game and go back to the home page. If leaving Single Player mode, the player's highest current score will be saved. The Next Puzzle button allows the player to move on to another puzzle within the category if they wish. The sound icon is a toggle button that will turn the game sound effects on or off. The Click Me button offers some information about myself, and the moon icon is a toggle button for dark theme and light theme. The sound toggle, moon toggle, and Click Me buttons are available on every page throughout the game.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgEleven.PNG?raw=true"/>
<br/>
<hr/>

When a player clicks the Click Me button, they are able to view some information about myself as the developer of this game. GitHub project repository and LinkedIn links are also available.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgTen.PNG?raw=true"/>
<br/>
<hr/>

Below is an image sample of Dark Theme.

<img src="https://github.com/chelseajcaines/balloon-pop-game/blob/main/src/assets/imgNineteen.PNG?raw=true"/>
<br/>
<hr/>

Thank-you so much for reading! I hope you enjoy the game!

<hr/>
