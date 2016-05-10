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
        const {onClose, contentDelay} = this.props;
        const root = this._root;

        // It is effective to ensure smooth transition on mobile device
        const content = root.querySelector('.content');
        content.style.visibility = "hidden";
        this._contentTimer = setTimeout(() => {
            content.style.visibility = "visible";
        }, contentDelay);

        const addEventListeners = (listeners) => {
            Object.keys(listeners).forEach((eventName) => {
                root.addEventListener(eventName, listeners[eventName], false);
            });
        };

        let startPoint;

        addEventListeners({
            'touchstart': (evt) => {
                const touch = evt.changedTouches[0];
                startPoint = {
                    x: touch.clientX,
                    y: touch.clientY,
                    timeStamp: evt.timeStamp
                };
            },
            'touchend': (evt) => {
                const touch = evt.changedTouches[0];
                const endPoint = {
                    x: touch.clientX,
                    y: touch.clientY,
                    timeStamp: evt.timeStamp
                };
                const xDistance = endPoint.x - startPoint.x;
                const yDistance = endPoint.y - startPoint.y;
                const duration = endPoint.timeStamp - startPoint.timeStamp;
                //alert(`${Math.abs(yDistance)} ${xDistance} ${duration}`);
                if (Math.abs(yDistance) < 50 && xDistance > 80 && duration < 250) {
                    onClose();
                }
            },
        });
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