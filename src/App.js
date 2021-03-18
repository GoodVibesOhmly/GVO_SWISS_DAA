import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import pages from './pages';
import './sass/style.sass';
import Navigation from './components/Navigation';

function App({ bootstrap }) {
  // console.log(`environment ${config.name}`);
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
            <Redirect from="/pay-dues" to="/" />
            <Redirect from="/contribute" to="/" />
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
