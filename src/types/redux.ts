import type { Game } from './game';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// State types
export interface GamesState {
  popular: Game[];
  newGames: Game[];
  upcoming: Game[];
  searched: Game[];
  isLoading: boolean;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface DetailState {
  game: Game | null;
  screen: {
    results: Screenshot[];
  };
  isLoading: boolean;
}

export interface RootState {
  games: GamesState;
  detail: DetailState;
}

// Action types
export const FETCH_GAMES = 'FETCH_GAMES' as const;
export const FETCH_SEARCHED = 'FETCH_SEARCHED' as const;
export const CLEAR_SEARCHED = 'CLEAR_SEARCHED' as const;
export const GET_DETAIL = 'GET_DETAIL' as const;
export const LOADING_DETAIL = 'LOADING_DETAIL' as const;
export const SET_LOADING = 'SET_LOADING' as const;

interface FetchGamesAction {
  type: typeof FETCH_GAMES;
  payload: {
    popular: Game[];
    upcoming: Game[];
    newGames: Game[];
  };
}

interface FetchSearchedAction {
  type: typeof FETCH_SEARCHED;
  payload: {
    searched: Game[];
  };
}

interface ClearSearchedAction {
  type: typeof CLEAR_SEARCHED;
}

interface GetDetailAction {
  type: typeof GET_DETAIL;
  payload: {
    game: Game;
    screen: {
      results: Screenshot[];
    };
  };
}

interface LoadingDetailAction {
  type: typeof LOADING_DETAIL;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type GamesActionTypes =
  | FetchGamesAction
  | FetchSearchedAction
  | ClearSearchedAction
  | SetLoadingAction;

export type DetailActionTypes = GetDetailAction | LoadingDetailAction;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
