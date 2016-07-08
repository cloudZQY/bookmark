import React from 'react';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderChildren: null,
    }
  }

  handleClick() {
    this.setState({
      folderChildren: this.props.folder.children.map( (child, key) => child.children && 
      <Folder key={key} folder={child}  changeFolder={this.props.changeFolder}>
      </Folder>)
    });
    this.props.changeFolder(this.props.folder.children);
  }

  render() {
    return  <div className="folder">
              <span onClick={this.handleClick.bind(this)}>{this.props.folder.title}</span>
              {this.state.folderChildren}
            </div>
  }
}

export default Folder;