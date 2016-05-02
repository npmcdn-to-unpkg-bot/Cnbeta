import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import MyLabel from '../components/MyLabel';
import NewsList from '../components/NewsList';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stories: [] };
    }
    
    render() {
        return (
            <div className={css(styles.app)}>
                <MyLabel message="Ni hao!" />
                <NewsList stories={this.state.stories} />
            </div>
        )
    }
    
    componentWillMount() {
        fetch('/rss')
            .then(res => res.json())
            .then((json) => {
                this.setState({
                    stories: json.data.map((_) => ({ title: _ }))
                });
            });
    }
}

const styles = StyleSheet.create({
    app: {
        backgroundColor: 'green',
        border: '2px solid blue',
    }
});
