import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addmoves} from '../actions';
import _ from 'lodash';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Gridbox extends Component {

//function to loop through the array and display them
renderarr(){
return this.props.jumbledarr.map((element,i)=>{
if(element==="blank"){
return <li key={i} className="blank-tile"></li>;
}
else{
return <li className="number-tile" key={i} onClick={()=>this.calculate_clickable(i)}>{element}</li>;
}
})
}

//Calculate the clickable tiles and invoke the callbacks to set new state

calculate_clickable=(i)=>{
let blank=this.props.jumbledarr.indexOf("blank");
blank=blank+1;
let calc_clickable=[];
let c1,c2,c3,c4;
c1=blank-4;
c2=blank+1;
c3=blank+4;
c4=blank-1;

if(c1>0){
calc_clickable.push(c1);
}
if((c2%5!=0 && c2%9!=0 && c2%13!=0)||c2==10||c2==15){
calc_clickable.push(c2);
}
if(c3<17){
calc_clickable.push(c3);
}
if((c4)%4!=0){
calc_clickable.push(c4);
}
if(calc_clickable.includes(i+1)){
const swapped_arr=this.swap_elements(this.props.jumbledarr,i,(blank-1));
let gameover=this.calc_gameover(swapped_arr);
this.props.addmoves((i+1),blank,this.props.jumbledarr[i]);
this.props.arraysetter(swapped_arr,gameover);
}
else{
alert("Please click on a tile adjacent to the blank tile");
}
}

swap_elements(jumbledarr,x,y){
let temparr=jumbledarr.slice();
var b = temparr[y];
temparr[y] = temparr[x];
temparr[x] = b;
return temparr;
}


calc_gameover(swappedarr){
const orderedarr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let swappedwithoutblank = _.without(swappedarr,"blank");
let game_over = (swappedwithoutblank.length == orderedarr.length) && swappedwithoutblank.every(function(element, index) {
    return element === orderedarr[index]; 
});
return game_over;
}


render(){
return(
<div className="grid-wrapper">
<ul>
<CSSTransitionGroup
transitionName="example"
transitionEnterTimeout={500}
transitionLeaveTimeout={300}>
{this.renderarr()}
</CSSTransitionGroup>
</ul>
</div>
)
}

}

export default connect(null,{addmoves})(Gridbox);