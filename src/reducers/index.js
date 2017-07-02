import { combineReducers } from 'redux';
import movesreducer from './reducer_addmoves';

const rootReducer = combineReducers({
  moves:movesreducer
});

export default rootReducer;
