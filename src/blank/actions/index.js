export const changeFolder = id => {
  return {
    type: 'CHANGE_FOLDER',
    id
  }
  
}

export const toggleFolder = id => {
  return {
    type: 'TOGGLE_FOLDER',
    id
  }
  
}

export const refreshBookmarks = () => (dispatch) => {
  chrome.bookmarks.getTree((bookmarks) => {
    console.log(bookmarks[0].children);
    bookmarks = bookmarks[0].children;
    dispatch({
      type: 'REFRESH_BOOKMARKS',
      bookmarks
    })
  })
}