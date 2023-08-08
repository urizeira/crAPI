import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";
import { auth0 } from "../constants/APIConstant";

class Auth0ProviderWithScope extends React.Component {
    domain = process.env.REACT_APP_AUTH0_DOMAIN;
    clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    redirectUri = `${window.location.origin}/login-callback`;

    render() {
        debugger
        return (
            <Auth0Provider
                domain={this.domain}
                clientId={this.clientId}
                redirectUri={this.redirectUri}
                authorizationParams={{
                    redirect_uri: this.redirectUri,
                    audience: auth0.audience,
                    scope: auth0.socpe
                }}
                >
                {this.props.children}
            </Auth0Provider>
        );
    }
}

export default withRouter(Auth0ProviderWithScope);