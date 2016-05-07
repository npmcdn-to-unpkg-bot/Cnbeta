import React from 'react';
import {observer} from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';

const createMarkup = (html) => ({__html: html});

const close = (onClose, evt) => {
    evt.preventDefault();
    onClose();
}

const createCloseButton = (onClick) => {
    return <a href="#" className={css(styles.closeButton)} onClick={onClick}>✖</a>
}

class NewsDetails extends React.Component {
    render() {
        const {entry, onClose} = this.props;
        const onClick = close.bind(null, onClose);

        return (
            <div>
                {createCloseButton(onClick)}
                <div dangerouslySetInnerHTML={createMarkup(entry ? entry.summary : "")}></div>
                {createCloseButton(onClick)}
            </div>
        )
    }
}

export default observer(NewsDetails);

const styles = StyleSheet.create({
    closeButton: {
        textDecoration: "none",
        fontSize: "28px",
        float: "right",
        color: "red",
        margin: "5px",
    }
});