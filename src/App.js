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
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import './App.scss';
import mwLightLogo from './images/MarkWikiLightLogo240x120.png';
import githubLightLogo from './images/GitHub-Mark-32px.png';

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
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Helmet title="MarkWiki" />
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
              <img
                src={mwLightLogo}
                height={32}
                alt="MarkWiki Logo"
                title="MarkWiki"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="https://github.com/MarkWiki">
                    <img
                      src={githubLightLogo}
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
