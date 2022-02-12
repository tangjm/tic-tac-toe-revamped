# Tic Tac Toe 

[![Netlify Status](https://api.netlify.com/api/v1/badges/09cbb80d-1253-419d-93da-0f743c861058/deploy-status)](https://app.netlify.com/sites/tic-tac-toe-revamped/deploys)

[Link to deployed app](https://tic-tac-toe-revamped.netlify.app/)

### User Stories:

10. [x] In light making the game accessible to a wider audience, I want a dropdown button to change the game language so that users can play the game in French and Mandarin. I also want this to be easily extensible so more languages can be added in future.
11. [ ] As a user, I want to be able to toggle a switch so that I can enjoy the game with light and dark themes.
12. [ ] As a user, I want to be able to view the time so that I can keep an eye on how long I'm spending on the game.

### Feature list:

1. [x] Display the location for each move in the format (col, row) in the move history list.
2. [x] Bold the currently selected item in the move list.
3. [x] Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. [x] Add a toggle button that lets you sort the moves in either ascending or descending order.
5. [x] When someone wins, highlight the three squares that caused the win.
6. [x] When no one wins, display a message about the result being a draw
7. [x] Selecting a previous move in the move history after a player has won removes all highlighting. Selecting the winning move again will highlight the three squares that caused the win.	
8. [x] Backtracking and then playing out a different sequence of moves that result in a different outcome (either different winning squares or winner) will result in the new three squares that caused the resulting win to be highlighted.
9. [x] Add board coordinates and ensure that moves in move history match them accurately.