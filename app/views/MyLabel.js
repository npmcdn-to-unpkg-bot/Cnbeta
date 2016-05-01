import * as React from 'react';
export default class Label extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("span", null, "foobar"));
    }
}
