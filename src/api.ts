import type { Game } from './types/game';

// Base URL
const baseUrl = `https://api.rawg.io/api/`;

// Getting date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  return month < 10 ? `0${month}` : month;
};
const getCurrentDay = () => {
  const day = new Date().getDate();
  return day < 10 ? `0${day}` : day;
};

// Date vars
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();

const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

// Popular games
const apiKey = process.env.RAWG_API_KEY;

const popularGames = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcomingGames = `games?key=${apiKey}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesURL = () => `${baseUrl}${popularGames}`;
export const upcomingGamesURL = () => `${baseUrl}${upcomingGames}`;
export const newGamesURL = () => `${baseUrl}${newGames}`;

// Game Details
export const gameDetailsURL = (gameId: Game['id']) =>
  `${baseUrl}games/${gameId}.json?&key=${apiKey}`;

// Game ScreenShots
export const gameScreenshotURL = (gameId: Game['id']) =>
  `${baseUrl}games/${gameId}/screenshots?&.json?&key=${apiKey}`;

// Searched Game
export const searchGameURL = (gameName: Game['name']) =>
  `${baseUrl}games?search=${gameName}&pageSize=9&key=${apiKey}`;
