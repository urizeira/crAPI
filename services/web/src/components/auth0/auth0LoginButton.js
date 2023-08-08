import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

class Auth0LoginButton extends React.Component {
  render() {
    const { loginWithRedirect } = this.props.auth0;

    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() => loginWithRedirect()}>
        Continue with Auth0
      </button>
    );
  }
}

export default withAuth0(Auth0LoginButton);