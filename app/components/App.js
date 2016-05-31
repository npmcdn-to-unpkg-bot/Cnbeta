import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, css} from 'aphrodite';

import Loadable from './Loadable';
import ReadingArea from './ReadingArea';

class App extends React.Component {
    render() {
        const {dataStore} = this.props;
        const loading = dataStore.loading.get();
        const theme = dataStore.theme.get();

        return (
            <div className={theme}>
                <Loadable loading={loading} indicatorSize="60px">
                    <ReadingArea dataStore={dataStore} />
                </Loadable>
            </div>
        )
    }
}

export default observer(App);