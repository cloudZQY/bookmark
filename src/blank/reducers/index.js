import { combineReducers } from 'redux';

const showedFolder = (state='', action) => {
  switch(action.type) {
    case 'CHANGE_FOLDER':
      return action.id;
    default:
      return '';
  }
}

const openedFolders = (state={}, action) => {
  switch(action.type) {
    case 'TOGGLE_FOLDER':
      if (state[action]) {
        state[action.id] = 0;
      } else {
        state[action.id] = 1;
      }
      return state
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

function getFolder(list, id) {
  var getResult = list => list.find((item) => item.id === id);
  var loopChildren = list => {
    let result;
    if (result = getResult(list)) {
      return result;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].children && (result = loopChildren(list[i].children))) {
        return result;
      }
    }
  }
  return loopChildren(list);
}


export default combineReducers({
  showedFolder,
  openedFolders,
  bookmarks,
})