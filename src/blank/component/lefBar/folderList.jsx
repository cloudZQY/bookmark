import React from 'react';
import Folder from './folder.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    let {bmTree, changeFolder} = props; 
    this.state = {
      folders: bmTree[0].children.map( (child, key) => child.children && 
                <Folder key={key} folder={child} changeFolder={changeFolder}>
                </Folder>),
    }
  }

  render() {
    return  <div className="folderBox">
              {this.state.folders}
            </div>
  }
}