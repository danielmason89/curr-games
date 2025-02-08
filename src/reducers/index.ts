import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import detailReducer from './detailReducer';
import { RootState } from '../types/redux';

const rootReducer = combineReducers<RootState>({
  games: gamesReducer,
  detail: detailReducer,
});

export default rootReducer;
