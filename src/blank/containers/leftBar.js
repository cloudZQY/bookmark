import React from 'react';
import FolderList from './folderList';
import BookmarkList from '../component/leftBar/bookmarkList';
import '../component/leftBar/leftBar.css';
import { refreshBookmarks, toggleFolder } from '../actions';
import { connect } from 'react-redux';


class LeftBar extends React.Component {
  constructor(props) {
    super(props);

    let bmTree = props.bmTree;
    this.state = {
      bmTree,
      bookmarks: [],
    }
  }

  componentWillMount() {
    this.props.dispatch(refreshBookmarks());
  }

  render() {
    return  <div className="leftBar" id="leftBar">
              <FolderList></FolderList>
            </div>

  }
}

export default connect()(LeftBar);

