import React from 'react';
import { connect } from 'react-redux';
import Folder from '../component/leftBar/folder';
import { toggleFolder, changeFolder } from '../actions';

class FolderList extends React.Component {
  constructor(props) {
    super(props);

    let { bookmarks, openedFolders } = props;
    this.state = {
      bookmarks,
      openedFolders,
      folders: bookmarks.map((folder, key) => {
        return <Folder folder={folder} key={key} openedFolders={openedFolders} handleClick={this.handleClick.bind(this)}></Folder>
      }),
    }
  }

  handleClick(id) {
    toggleFolder(id);
    changeFolder(id);
  }

  componentWillReceiveProps() {
    this.setState({
      folders: this.state.bookmarks.map((folder, key) => {
        return <Folder folder={folder} key={key} openedFolders={this.state.openedFolders} handleClick={this.handleClick.bind(this)}></Folder>
      }),
    })
  }

  render() {
    return  <div className="folderBox">
              {this.state.folders}
            </div>
  }
}



const select = state => {
  return {
    bookmarks: state.bookmarks,
    openedFolders: state.openedFolders,
  }
  
}

export default connect(select)(FolderList);
