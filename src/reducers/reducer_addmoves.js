export default function(state=[],action){
switch(action.type){
case 'ADD_MOVES':
return [...state,action.payload];;

default:
return state;
}
}