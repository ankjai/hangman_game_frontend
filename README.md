## Backbone.js Project: Hangman Game

UI to test backend APIs created by https://github.com/ankjai/fullstack-nanodegree-design-a-game project. The APIs supported are listed out on project's README.

#### How to run the app
###### Python SimpleHTTPServer
* Assumes env has python installed, if not install it from [here](https://www.python.org/downloads/)
* `cd` to project root `/hangman_game_frontend`
* Do run this command `python -m SimpleHTTPServer 8080`
* In browser goto `http://localhost:8080/`
* This should open hangman game app on local server, but the backend is talking to APIs exposed on Google App Engine @ `https://design-game.appspot.com/_ah/api`

![](https://cloud.githubusercontent.com/assets/6732675/15721569/73a21b8a-27ee-11e6-9eb7-8266e4da4fde.png)


#### Features Snapshot
###### Google OAuth Login
User does not need to create/maintain account, they can use their google account to login.
![](https://cloud.githubusercontent.com/assets/6732675/15723036/6b9412a2-27f5-11e6-8373-52d7c7a87c8b.png)

###### Dashboards
The 'Boards' page consist of multiple dashboard.
Leaderboard: Shows top 5 players worldwide.
User Top Scores: Shows top 5 games played by the user.
Left-nav: Shows player's matrics like his rank, top score and total no. of wins.
![](https://cloud.githubusercontent.com/assets/6732675/15723079/a4b0a6cc-27f5-11e6-9ed5-e5fb264de3ef.png)

###### Profile Update
User can update his/her profile display name.
![](https://cloud.githubusercontent.com/assets/6732675/15723122/d56bd71e-27f5-11e6-97e8-1ed5eca7cc02.png)

###### Game Play
User can do following:
* Guess a char (make move)
* Come back later time to resume game where he left off
* Cancel the existing game
![](https://cloud.githubusercontent.com/assets/6732675/15723148/06268124-27f6-11e6-8b9c-d8f9ebc580a8.png)

###### Game Replay
User can see his/her move in game replay. This list out step details of that particular move.
![](https://cloud.githubusercontent.com/assets/6732675/15723160/0fa5a34c-27f6-11e6-8727-4fa572ce2d56.png)

###### Email Reminder
If user does not make any move for 24hrs stright, he/she will get email reminder requesting them to make a move.
