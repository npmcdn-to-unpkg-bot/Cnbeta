import { StyleSheet, css } from 'aphrodite';

import NewsEntry from './NewsEntry';

export default ({ entries }) => {
    return (
        <ul className={css(styles.container)}>
            {entries.map((entry, idx) => <NewsEntry entry={entry} />)}
        </ul>
    )
}

const styles = StyleSheet.create({
    container: {
    },
});