import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import MyLabel from '../components/MyLabel';

export default class App extends React.Component {
    render() {
        return (
            <div className={css(styles.app)}>
                <MyLabel message="Ni hao!" />
            </div>
        )
    }
}

const styles = StyleSheet.create({
    app: {
        backgroundColor: 'green',
        height: '50px',
        border: '2px solid blue',
    }
});
