import React from 'react';
import {observer} from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';

const createMarkup = (html) => ({__html: html});

const close = (onClose, evt) => {
    evt.preventDefault();
    onClose();
};

class NewsDetails extends React.Component {
    render() {
        const {entry, onClose} = this.props;
        return (
            <div ref={(c) => this._root = c}>
                <h2 className={css(styles.title)}>{entry.title}</h2>
                <div dangerouslySetInnerHTML={createMarkup(entry ? entry.summary : "")}></div>
                <div className={css(styles.buttonsContainer)}>
                    <a href={entry.link} target="_blank" className={css(styles.goButton)}>Visit cnBeta</a>
                    <a href="#" className={css(styles.closeButton)} onClick={close.bind(null, onClose)}>Close</a>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const {onClose} = this.props;

        const addEventListeners = (listeners) => {
            Object.keys(listeners).forEach((eventName) => {
                this._root.addEventListener(eventName, listeners[eventName], false);
            });
        };

        let startPoint;

        addEventListeners({
            'touchstart': (evt) => {
                startPoint = {
                    x: evt.changedTouches[0].clientX,
                    timeStamp: evt.timeStamp
                };
            },
            'touchend': (evt) => {
                const endPoint = {
                    x: evt.changedTouches[0].clientX,
                    timeStamp: evt.timeStamp
                };
                const xDistance = endPoint.x - startPoint.x;
                const duration = endPoint.timeStamp - startPoint.timeStamp;
                if (Math.abs(xDistance) > 60 && duration < 150) {
                    onClose();
                }
            },
        });
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