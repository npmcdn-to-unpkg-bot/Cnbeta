import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const createMarkup = (html) => ({__html: html});

export default class NewEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = { opened: false };
    }

    render() {
        const {entry, isLast} = this.props;
        const {opened} = this.state;

        const containerClassName = isLast
            ? css(styles.lastContainer)
            : css(styles.container);

        const titleClassName = opened
            ? css(styles.title, styles.titleOpened)
            : css(styles.title);

        const summary = opened
            ? <div className={css(styles.summary)} dangerouslySetInnerHTML={createMarkup(entry.summary)}></div>
            : null;

        return (
            <li className={containerClassName}>
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

const borderColoer = '#E71D36';

const containerStyle = {
    border: `2px dashed ${borderColoer}`,
    borderBottomWidth: '0',
    margin: '0',
};

const styles = StyleSheet.create({
    container: containerStyle,
    lastContainer: {
        ...containerStyle,
        borderBottomWidth: '2px',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px',
        textDecoration: 'none',
        padding: '2px 4px',
    },
    titleOpened: {
        border: `0 dashed ${borderColoer}`,
        borderBottomWidth: '2px',
        backgroundColor: '#FFE066',
    },
    summary: {
        padding: '0 10px'
    }
});