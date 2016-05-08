import React from 'react';
import {observer} from 'mobx-react';

import NewsEntry from './NewsEntry';

const onEntryClick = (dataStore, entry) => {
    dataStore.setSelectedEntry(entry);
    history.pushState(null, null);
};

class NewsList extends React.Component {
    render() {
        const {dataStore} = this.props;
        const {entries, visitedEntryIds} = dataStore;
        return (
            <ul>
                {dataStore.entries.map(
                    (entry, idx) => {
                        return (
                            <NewsEntry
                                key={entry.id}
                                entry={entry}
                                visited={visitedEntryIds.indexOf(entry.id) >= 0}
                                onClick={onEntryClick.bind(null, dataStore)}
                            />
                        )
                    }
                )}
            </ul>
        )
    }
}

export default observer(NewsList);