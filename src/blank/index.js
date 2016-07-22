import React from 'react';
import ReactDOM from 'react-dom';
import './basic.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import LeftBar from './containers/leftBar';
import ModeBar from './containers/modeBar';

let store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);
ReactDOM.render( 
  <Provider store={store}>
    <div>
      <LeftBar/>
      <ModeBar/>
    </div>
    
  </Provider>
  
, document.getElementById('main'))
