// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import type { Dispatch } from "redux";
import { logout } from "../../actions";

class LogoutPage extends Component<Dispatch> {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect()(LogoutPage);
