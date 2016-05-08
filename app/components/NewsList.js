import React from 'react';
import {observer} from 'mobx-react';

import NewsEntry from './NewsEntry';

const onEntryClick = (dataStore, entry) => {
    dataStore.selectedEntry.set(entry);
};

class NewsList extends React.Component {
    render() {
        const {dataStore} = this.props;
        return (
            <ul>
                {dataStore.entries.map(
                    (entry, idx) => <NewsEntry key={entry.id} entry={entry} onClick={onEntryClick.bind(null, dataStore)} />
                )}
            </ul>
        )
    }
}

export default observer(NewsList);