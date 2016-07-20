import React from 'react';
import { isFolder } from 'util';
import { toggleFolder } from '../../actions';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    let { openedFolders, folder, handleClick } = props;
  }

  handleClick() {
    this.props.handleClick(this.props.folder.id);
  }


  render() {
    let { openedFolders, folder, choosedFolder, handleClick } = this.props;
    let childFolders = openedFolders[folder.id] ? folder.children.map((child, key) => {
          if (isFolder(child)) {
            return (<Folder folder={child} key={key} choosedFolder={choosedFolder} openedFolders={openedFolders} handleClick={handleClick}/>);
          }
        }) : [];
    if (choosedFolder === folder.id) {
      console.log(this.props.folder.title)
      return <div className="folder">
                    <span className="folderTitle  choosed overflow_ellipsi" onClick={this.handleClick.bind(this)}>{this.props.folder.title}</span>
                    {childFolders}
                  </div>
    }
    return  <div className="folder">
              <span className="folderTitle overflow_ellipsi" onClick={this.handleClick.bind(this)}>{this.props.folder.title}</span>
              {childFolders}
            </div>
  }
}

export default Folder;