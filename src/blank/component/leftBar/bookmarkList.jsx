import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bookmarks = this.props.bookmarks.map(
      (bookmark, key) => <li className="bookmark overflow_ellipsis" key={key}><a href={bookmark.url}>{bookmark.title}</a></li>
    );
    return <ul className="bookmarkBox">{bookmarks}</ul>
  }
}