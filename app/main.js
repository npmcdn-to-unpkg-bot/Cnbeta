import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import service from './service';
import DataStore from './stores/data';

require('./stylesheets/common.css');

const setSelectedEntryFromUri = (store) => {
    const entryId = location.hash.slice(1);
    store.setSelectedEntryById(entryId);
}

const dataStore = new DataStore(service);
dataStore.refresh(() => {
    setSelectedEntryFromUri(dataStore);
});

window.addEventListener('hashchange', (e) => {
    setSelectedEntryFromUri(dataStore);
});

ReactDOM.render(<App dataStore={dataStore} />, document.getElementById('root'));
