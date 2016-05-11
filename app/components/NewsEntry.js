import React from 'react';
import {observer} from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';

const createMarkup = (html) => ({__html: html});

const toggleTitle = (props, event) => {
    event.preventDefault();
    const {entry, onClick} = props;
    onClick(entry);
};

class NewEntry extends React.Component {
    render() {
        const {entry, visited} = this.props;

        const titleClassName = visited
            ? css(styles.title, styles.titleVisited)
            : css(styles.title);

        return (
            <li className={css(styles.container)}>
                <a className={titleClassName} href="#" onClick={toggleTitle.bind(null, this.props)}>{entry.title}</a>
            </li>
        )
    }
}

export default observer(NewEntry);

const borderColoer = '#E71D36';

const styles = StyleSheet.create({
    container: {
        border: `2px dashed ${borderColoer}`,
        borderBottomWidth: '0',
        margin: '0',
        ':last-child': {
            borderBottomWidth: '2px',
        },
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px',
        textDecoration: 'none',
        padding: '2px 6px',
    },
    titleVisited: {
        color: 'gray'
    },
    summary: {
        padding: '10px'
    }
});