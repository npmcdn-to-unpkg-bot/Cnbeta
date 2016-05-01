import * as React from 'react';
import MyLabel from './MyLabel';
const styles = require("./App.css");
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", {className: styles.app}, React.createElement(MyLabel, null)));
    }
}
