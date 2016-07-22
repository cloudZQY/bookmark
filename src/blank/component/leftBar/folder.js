import React from 'react';
import { isFolder } from 'util';
import { toggleFolder } from '../../actions';
import { DropTarget } from 'react-dnd';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    let { openedFolders, folder, handleClick } = props;
  }

  handleClick() {
    this.props.handleClick(this.props.folder.id);
  }


  render() {
    let { openedFolders, folder, choosedFolder, handleClick, handleMove, connectDropTarget, isOver } = this.props;
    let childFolders = openedFolders[folder.id] ? folder.children.map((child, key) => {
          if (isFolder(child)) {
            return (<DFolder key={key} folder={child} choosedFolder={choosedFolder} openedFolders={openedFolders} handleClick={handleClick} handleMove={handleMove}/>);
          }
        }) : [];
    return  connectDropTarget(<div className="folder">
              <span 
              className={
                "folderTitle overflow_ellipsis " +
                (choosedFolder === folder.id ? 'choosed ' : '') +
                (isOver ? 'topBorder ' : '')}
              onClick={this.handleClick.bind(this)}>{this.props.folder.title}
              </span>
              {childFolders}
            </div>)
  }
}

let types = 'bookmark';
let spec = {
  drop(props, monitor, component) {
    props.handleMove(
      monitor.getItem().id,
      {
        parentId: props.folder.id,
        index: props.folder.children.length
    })
  },
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
  };
}

const DFolder = DropTarget(types, spec, collect)(Folder);
export default DFolder