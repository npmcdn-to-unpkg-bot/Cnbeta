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
                <h2>{entry.title}</h2>
                <div dangerouslySetInnerHTML={createMarkup(entry ? entry.summary : "")}></div>
                <a href="#" className={css(styles.closeButton)} onClick={onClick}>Back</a>
            </div>
        )
    }
}

export default observer(NewsDetails);

const styles = StyleSheet.create({
    closeButton: {
        textDecoration: 'none',
        fontSize: '22px',
        marginTop: '6px',
        padding: '4px',
        display: 'block',
        textAlign: 'center',
        color: '#E71D36',
        border: `2px solid #E71D36`,
    }
});