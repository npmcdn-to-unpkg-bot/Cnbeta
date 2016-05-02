import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import MyLabel from '../components/MyLabel';
import NewsList from '../components/NewsList';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            updated: "",
            entries: []
        };
    }
    
    render() {
        return (
            <div className={css(styles.app)}>
                <MyLabel message={this.state.updated} />
                <NewsList entries={this.state.entries} />
            </div>
        )
    }
    
    componentWillMount() {
        fetch('/rss')
            .then(res => res.json())
            .then((json) => {
                this.setState(json.data);
            });
    }
}

const styles = StyleSheet.create({
    app: {
        backgroundColor: 'green',
        border: '2px solid blue',
    }
});
