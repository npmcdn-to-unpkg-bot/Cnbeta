import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, css} from 'aphrodite';

import LoadingIndicator from './LoadingIndicator';
import ReadingArea from './ReadingArea';

class App extends React.Component {
    render() {
        const {dataStore} = this.props;
        const loading = dataStore.loading.get();
        let content;

        if (loading) {
            content = (
                <div className={css(styles.indicatorContainer)}>
                    <LoadingIndicator size="60px"/>
                </div>
            );
        } else {
            content = (
                <ReadingArea dataStore={dataStore} />
            );
        }

        return (
            <div className={css(styles.app)}>
                {content}
            </div>
        )
    }
}

export default observer(App);

const styles = StyleSheet.create({
    app: {
        padding: '5px',
    },
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
