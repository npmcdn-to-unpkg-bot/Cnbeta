import { StyleSheet, css } from 'aphrodite';

import NewsEntry from './NewsEntry';

export default ({ entries }) => {
    return (
        <ul className={css(styles.container)}>
            {entries.map((entry, idx) => <NewsEntry entry={entry} isLast={idx===entries.length-1} />)}
        </ul>
    )
}

const styles = StyleSheet.create({
    container: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
});