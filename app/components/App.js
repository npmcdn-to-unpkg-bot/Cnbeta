import {observer} from 'mobx-react';
import {StyleSheet, css} from 'aphrodite';

import LoadingIndicator from '../components/LoadingIndicator';
import NewsList from '../components/NewsList';

const convertLocalDateString = (utc) => {
    const date = new Date(utc);
    return date.toLocaleString();
}

export default observer(function App({dataStore}) {
    const lastUpdated = convertLocalDateString(dataStore.updated.get());
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
            <div>
                <NewsList entries={dataStore.entries} />
                <div className={css(styles.lastUpdated)}>News updated @ {lastUpdated}</div>
            </div>
        );
    }

    return (
        <div className={css(styles.app)}>
            {content}
        </div>
    )
});

const styles = StyleSheet.create({
    app: {
        padding: '5px',
    },
    lastUpdated: {
        textAlign: 'right',
        fontSize: '12px',
        padding: '2px 0 0',
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
