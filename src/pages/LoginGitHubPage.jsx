import React from 'react';
import { observer } from 'mobx-react';
import AuthService from '../services/AuthService';
import gitHubLogoLightLarge from '../images/GitHub-Mark-120px-plus.png';

class LoginGitHubPage extends React.Component {
  render() {
    const { from } = (this.props.location && this.props.location.state) || {
      from: { pathname: '/' }
    };
    AuthService.navigateOauthGitHub(from.pathname);

    return (
      <div className="pt-5">
        <div className="text-center">
          <img src={gitHubLogoLightLarge} alt="GitHub Mark" />
          <div className="pt-4">Redirecting to GitHub...</div>
        </div>
      </div>
    );
  }
}

export default observer(LoginGitHubPage);
