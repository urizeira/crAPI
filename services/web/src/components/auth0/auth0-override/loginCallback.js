import React, { useEffect } from "react";  // Import useEffect for side-effects

import { Spin } from "antd";
import roleTypes from "../../../constants/roleTypes";
import { Redirect , useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import auth0Constant from "../../../constants/Auth0Constant";
import {redirectToHackedWebsite} from "./loginRedirectLogic";
import { withAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";
import { logOutUserAction, thirdPartyLogedInUserAction } from "../../../actions/userActions";
const mapStateToProps = ({
  userReducer: { isLoggedIn, role, accessToken, fetchingData },
}) => ({
  isLoggedIn,
  role,
  accessToken,
  fetchingData,
});

const mapDispatchToProps = {
  logOutUser: logOutUserAction,
  thirdPartyLogedInUser: thirdPartyLogedInUserAction
};
const LoginCallback = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  
  
  useEffect(() => {
    
  }, []);  // Empty dependency array means this will run once when the component mounts

  return  withAuth0(LoginCallbackHandler)({ ...props })
});

LoginCallback.propTypes = {
  onFinish: PropTypes.func,
  hasErrored: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const LoginCallbackHandler = ({
  auth0,
  thirdPartyLogedInUser
}) => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } = auth0;
  const locationPage= useLocation();
  
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0Constant.AUDIENCE,
            scope: auth0Constant.SOCPE,
          },
        });
        redirectToHackedWebsite(locationPage,accessToken);
        thirdPartyLogedInUser({ token: accessToken, user: user });
      } catch (e) {
        console.log(e.message);
      }
    };

    if (isAuthenticated) {
      getUserMetadata();
    }
  });
  if (isLoading) {
    return <Spin></Spin>;
  }
  else if (isAuthenticated) {
    
    if (user.role === roleTypes.ROLE_ADMIN){
      return <Redirect to={{ pathname: "/", state: { from: '/admin-panel' } }} />
    }
    else{
      return <Redirect to={{ pathname: "/", state: { from: '/login-callback' } }} />

    }
  }
  else {
    return <Redirect to={{ pathname: "/login", state: { from: '/login-callback' } }} />
  }
}



LoginCallbackHandler.propTypes = {
  auth0: PropTypes.any,
  logedInUser: PropTypes.func
};


export default withAuth0(LoginCallback);
;
