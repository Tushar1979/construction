import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

import { Provider } from "react-redux";
import { store } from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
let persistor = persistStore(store)
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));

