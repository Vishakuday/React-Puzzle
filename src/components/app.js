import React, { Component } from 'react';
import Gridbox from './Gridbox.js';
import Moves from './Moves.js';
import Stopwatch from './Stopwatch.js';

const formattedSeconds =(sec) =>{
let date = new Date(null);
date.setSeconds(sec);
let result = date.toISOString().substr(11, 8);
return result;
}

//Root component which calls the other subcomponents
export default class Gamebox extends Component {
constructor(props){
super(props);
this.state={jumbled_arr:[],gameover:false,time_elapsed:0,moves:0};

}


 componentDidMount(){
this.shuffle();
 }

//shuffle the proper array on initial mount and on click of shuffle button
shuffle(){
 let input=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"blank"];
 let jumbled_arr=function(input) {   
     for (let i = input.length-1; i >=0; i--) {    
         let randomIndex = Math.floor(Math.random()*(i+1)); 
         let itemAtIndex = input[randomIndex];          
         input[randomIndex] = input[i]; 
         input[i] = itemAtIndex;
     }
     return input;
 }(input);
this.setState({jumbled_arr});
}

//render function which conditionally renders either the game state or the gameover state
  render() {
  if(!this.state.gameover)
    return (
	<div>
	<div className="top-section">
	<h1>THE PUZZLE</h1>
	</div>
      <div className="game-wrapper">
	  <button className="btn-new-game" onClick={()=>window.location.reload()}>NEW GAME</button>
	  <button className="btn-shuffle" onClick={()=>this.shuffle()}>SHUFFLE BOARD</button>
	  <div className="info-wrapper">
	  <div className="moves-wrapper"><h6>MOVES:{this.state.moves}</h6></div>
		<Stopwatch gameover={this.state.gameover} timesetter={(time_elapsed)=>{this.setState({time_elapsed})}}/>
	  </div>  
	  <Gridbox jumbledarr={this.state.jumbled_arr} arraysetter={(arr,gameover)=>{this.setState({jumbled_arr:arr,gameover,moves:this.state.moves+1})}}/>
	  <Moves/>
	</div>
	</div>
    )
	else{
	return(
	<div className="game-over-container"> 
	<h1>Congrats! you won the game :)</h1>
	<h3>You completed the game in {this.state.moves} moves and the time taken for it:{formattedSeconds(this.state.time_elapsed)}</h3>
	</div>
	)
	}
	}
}
