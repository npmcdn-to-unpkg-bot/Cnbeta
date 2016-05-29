import React from 'react';
import {observer} from 'mobx-react';

import Loadable from './Loadable';
import ReadingArea from './ReadingArea';

class App extends React.Component {
    render() {
        const {dataStore} = this.props;
        const loading = dataStore.loading.get();

        const themeClassName = 'dark'; //light

        return (
            <div className={themeClassName}>
                <Loadable loading={loading} indicatorSize="60px" themeClassName={themeClassName}>
                    <ReadingArea dataStore={dataStore} themeClassName={themeClassName}/>
                </Loadable>
            </div>
        )
    }
}

export default observer(App);
