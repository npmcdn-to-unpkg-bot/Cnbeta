import React from 'react';
import {observer} from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';

const createMarkup = (html) => ({__html: html});

class NewEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {read: false};
    }

    render() {
        const {entry} = this.props;
        const {read} = this.state;

        const titleClassName = read
            ? css(styles.title, styles.titleRead)
            : css(styles.title);

        return (
            <li className={css(styles.container)}>
                <a className={titleClassName} href="#" onClick={this.toggleTitle.bind(this)}>{entry.title}</a>
            </li>
        )
    }

    toggleTitle(event) {
        event.preventDefault();
        const {entry, onClick} = this.props;
        this.setState({read: true});
        onClick(entry);
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
    titleRead: {
        color: 'gray'
    },
    summary: {
        padding: '10px'
    }
});