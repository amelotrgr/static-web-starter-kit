import React, { Component } from 'react';
import ReactF1 from 'react-f1';

import states from './states'
import transitions from './transitions';
import styles from './styles.css' 


import { connect } from 'react-redux';
import { logIn, logOut } from '../../actions';

/**
 * Header component
 */
class Header extends Component {

  constructor(props) {

    super(props);

    this.clickLogHandler = this.clickLogHandler.bind(this);
    this.clickLikeHandler = this.clickLikeHandler.bind(this);
    this.mouseOverLikeHandler = this.mouseOverLikeHandler.bind(this);
    this.mouseOutLikeHandler = this.mouseOutLikeHandler.bind(this);

    this.state = {
      go: 'idle',
      isSelected: false,
    };
  }

  /**
   * componentDidMount
   */

  componentDidMount() {
    console.log(this.state)
    console.log(this.props)

  }

  /**
   * clickLogHandler
   */

  clickLogHandler() {

    console.log(this.props.isLoggedIn)

    if (this.props.isLoggedIn) {
      this.props.dispatch(logOut())
    } else {
      this.props.dispatch(logIn())
    }
    
  }

  /**
   * clickLikeHandler
   */

  clickLikeHandler() {

    const isSelected = !this.state.isSelected;

    this.setState({
      go : (isSelected) ? 'selected' : 'over',
      isSelected: isSelected,
    });
  }

  /**
   * mouseOverLikeHandler
   */

  mouseOverLikeHandler() {

    if (this.state.go === 'idle') {
      this.setState({
        go: 'over',
      });
    }
  }

  /**
   * mouseOutLikeHandler
   */

  mouseOutLikeHandler() {

    if (this.state.go === 'over') {
      this.setState({
        go: 'idle',
      });
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {

    const l = (this.props.isLoggedIn) ? 'LogOut' : 'LogIn';

    return (
      <ReactF1 className={styles.wrapper}
        go={this.state.go}
        states={states()}
        transitions={transitions()}
      >
        <h1>Header</h1>
        <h2 data-f1="icon" className={styles.icon}
          onClick={this.clickLikeHandler}
          onMouseOver={this.mouseOverLikeHandler}
          onMouseOut={this.mouseOutLikeHandler}
        >
          ♡
        </h2>
        <h3 onClick={this.clickLogHandler}>{l}</h3>
      </ReactF1>
    );
  }
}


function select(state) {

  console.log(state)

  return {
    isLoggedIn: state.user.isLoggedIn,
  };
}

function actions(dispatch) {
  return {
    logIn: () => dispatch(logIn()),
    logOut: () => dispatch(logOut()),
    dispatch,
  };
}

module.exports = connect(select, actions)(Header);

