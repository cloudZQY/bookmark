import React from 'react';
import FolderList from './folderList';
import BookmarkList from '../component/leftBar/bookmarkList';
import '../component/leftBar/leftBar.css';
import { refreshBookmarks, toggleFolder, changeFolder, openFolder, moveBookmark } from '../actions';
import { connect } from 'react-redux';
import { getFolder } from 'util';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


class LeftBar extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.dispatch(refreshBookmarks());
  }

  bookmarkClick(id) {
    const { dispatch, bookmarks } = this.props;
    let folder = getFolder(bookmarks, id);
    let parent = folder;
    while(parent) {
      dispatch(openFolder(parent.id));
      parent = getFolder(bookmarks, parent.parentId);
    }
    dispatch(changeFolder(id));
    dispatch(openFolder(id));
  }

  handleMove(id, distination) {
    let { dispatch, choosedFolder} = this.props;
    chrome.bookmarks.move(id, distination);
    dispatch(refreshBookmarks());
    dispatch(changeFolder(choosedFolder));
  }

  render() {
    return  <div className="leftBar" id="leftBar">
              <FolderList 
              handleMove={this.handleMove.bind(this)}
              />
              <BookmarkList 
              showedBookmarks={this.props.showedBookmarks}
              bookmarkClick={this.bookmarkClick.bind(this)}
              handleMove={this.handleMove.bind(this)}
              />
            </div>

  }
}

export default connect(state => {
  return {
    showedBookmarks: state.showedBookmarks,
    bookmarks: state.bookmarks,
    choosedFolder: state.choosedFolder,
  }
})(DragDropContext(HTML5Backend)(LeftBar));

