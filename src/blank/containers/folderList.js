import React from 'react';
import { connect } from 'react-redux';
import Folder from '../component/leftBar/folder';
import { toggleFolder, changeFolder } from '../actions';

class FolderList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bookmarks, openedFolders, choosedFolder, dispatch, handleMove } = this.props;
    let folders = bookmarks.map((folder, key) => {
        return (
          <Folder 
            folder={folder} 
            key={key} 
            openedFolders={openedFolders}
            choosedFolder={choosedFolder} 
            handleClick={id => {
              this.props.dispatch(toggleFolder(id));
              this.props.dispatch(changeFolder(id));
            }} />
        )
    });
    return  <div className="folderBox">
              {folders}
            </div>
  }
}

const select = state => {
  return {
    bookmarks: state.bookmarks,
    openedFolders: state.openedFolders,
    choosedFolder: state.choosedFolder,
  }
  
}

export default connect(select)(FolderList);
