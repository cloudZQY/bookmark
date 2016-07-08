import React from 'react';
import Bookmark from './bookmark.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bookmarks = this.props.bookmarks.map(
      (bookmark, key) => <li className="bookmark" key={key}>{bookmark.title}</li>
    );
    return <ul>{bookmarks}</ul>
  }
}