/*
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "antd"; 
import AdminPanel from "../../components/auth0/auth0-override/adminPanel";
import responseTypes from "../../constants/responseTypes";
import { SUCCESS_MESSAGE } from "../../constants/messages";

const AdminPanelContainer = (props) => {
  const { history, accessToken } = props;

  const [hasErrored, setHasErrored] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onFinish = (values) => {
    const callback = (res, data) => {
      if (res === responseTypes.SUCCESS) {
        Modal.success({
          title: SUCCESS_MESSAGE,
          content: data,
          
        });
      } else {
        setHasErrored(true);
        setErrorMessage(data);
      }
    };
    props.AdminPanel({
      callback,
      accessToken,
      post: {
        ...values,
      },
    });
  };

  return (
    <AdminPanel
      history={history}
      onFinish={onFinish}
      hasErrored={hasErrored}
      errorMessage={errorMessage}
    />
  );
};

const mapStateToProps = ({ userReducer: { accessToken } }) => {
  return { accessToken };
};

const mapDispatchToProps = {
 
};

AdminPanelContainer.propTypes = {
  accessToken: PropTypes.string,
  addPost: PropTypes.func,
  history: PropTypes.object
  
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelContainer);
