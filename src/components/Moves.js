import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addmoves} from '../actions'


//component to display the moves. This is connected to the application state via react-redux
class Moves extends Component {


rendermoves(){
if(this.props.moves.length===0){
return <div>No moves yet</div>
}

else{
return this.props.moves.map((move,i)=>{
return <li key={i}>{this.formatted(move)}</li>
})
}
}

formatted(move){
return `The Tile - ${move.element} Was Moved From ${this.coordinated(move.from)} To ${this.coordinated(move.to)}`
}

coordinated(num){

let x,y;
x=(num%4);
if(x==0)
x=4;
y=Math.ceil(num/4);
return `(${x-1},${y-1})`

}

render(){
return(
<div className="moves-container">
<h6>MOVES</h6>
<hr/>
{this.rendermoves()}
</div>
)
}
}

function mapStateToProps({moves}){	
return {moves}
}

export default connect(mapStateToProps)(Moves);