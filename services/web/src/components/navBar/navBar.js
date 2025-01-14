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

import "./nav.css";

import { Button, Dropdown, Menu, Avatar, Layout, Space } from "antd";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUserAction } from "../../actions/userActions";
import defaultProficPic from "../../assets/default_profile_pic.png";
import roleTypes from "../../constants/roleTypes";

const { Header } = Layout;
/**
 * top navigation bar that contains
 * if not logged in:
 * Login button,
 * crAPI icon,
 * if logged in :
 * dropdown to navigate to change Password or My Profile
 * dropdown alos consists the logout button
 */
const Navbar = (props) => {
  const { history, logOutUser, isLoggedIn,name, profilePicData} = props;
  const { logout } = useAuth0(); 
  
  const logoutLocal = () => {
    logOutUser({
      callback: () => {
      
        localStorage.clear();
        
      },
    });

  
  };

  const takeMenuAction = (input) => {
    if (input.key === "password") history.push(`/reset-password`);
    else if (input.key === "profile") history.push(`/my-profile`);
    else if (input.key === "logout") logoutLocal();
  };

  const menuSidebar = () => (
    <Menu onClick={(key) => takeMenuAction(key)}>
      <Menu.Item key="password">Change Password</Menu.Item>
      <Menu.Item key="logout"><LogoutOutlined /> Logout</Menu.Item>
    </Menu>
  );

  const takeNavigationAction = (input) => {
    if (input.key === "dashboard") history.push(`/`);
    if (input.key === "admin-dashboard") history.push(`/admin-dashboard`);
    else if (input.key === "shop") history.push(`/shop`);
    else if (input.key === "forum") history.push(`/forum`)
    else if (input.key === "car-parts") history.push(`/new-xml-post`);
    else if (input.key === "admin-panel") history.push(`/admin-panel`);
  };


  const menuNavigation = () => (
      <Menu onClick={(key) => takeNavigationAction(key)} mode="horizontal" theme="dark">
      
      {props.role !== roleTypes.ROLE_ADMIN && <Menu.Item key="dashboard">Dashboard</Menu.Item>}
      {props.role !== roleTypes.ROLE_ADMIN && <Menu.Item key="shop">Shop</Menu.Item>}
      {props.role !== roleTypes.ROLE_ADMIN && <Menu.Item key="forum">Community</Menu.Item>}
      {props.role !== roleTypes.ROLE_ADMIN && <Menu.Item key="car-parts">Car Parts Editor</Menu.Item>}
      {props.role === roleTypes.ROLE_ADMIN && <Menu.Item key="admin-panel" className="admin-panel-link">Admin Panel</Menu.Item>} 
    </Menu>
  );
  
  return (
    <Header>
      <Space className="top-nav-left">
        <div className="logo-text" onClick={() => history.push("/")}>
          crAPI
        </div>
        {isLoggedIn ? menuNavigation() : (<div />)
        }
      </Space>
      {isLoggedIn ? (
        <Space className="top-nav-right">
          <div>{`Good Morning, ${name}!`}</div>
          <div className="avatarContainer">
            <Avatar
              src={profilePicData || defaultProficPic}
              className="avatar"
              size="large"
              onClick={() => history.push("/my-profile")}
            />
          </div>
          <Dropdown overlay={menuSidebar()} placement="bottomRight">
            <div className="nav-items">
              <DownOutlined />
            </div>
          </Dropdown>
        </Space>
      ) : (
        <>
          <Space className="top-nav-right">
            <Button
              className="navbar-button"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
            <Button
              className="navbar-button"
              onClick={() => history.push("/signup")}
            >
              Signup
            </Button>
          </Space>
        </>
      )}
    </Header>
  );
};

const mapStateToProps = ({
  userReducer: { accessToken, name, isLoggedIn, role },  // Added userRole
  profileReducer: { profilePicData },
}) => ({
  accessToken,
  name,
  isLoggedIn,
  profilePicData,
  role,  // Added userRole
});


const mapDispatchToProps = {
  logOutUser: logOutUserAction,
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  accessToken: PropTypes.string,
  name: PropTypes.string,
  profilePicData: PropTypes.string,
  logOutUser: PropTypes.func,
  history: PropTypes.object,
  role: PropTypes.string, 
  location: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
