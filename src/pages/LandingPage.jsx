import React from 'react';
import { Button, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import AuthService from '../services/AuthService';

const LandingPage = () => (
    <Jumbotron>
        <h1 className="display-3">
            {'Hello, world!'}
        </h1>
        <p className="lead">
            {'Welcome to MarkWiki '}
            <span role="img" aria-label="wave">
                {'👋'}
            </span>
        </p>
        <hr className="my-2" />
        <p>
            {'Markdown + Wiki + Version Control'}
        </p>
        <p
            className={classnames(
                'lead',
                AuthService.instance.isAuthenticated && 'd-none'
            )}
        >
            <Link to="/login">
                <Button color="secondary">
                    {'Start using'}
                </Button>
            </Link>
        </p>
        <div>
            {'Wikis'}
            <div />
        </div>
    </Jumbotron>
);

export default observer(LandingPage);
