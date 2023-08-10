import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";
import auth0Constant from "../constants/Auth0Constant";

class Auth0ProviderWithScope extends React.Component {
    domain = auth0Constant.DOMAIN;
    clientId = auth0Constant.CLIENT_ID;
    redirectUri = `${window.location.origin}/login-callback`;

    render() {
        return (
            <Auth0Provider
                domain={this.domain}
                clientId={this.clientId}
                redirectUri={this.redirectUri}
                authorizationParams={{
                    redirect_uri: this.redirectUri,
                    audience: auth0Constant.AUDIENCE,
                    scope: auth0Constant.SOCPE
                }}
                >
                {this.props.children}
            </Auth0Provider>
        );
    }
}

export default withRouter(Auth0ProviderWithScope);