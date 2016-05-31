import React from 'react';
import {StyleSheet, css} from 'aphrodite';

import LoadingIndicator from './LoadingIndicator';

export default class Loadable extends React.Component {
    render() {
        const {loading, indicatorSize, children} = this.props;
        const content = loading
            ?   <div className={`${css(styles.indicatorContainer)} loadingindicatorcontainer`}>
                    <LoadingIndicator size={indicatorSize} />
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