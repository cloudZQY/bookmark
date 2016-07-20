import React from 'react';
import Bookmark from './bookmark';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let { showedBookmarks, bookmarkClick, handleMove } = this.props;
    showedBookmarks = showedBookmarks.map(
      (bookmark, key) => {
        return <Bookmark
        bookmarkClick={bookmarkClick}
        bookmark={bookmark}
        handleMove={handleMove}
        key={key}
        />
        // if (isFolder(bookmark)) {
        //   return <li className = "folderItem overflow_ellipsis" key={key} onClick={()=>{bookmarkClick(bookmark.id)}}><a href="#">{bookmark.title}</a> </li>
        // } else {
        //   return <li className="bookmarkItem overflow_ellipsis" key={key}><a href={bookmark.url}>{bookmark.title}</a></li>
        // }
      }
    )
    return <ul className="bookmarkBox">{showedBookmarks}</ul>
  }
}

export default DragDropContext(HTML5Backend)(BookmarkList);