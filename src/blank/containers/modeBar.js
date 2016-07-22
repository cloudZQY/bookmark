import React from 'react';
import ModeItem from '../component/modeBar/modeItem';
import '../component/modeBar/modeBar.css';
import { initModes, refreshBookmarks, changeFolder } from '../actions';
import { connect } from 'react-redux';
import { copyFolderToMain, clearFolder } from 'util';

class modeBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: false
    }
  }

  componentWillMount() {
    this.props.dispatch(refreshBookmarks());
    this.props.dispatch(initModes(this.props.bookmarks));
    this.props.dispatch(refreshBookmarks());
    // moveFolder('204', '1').then(function(){
    //   alert(3)
    // })
  }

  changeMode(id) {
    clearFolder('1').then(() => {
      copyFolderToMain(id, '1').then(() => {
        this.props.dispatch(refreshBookmarks())
        this.props.dispatch(changeFolder(this.props.choosedFolder));
      });
    })
  }

  render() {
    let { modes } = this.props;
    return <div id="modeBar" className="modeBar">
      <ModeItem modes={modes} changeMode={this.changeMode.bind(this)}/>
    </div>
  }
}



export default connect(state => {
  return {
    modes: state.modes,
    bookmarks: state.bookmarks,
    choosedFolder: state.choosedFolder
  }
})(modeBar);

