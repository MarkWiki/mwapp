import React from 'react';
import { Button, Jumbotron } from 'reactstrap';

const LandingPage = () => (
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
);

export default LandingPage;
