import React from 'react';
import {observer} from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';

const createMarkup = (html) => ({__html: html});

const close = (onClose, evt) => {
    evt.preventDefault();
    onClose();
}

class NewsDetails extends React.Component {
    render() {
        const {entry, onClose} = this.props;
        const onClick = close.bind(null, onClose);

        return (
            <div>
                <h2 className={css(styles.title)}>{entry.title}</h2>
                <div dangerouslySetInnerHTML={createMarkup(entry ? entry.summary : "")}></div>
                <a href="#" className={css(styles.closeButton)} onClick={onClick}>Back</a>
            </div>
        )
    }
}

export default observer(NewsDetails);

const styles = StyleSheet.create({
    title: {
        marginTop: 0,
    },
    closeButton: {
        textDecoration: 'none',
        fontSize: '20px',
        marginTop: '10px',
        padding: '10px',
        display: 'block',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#E71D36',
    }
});