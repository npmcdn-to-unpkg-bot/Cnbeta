import React from 'react';

export default class Touchable extends React.Component {
    render() {
        return (
            <div ref={(elm) => this._root = elm}>
                {this.props.children}
            </div>
        )
    }

    componentDidMount() {
        const {onRightSwipe} = this.props;

        const addEventListeners = (listeners) => {
            Object.keys(listeners).forEach((eventName) => {
                this._root.addEventListener(eventName, listeners[eventName], false);
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
                    onRightSwipe();
                }
            },
        });
    }
}