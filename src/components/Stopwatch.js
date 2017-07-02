import React, { Component } from 'react';

   
const formattedSeconds =(sec) =>{
let date = new Date(null);
date.setSeconds(sec);
let result = date.toISOString().substr(11, 8);
return result;
}
  
//component to display the stopwatch. Continously runs until the game over state is reached. On unmounting, it sets the time elapsed state.
export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      secondsElapsed: 0, 
    };
    this.incrementer = null;
  } 
  
   componentDidMount(){
    this.handleStartTimer();
   }
  componentWillUnmount(){
  clearInterval(this.incrementer);
  this.props.timesetter(this.state.secondsElapsed);
  }
  
    
  handleStartTimer() {
    this.incrementer=setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    , 1000);
  }
  
  render() {
    return (
      <div className="time-wrapper">
        <h6>TIME:{formattedSeconds(this.state.secondsElapsed)}</h6>
      </div>
    );
  }
}

