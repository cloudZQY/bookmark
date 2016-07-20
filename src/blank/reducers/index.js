import { combineReducers } from 'redux';
import { getFolder } from 'util';

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



export default combineReducers({
  showedBookmarks,
  choosedFolder,
  openedFolders,
  bookmarks,
})