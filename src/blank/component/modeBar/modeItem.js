import React from 'react';


export default class extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let {modes} = this.props;
    console.log(modes)
    return <ul>
      {modes.map((mode, key) => {
      return <li key={key} className="modeItem" onClick={() => this.props.changeMode(mode.id)}>{mode.title}</li>
      })}
    </ul>
  }
}
