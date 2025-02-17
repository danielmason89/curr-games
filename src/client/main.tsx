import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import NotFound from './pages/NotFound';

// Wrap the app with Redux Provider to enable RTK Query throughout the app
// This is simpler than traditional Redux as we don't need to manage actions/reducers
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='games' element={<Games />} />
            <Route path='games/:id' element={<GameDetails />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
