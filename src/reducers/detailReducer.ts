import {
  DetailState,
  DetailActionTypes,
  GET_DETAIL,
  LOADING_DETAIL,
} from '../types/redux';

const initState: DetailState = {
  game: null,
  screen: {
    results: [],
  },
  isLoading: true,
};

const detailReducer = (
  state: DetailState = initState,
  action: DetailActionTypes
): DetailState => {
  switch (action.type) {
    case GET_DETAIL:
      return {
        ...state,
        game: action.payload.game,
        screen: action.payload.screen,
        isLoading: false,
      };
    case LOADING_DETAIL:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default detailReducer;
