import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import service from './service';
import DataStore from './stores/data';

require('./stylesheets/common.css');

const dataStore = new DataStore(service);
dataStore.refresh();

ReactDOM.render(<App dataStore={dataStore} />, document.getElementById('root'));
