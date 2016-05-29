import React from 'react';
import {StyleSheet, css} from 'aphrodite';

import LoadingIndicator from './LoadingIndicator';

const indicatorColor = '#E71D36';

export default class Loadable extends React.Component {
    render() {
        const {loading, indicatorSize, children, themeClassName} = this.props;
        const content = loading
            ?   <div className={`${css(styles.indicatorContainer)} ${themeClassName}`}>
                    <LoadingIndicator size={indicatorSize} color={indicatorColor} />
                </div>
            :   children;

        return (
            <div>
                {content}
            </div>
        )
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});