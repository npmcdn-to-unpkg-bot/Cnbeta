import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, css} from 'aphrodite';

import NewsList from './NewsList';
import NewsDetails from './NewsDetails';

const convertLocalDateString = (utc) => {
    const date = new Date(utc);
    return date.toLocaleString();
}

const closeDetails = (dataStore) => {
    dataStore.selectedEntry.set(null);
}

class ReadingArea extends React.Component {
    render() {
        const {dataStore} = this.props;
        const lastUpdated = convertLocalDateString(dataStore.updated.get());
        const selectedEntry = dataStore.selectedEntry.get();

        const column1 = !selectedEntry
            ?   <div className={css(styles.column1)}>
                    <NewsList dataStore={dataStore} />
                    <div className={css(styles.lastUpdated)}>News updated @ {lastUpdated}</div>
                </div>
            : null;

        const column2 = selectedEntry
            ?   <div className={css(styles.column2)}>
                    <NewsDetails entry={selectedEntry} onClose={closeDetails.bind(null, dataStore)} />
                </div>
            : null;

        return (
            <div className={css(styles.container)}>
                {column1}
                {column2}
            </div>
        )
    }
}

export default observer(ReadingArea);

const styles = StyleSheet.create({
    lastUpdated: {
        textAlign: 'right',
        fontSize: '12px',
        padding: '2px 0 0',
    },
    container: {
        //display: 'flex',
    },
    column1: {
    },
    column2: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: 'calc(100vw - 20px)',
        height: 'calc(100vh - 20px)',
        padding: '10px',
        backgroundColor: 'white',
        overflowY: 'auto'
    }
});