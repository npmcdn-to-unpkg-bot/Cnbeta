import React from 'react';
import {observer} from 'mobx-react';

import Loadable from './Loadable';
import ReadingArea from './ReadingArea';

class App extends React.Component {
    render() {
        const {dataStore} = this.props;
        const loading = dataStore.loading.get();

        return (
            <Loadable loading={loading} indicatorSize="60px">
                <ReadingArea dataStore={dataStore} />
            </Loadable>
        )
    }
}

export default observer(App);
