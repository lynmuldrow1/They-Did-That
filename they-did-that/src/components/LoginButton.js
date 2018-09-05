//Import all necessary dependencies from different libraries.
import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { withAuth } from '@okta/okta-react';

//Create a component, LoginButton, that starts with an initial blank state.
class LoginButton extends Component {
  state = {
    authenticated: null,
    user: null,
    menuAnchorEl: null,
  };

//Check to see if the user is authenticated on first mount- if so, initialize or update the component.
  componentDidUpdate() {
    this.checkAuthentication();
  }

  componentDidMount() {
    this.checkAuthentication();
  }

//On mount, use the auth prop to check to see if the user signed in. If so, set the state to authenticated.
  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      const user = await this.props.auth.getUser();
      this.setState({ authenticated, user });
    }
  }

//Define login and logout actions.
  login = () => this.props.auth.login();
  logout = () => {
    this.handleMenuClose();
    this.props.auth.logout();
  };

//Define what happens when the menu is opened and closed, then set show the appropriate view, placement, and state accordingly.
  handleMenuOpen = event => this.setState({ menuAnchorEl: event.currentTarget });
  handleMenuClose = () => this.setState({ menuAnchorEl: null });

//This is what will be shown on the screen. If the user is not authenticated, it will show the login button and start the auth process.
  render() {
    const { authenticated, user, menuAnchorEl } = this.state;

    if (authenticated == null) return null;
    if (!authenticated) return <Button color="inherit" onClick={this.login}>Login</Button>;

    const menuPosition = {
      vertical: 'top',
      horizontal: 'right',
    };

    return (
      <div>
        <IconButton onClick={this.handleMenuOpen} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          anchorOrigin={menuPosition}
          transformOrigin={menuPosition}
          open={!!menuAnchorEl}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.logout}>
            <ListItemText
              primary="Logout"
              secondary={user && user.name}
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

//Use the withAuth function to wrap the component and return the authenticated user view.
export default withAuth(LoginButton);
