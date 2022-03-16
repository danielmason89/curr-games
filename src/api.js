import dotenv from "dotenv";

dotenv.config();

// Base URL
const baseUrl = `https://api.rawg.io/api/`;

// Getting date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

//   Date vars
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();

const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

// Popular games
const apiKey = process.env.REACT_APP_YOUR_API_KEY;

const popularGames = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcomingGames = `games?key=${apiKey}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesURL = () => `${baseUrl}${popularGames}`;
export const upcomingGamesURL = () => `${baseUrl}${upcomingGames}`;
export const newGamesURL = () => `${baseUrl}${newGames}`;

// Game Details
export const gameDetailsURL = (gameId) =>
  `${baseUrl}games/${gameId}.json?&key=${apiKey}`;

// Game ScreenShots
export const gameScreenshotURL = (gameId) =>
  `${baseUrl}games/${gameId}/screenshots?&.json?&key=${apiKey}`;

// Searched Game
export const searchGameURL = (gameName) =>
  `${baseUrl}games?search=?${gameName}&pageSize=9?&key=${apiKey}`;
