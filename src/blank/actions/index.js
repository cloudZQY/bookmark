import React from 'react';
import { saveFolder, createDefaultMode } from 'util';

export const changeFolder = id => dispatch =>{
  chrome.bookmarks.getChildren(id, children => {
      dispatch({
          type: 'CHANGE_FOLDER',
          bookmarks: children,
      })
  })
}

export const toggleFolder = id => {
  return {
    type: 'TOGGLE_FOLDER',
    id
  }
}

export const openFolder = id => {
  return {
    type: 'OPEN_FOLDER',
    id
  }
}

export const moveBookmark = (id, distination) => {
  return {
    type: 'MOVE_BOOKMARK',
    id,
    distination
  }
}

export const refreshBookmarks = () => (dispatch) => {
  chrome.bookmarks.getTree((bookmarks) => {
    console.log(bookmarks);

    bookmarks = bookmarks[0].children;
    dispatch({
      type: 'REFRESH_BOOKMARKS',
      bookmarks
    })
  })
}

export const initModes = (bookmarks) => (dispatch) => {
  createDefaultMode(bookmarks).then((bm) => {
    dispatch(refreshBookmarks());
    saveFolder(bm.id).then(modes => {
      dispatch(refreshModes(modes));
    })
    dispatch(saveCBM(bm));
  })
}

export const refreshModes = modes => {
  return {
    type: 'REFRESH_MODES',
    modes
  }
}

export const saveCBM = CBM => {
  return {
    type: 'SAVE_CBM',
    CBM
  }
}