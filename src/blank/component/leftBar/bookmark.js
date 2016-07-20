import React from 'react';
import { isFolder } from 'util';
import { DragSource, DropTarget } from 'react-dnd';


class Bookmark extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { bookmarkClick, bookmark, connectDragSource, connectDropTarget, isOver} = this.props;
    return connectDropTarget(connectDragSource(
      <li className = {
        'overflow_ellipsis ' + (isFolder(bookmark) ? 'folderItem ' : 'bookmarkItem ') + (isOver? 'topBorder' : '')
      } onClick={()=>{
        if (isFolder(bookmark)) {
          bookmarkClick(bookmark.id)
        } else {
          return
        }
      }}><a href="#">{bookmark.title}</a> </li>
    ))
  }
}

let types = 'bookmark';
let sourceSpec = {
  beginDrag(props){
    return {
      id: props.bookmark.id
    }
  }
}
let targetSpec = {
  drop(props, monitor, component) {
    console.log(monitor.getItem());
    props.handleMove(
      monitor.getItem().id,
      {
        parentId: props.bookmark.parentId,
        index: props.bookmark.index
    })
  },
}
function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
  };
}

export default DropTarget(types, targetSpec, targetCollect)(DragSource(types, sourceSpec, sourceCollect)(Bookmark));
