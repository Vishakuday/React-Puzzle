export function addmoves(from,to,element){
const move={}
move.from=from;
move.to=to;
move.element=element;
return{type:'ADD_MOVES',payload:move}
}