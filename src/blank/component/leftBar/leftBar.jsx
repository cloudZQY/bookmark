import React from 'react';
import FolderList from './folderList.jsx';
import BookmarkList from './bookmarkList.jsx';
import './leftBar.css';


export default class extends React.Component {
  constructor(props) {
    super(props);

    let bmTree = props.bmTree;
    this.state = {
      bmTree,
      bookmarks: [],
    }
  }

  changeFolder(children) {
    console.log(children);
    this.setState({
      bookmarks: children.map(function(child, key) {
        return child.children ? '' : child;
      })
    });
  }

  render() {
    return  <div className="leftBar" id="leftBar">
              <FolderList bmTree={this.state.bmTree} changeFolder={this.changeFolder.bind(this)}></FolderList>
              <BookmarkList bookmarks={this.state.bookmarks}></BookmarkList>
            </div>

  }
}