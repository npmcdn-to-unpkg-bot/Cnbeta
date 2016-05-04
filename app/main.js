import ReactDOM from 'react-dom';

import App from './components/App';
import DataStore from './stores/data';

require('./stylesheets/common.css');

const dataStore = new DataStore();

fetch('/rss')
    .then(res => res.json())
    .then((json) => {
        dataStore.entries.push.apply(dataStore.entries, json.data.entries);
    });

ReactDOM.render(<App dataStore={dataStore} />, document.getElementById('root'));
