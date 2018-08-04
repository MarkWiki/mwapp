import Helmet from 'react-helmet';
import React, { Component } from 'react';
import {
  Button,
  Collapse,
  Jumbotron,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './App.css';
import mwLightLogo from './images/MarkWikiLightLogo240x120.png';
import mwDarkLogo from './images/MarkWikiDarkLogo240x120.png';
import githubLightLogo from './images/GitHub-Mark-32px.png';
import githubDarkLogo from './images/GitHub-Mark-Light-32px.png';

function navigateOauthGitHub() {
  const state = '123';
  const currentUrl = window.location.href;
  const scopes = 'user,public_repo';
  const clientId = '815b10ee06332853b128';
  const redirectUrl = 'https://markwiki.com/login/github';
  const newLocation = `https://github.com/login/oauth/authorize?client_id=${encodeURI(
    clientId
  )}&redirect_uri=${encodeURI(redirectUrl)}&scope=${encodeURI(
    scopes
  )}&state=${encodeURI(state)}`;
  window.location = newLocation;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      isLight: false
    });
  }
  render() {
    return (
      <div>
        <Helmet title="MarkWiki" />
        <div>
          <Navbar
            color={this.state.isLight ? 'light' : 'dark'}
            light={this.state.isLight}
            dark={!this.state.isLight}
            expand="md"
          >
            <NavbarBrand href="/">
              <img
                src={this.state.isLight ? mwLightLogo : mwDarkLogo}
                height={32}
                alt="MarkWiki Logo"
                title="MarkWiki"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/login/">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register/">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/MarkWiki">
                    <img
                      src={
                        this.state.isLight ? githubLightLogo : githubDarkLogo
                      }
                      height={24}
                      alt="MarkWiki's GitHub"
                      title="MarkWiki's GitHub"
                    />
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div>
          <Jumbotron>
            <h1 className="display-3">Hello, world!</h1>
            <p className="lead">
              Welcome to MarkWiki{' '}
              <span role="img" aria-label="wave">
                👋
              </span>
            </p>
            <hr className="my-2" />
            <p>Markdown + Wiki + Version Control</p>
            <p className="lead">
              <Button color="secondary">Start using</Button>
            </p>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default App;
