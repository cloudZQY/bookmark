import { combineReducers } from 'redux';
import { getFolder } from 'util';
import async from 'async';

const showedBookmarks = (state=[], action) => {
  switch(action.type) {
    case 'CHANGE_FOLDER':
      return action.bookmarks;
    default:
      return state;
  }
}

const openedFolders = (state={}, action) => {
  switch(action.type) {
    case 'TOGGLE_FOLDER':
      return Object.assign({}, state, {
          [action.id]: !state[action.id]
        })
    case 'OPEN_FOLDER':
      return Object.assign({}, state, {
          [action.id]: true
        });
    default: 
      return state;
  }
}

const bookmarks = (state=[], action) => {
  switch(action.type) {
    case 'REFRESH_BOOKMARKS':
      return action.bookmarks;
    default:
      return state;
  }
}

const choosedFolder = (state='', action) => {
  switch(action.type) {
    case 'OPEN_FOLDER':
      return action.id;
    case 'TOGGLE_FOLDER':
      return action.id;
    default:
      return state;
  }
}

const modes = (state=[], action) => {
  switch(action.type) {
    case 'REFRESH_MODES':
      return [].concat(action.modes);
    default:
      return state;
  }
}

const CBM = (state={}, action) => {
  switch(action.type) {
    case 'SAVE_CBM':
      return Object.assign({}, action.CBM);
    default:
      return state;
  }
}


export default combineReducers({
  showedBookmarks,
  choosedFolder,
  openedFolders,
  bookmarks,
  modes,
  CBM
})