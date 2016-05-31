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
            ? `${css(styles.title)} visitedtitle`
            : css(styles.title);

        return (
            <li className={`${css(styles.container)} entrycontainer`}>
                <a className={titleClassName} href="#" onClick={toggleTitle.bind(null, this.props)}>{entry.title}</a>
            </li>
        )
    }
}

export default observer(NewEntry);

const styles = StyleSheet.create({
    container: {
        margin: '0',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px',
        textDecoration: 'none',
        padding: '2px 6px',
    },
    summary: {
        padding: '10px'
    }
});