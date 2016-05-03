import { StyleSheet, css } from 'aphrodite';

export default ({ entries }) => {
    const items = entries.map((entry) => {
       return (
           <li className={css(styles.entry, styles.oneliner)}>{entry.title}</li>
       ) 
    });
    return (
        <ul className={css(styles.container)}>
            {items}
        </ul>
    )
}

const styles = StyleSheet.create({
    container: {
        listStyleType: 'none',
        padding: '10px',
        margin: '0',
    },
    entry: {
        backgroundColor: 'green',
        height: '40px',
        lineHeight: '40px',
        border: '2px solid blue',
        margin: '2px',
        padding: '2px',
    },
    oneliner: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
});