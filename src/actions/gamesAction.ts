import axios from 'axios';
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL,
} from '../api';
import type { Game } from '../types/game';
import {
  AppThunk,
  FETCH_GAMES,
  FETCH_SEARCHED,
  CLEAR_SEARCHED,
} from '../types/redux';

// Action Creators
export const loadGames = (): AppThunk => async dispatch => {
  // fetch axios
  const popularData = await axios.get(popularGamesURL());
  const newGamesData = await axios.get(newGamesURL());
  const upcomingData = await axios.get(upcomingGamesURL());

  const filterOutNSFWGames = (games: Game[]) => {
    const nsfwTags = ['nsfw', 'erotic', 'hentai'];

    return games.filter(
      game => !game.tags.some(tag => nsfwTags.includes(tag.name.toLowerCase()))
    );
  };

  dispatch({
    type: FETCH_GAMES,
    payload: {
      popular: filterOutNSFWGames(popularData.data.results),
      upcoming: filterOutNSFWGames(upcomingData.data.results),
      newGames: filterOutNSFWGames(newGamesData.data.results),
    },
  });
};

export const fetchSearch =
  (gameName: string): AppThunk =>
  async dispatch => {
    const searchGames = await axios.get(searchGameURL(gameName));

    dispatch({
      type: FETCH_SEARCHED,
      payload: {
        searched: searchGames.data.results,
      },
    });
  };

export const clearSearched = () => ({
  type: CLEAR_SEARCHED,
});
