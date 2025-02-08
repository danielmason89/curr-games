import axios from 'axios';
import { gameDetailsURL, gameScreenshotURL } from '../api';
import { Game } from '../types/game';
import { Dispatch } from 'redux';

export const loadDetail = (id: Game['id']) => async (dispatch: Dispatch) => {
  dispatch({
    type: 'LOADING_DETAIL',
  });
  const detailData = await axios.get(gameDetailsURL(id));
  const screenShotData = await axios.get(gameScreenshotURL(id));
  dispatch({
    type: 'GET_DETAIL',
    payload: {
      game: detailData.data,
      screen: screenShotData.data,
    },
  });
};

export default loadDetail;
