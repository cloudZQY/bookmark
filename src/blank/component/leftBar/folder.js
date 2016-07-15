import React from 'react';
import { isFolder } from 'util';
import { toggleFolder } from '../../actions';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    let { openedFolders, folder, handleClick } = props;
    if (openedFolders[folder.id] && folder.children) {
      this.state = {
        childFolders: folder.children.map((child, key) => {
          if (isFolder(child)) {
            return (<Folder folder={child} key={key} openedFolders={openedFolders} handleClick={handleClick}/>);
          }
        })
      }
    } else {
      this.state = {
        childFolders: []
      }
    }
  }


  render() {
    return  <div className="folder">
              <span className="folderTitle overflow_ellipsi" onClick={this.props.handleClick}>{this.props.folder.title}</span>
              {this.state.childFolders}
            </div>
  }
}

export default Folder;