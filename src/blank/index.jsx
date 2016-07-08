import React from 'react';
import ReactDOM from 'react-dom';
import LeftBar from './component/leftBar/leftBar.jsx';
import './basic.css';


chrome.bookmarks.getTree(data => {
  console.log('bmTree', data);
  ReactDOM.render( <LeftBar bmTree = {data}> </LeftBar>
  , document.getElementById('main'))
})