import React from 'react';
import ReactDOM from 'react-dom';
import LeftBar from './component/leftBar.jsx';

chrome.bookmarks.getTree(data => {
  console.log('bmTree', data);
  ReactDOM.render( <LeftBar bmTree = {data}> </LeftBar>
  , document.getElementById('main'))
})