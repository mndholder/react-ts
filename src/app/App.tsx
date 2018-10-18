import * as React from 'react';
import * as classes from './App.scss'

import { Button } from 'semantic-ui-react';

import logo from '../img/logo.svg';

class App extends React.Component {
  public onButtonClick() {
    alert('Hello World!');
  }

  public render() {
    return (
      <div className={classes.app}>
        <header className={classes.appHeader}>
          <img src={logo} className={classes.appLogo} alt="logo" />
          <h1 className={classes.appTitle}>Welcome to React</h1>
        </header>
        <div className={classes.appIntro}>
          <Button primary={true} onClick={this.onButtonClick}>Semantic UI button</Button>
        </div>
        <p>Version: {process.env.VERSION}</p>
      </div>
    );
  }
}

export default App;
