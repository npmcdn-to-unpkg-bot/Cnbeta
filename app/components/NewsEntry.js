import React from 'react';
import {observer} from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';

const createMarkup = (html) => ({__html: html});

class NewEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = { opened: false };
    }

    render() {
        const {entry} = this.props;
        const {opened} = this.state;

        const titleClassName = opened
            ? css(styles.title, styles.titleOpened)
            : css(styles.title);

        const summary = opened
            ? <div className={css(styles.summary)} dangerouslySetInnerHTML={createMarkup(entry.summary)}></div>
            : null;

        return (
            <li className={css(styles.container)}>
                <a className={titleClassName} href="#" onClick={this.toggleTitle.bind(this)}>{entry.title}</a>
                {summary}
            </li>
        )
    }

    toggleTitle(event) {
        event.preventDefault();
        const { opened } = this.state;
        this.setState({ opened: !opened });
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
    titleOpened: {
        border: `0 dashed ${borderColoer}`,
        borderBottomWidth: '2px',
        backgroundColor: '#FFE066',
    },
    summary: {
        padding: '10px'
    }
});