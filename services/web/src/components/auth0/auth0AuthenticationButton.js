import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";

import Auth0LoginButton from "./auth0LoginButton";
import Auth0LogoutButton from "./auth0LogoutButton";

const mapStateToProps = ({ userReducer: { isLoggedIn } }) => {
  return { isLoggedIn };
};

class Auth0AuthenticationButton extends React.Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;

    return isLoggedIn ? <Auth0LogoutButton /> : <Auth0LoginButton />;
  }
}

export default connect(mapStateToProps)(withAuth0(Auth0AuthenticationButton));
