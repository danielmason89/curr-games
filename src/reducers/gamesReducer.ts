import {
  GamesState,
  GamesActionTypes,
  FETCH_GAMES,
  FETCH_SEARCHED,
  CLEAR_SEARCHED,
  SET_LOADING,
} from '../types/redux';

const initState: GamesState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
  isLoading: false,
};

const gamesReducer = (
  state: GamesState = initState,
  action: GamesActionTypes
): GamesState => {
  switch (action.type) {
    case FETCH_GAMES:
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
      };
    case FETCH_SEARCHED:
      return {
        ...state,
        searched: action.payload.searched,
      };
    case CLEAR_SEARCHED:
      return {
        ...state,
        searched: [],
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default gamesReducer;

// {reviews.length > 0 &&
//     reviews.map((review) => (
//       <li>{review.name}</li>
//     ))}

// Action
// {type: 'FETCH_GAMES';`
// }
// dispatch({type: 'FETCH_GAMES'});

// Action creator
// const fetchGames = (Can have data) => {
//     return {
//         type: 'FETCH_GAMES',
//         payload: whatever the data is,
//     };
// };
// fetchGames({ user: 'name });
