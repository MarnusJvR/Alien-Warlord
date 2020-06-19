This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
I wanted to create a game where objects move around on screen. I originally attempted JQuery but this obviously ndid not work
Idid some digging and found REDUX and SVG. Perfect fit.
I found online tutorials on both and followed them.
I followed tutorials on building a game in Redux, that takes you through the process step by step. This made this project possible. 
This was a massive undertaking. The working version is my fourth attempt at it.
I started the project over from scratch 3 times before getting it right

<b Introduction />
The app see UFOs flying towards earth and you are trying to shoot them down with a canon.
I removed the following files after creating the project:
App.css
App.Test.js
logo.svg

<b INSTALLS/>
Install redux and prop-types with the following
 - npm i redux react-redux prop-types
I also use CSS animation
-npm i styled-components
<b overview/>

I created a Container component, a presentational component and a reducer.
The container component talks to the presentational component. The third element I created is the Redux store.
Redux store takes events and applies functions to change state based on these events

<b Leaderbord/>
Leaderbord and rank components are not functional


