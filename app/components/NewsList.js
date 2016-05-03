import { StyleSheet, css } from 'aphrodite';

import NewsEntry from './NewsEntry';

export default ({ entries }) => {
    return (
        <ul className={css(styles.container)}>
            {entries.map((entry) => <NewsEntry entry={entry} />)}
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