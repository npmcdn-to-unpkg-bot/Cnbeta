import {observer} from 'mobx-react';

import NewsEntry from './NewsEntry';

export default observer(function NewsList({entries}) {
    return (
        <ul>
            {entries.map((entry, idx) => <NewsEntry entry={entry} />)}
        </ul>
    )
});