import {observer} from 'mobx-react';
import {StyleSheet, css} from 'aphrodite';

import NewsList from '../components/NewsList';

export default observer(function App({dataStore}) {
    return (
        <div className={css(styles.app)}>
            <NewsList entries={dataStore.entries} />
        </div>
    )
});

const styles = StyleSheet.create({
    app: {
        padding: '5px'
    }
});
