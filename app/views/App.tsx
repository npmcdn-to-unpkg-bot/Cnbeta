import * as React from 'react';
import MyLabel from './MyLabel';
const styles = require("./App.css");

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className={styles.app}>
        <MyLabel />
      </div>
    );
  }
}
