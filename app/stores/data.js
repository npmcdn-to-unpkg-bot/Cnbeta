import {observable} from 'mobx';

export default class Store {
    constructor(service) {
        this._servce = service;
        this.loading = observable(false);
        this.entries = observable([]);
        this.visitedEntryIds = observable([]);
        this.updated = observable("");
        this.selectedEntry = observable(null);
    }

    setSelectedEntry(selectedEntry) {
        this.selectedEntry.set(selectedEntry);
        if (selectedEntry) {
            const {id} = selectedEntry;
            this._servce.updateHistory(null, null);
            this._servce.saveVisitedEntryId(id);
            if (this.visitedEntryIds.indexOf(id) < 0) {
                this.visitedEntryIds.push(id);
            }
        }
    }

    navigateBack() {
        this._servce.goBackHistory();
    }

    refresh() {
        this.loading.set(true);

        this._servce.fetchData()
            .then((json) => {
                const {error, data} = json;
                if (error) {
                    // TODO: update error property
                } else {
                    const {entries, updated} = data;
                    this.updated.set(updated);
                    this.entries.push(...entries);
                    const visitedEntryIds = this._servce.updateVisitedEntryIds(entries.map((entry) => entry.id));
                    this.visitedEntryIds.push(...visitedEntryIds);
                }
                this.loading.set(false);
            })
            .catch(() => {
                this.loading.set(false);
            });
    }
}