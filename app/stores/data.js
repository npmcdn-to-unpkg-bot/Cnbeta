import {observable} from 'mobx';

export default class Store {
    constructor(service) {
        this._servce = service;
        this.loading = observable(false);
        this.entries = observable(service.readEntries());
        this.updated = observable("");
        this.selectedEntry = observable(null);
    }

    refresh() {
        this.loading.set(true);

        this._servce.fetchData()
            .then((json) => {
                const { error, data } = json;
                if (error) {
                    // TODO: update error property
                } else {
                    this.entries.push.apply(this.entries, data.entries);
                    this.updated.set(data.updated);
                }
                this.loading.set(false);
            })
            .catch(() => {
                this.loading.set(false);
            });
    }
}