import {observable} from 'mobx';

export default class Store {
    constructor(service) {
        this._servce = service;
        this.entries = observable(service.readEntries());
    }

    refresh() {
        this._servce.fetchData()
            .then((json) => {
                if (json.error) {
                    // TODO: update error property
                    return;
                }
                this.entries.push.apply(this.entries, json.data.entries);
            });
    }
}