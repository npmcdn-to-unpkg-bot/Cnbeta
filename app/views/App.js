import * as React from 'react';
import MyLabel from '../components/MyLabel';
const styles = require("./App.css");

export default class App extends React.Component {
    render() {
        return (
            <div className={styles.app}>
                <MyLabel message="Ni hao!" />
            </div>
        )
    }
}
