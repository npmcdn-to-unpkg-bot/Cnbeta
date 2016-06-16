import React from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {StyleSheet, css} from 'aphrodite';

import Touchable from './Touchable';

const createMarkup = (html) => ({__html: html});

const close = (onClose, evt) => {
    evt.preventDefault();
    onClose();
};

const executeAction = (fn) => action(fn)();

class NewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.buttonsVisible = observable(false);
    }

    render() {
        const {entry, onClose} = this.props;
        const buttons = this.buttonsVisible.get()
            ?   <div className={css(styles.buttonsContainer)}>
                    <a href={entry.link} target="_blank" className={css(styles.goButton)}>Visit cnBeta</a>
                    <a href="#" className={css(styles.closeButton)} onClick={close.bind(null, onClose)}>Close</a>
                </div>
            :   null;

        return (
            <Touchable onRightSwipe={onClose}>
                <h2 className={css(styles.title)}>{entry.title}</h2>
                <div ref={(elm) => this._summary = elm} dangerouslySetInnerHTML={createMarkup(entry ? entry.summary : "")}></div>
                {buttons}
            </Touchable>
        )
    }

    componentDidMount() {
        const {contentDelay} = this.props;

        // It is critical to ensure smooth transition on mobile device
        const content = this._summary.querySelector('.content');
        content.style.display = "none";

        this._contentTimer = setTimeout(() => {
            content.style.display = "block";
            executeAction(() => this.buttonsVisible.set(true));
        }, contentDelay);
    }

    componentWillUnmount() {
        clearTimeout(this._contentTimer);
    }
}

export default observer(NewsDetails);

const buttonStyle = {
    textDecoration: 'none',
    fontSize: '20px',
    marginTop: '5px',
    padding: '10px',
    display: 'block',
    textAlign: 'center',
    color: 'white',
    borderRadius: '4px',
}

const styles = StyleSheet.create({
    title: {
        marginTop: 0,
    },
    buttonsContainer: {
        marginTop: '10px',
    },
    closeButton: {
        ...buttonStyle,
        backgroundColor: '#E71D36',
    },
    goButton: {
        ...buttonStyle,
        backgroundColor: '#2EC4B6'
    }
});