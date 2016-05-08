import React from 'react';
import {observer} from 'mobx-react';

import NewsEntry from './NewsEntry';

class NewsList extends React.Component {
    render() {
        const {dataStore} = this.props;
        const {entries, visitedEntryIds} = dataStore;
        return (
            <ul>
                {dataStore.entries.map(
                    (entry, idx) => (
                        <NewsEntry
                            key={entry.id}
                            entry={entry}
                            visited={visitedEntryIds.indexOf(entry.id) >= 0}
                            onClick={(theEntry) => dataStore.setSelectedEntry(theEntry)}
                        />
                    )
                )}
            </ul>
        )
    }
}

export default observer(NewsList);