import * as React from 'react';
import * as classes from './App.scss'

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className={classes.app}>
        <header className={classes.appHeader}>
          <img src={logo} className={classes.appLogo} alt="logo" />
          <h1 className={classes.appTitle}>Welcome to React</h1>
        </header>
        <p className={classes.appIntro}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Version: {process.env.VERSION}</p>
      </div>
    );
  }
}

export default App;
