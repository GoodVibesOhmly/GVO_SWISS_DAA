import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import pages from './pages';
import './sass/style.sass';
import Navigation from './components/Navigation';
import config from './config';

function App({ bootstrap }) {
  console.log(`environment ${config.name}`);
  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return (
    <div className="App">
      <section className="hero is-fullheight is-default is-bold">
        <BrowserRouter>
          <Switch>
            {Object.values(pages).map(({ RootComponent, rootPath }) => (
              <Route
                key={rootPath}
                path={rootPath}
                exact={rootPath === '/'}
                render={props => (
                  <>
                    <Navigation {...props} />
                    <div className="hero-body">
                      <div className="container has-text-centered">
                        <RootComponent rootpath={rootPath} {...props} />
                      </div>
                    </div>
                  </>
                )}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </section>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    bootstrap: () => dispatch({ type: 'BOOTSTRAP' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
