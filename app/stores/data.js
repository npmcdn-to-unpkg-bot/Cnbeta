import {useStrict, observable, action} from 'mobx';

useStrict(true);

export default class Store {
    constructor(service) {
        this._servce = service;
        this.loading = observable(false);
        this.entries = observable([]);
        this.visitedEntryIds = observable([]);
        this.updated = observable("");
        this.selectedEntry = observable(null);
        this.theme = observable("dark");
    }

    setSelectedEntryById(id) {
        action(() => {
            if (!id) {
                this.selectedEntry.set(null);
                return;
            }

            const entry = this.entries.find((entry) => entry.id === id);
            if (entry) {
                this.selectedEntry.set(entry);
                this._servce.saveVisitedEntryId(id);
                if (this.visitedEntryIds.indexOf(id) < 0) {
                    this.visitedEntryIds.push(id);
                }
            }
        })();
    }

    goHome() {
        location.hash = "";
    }

    refresh() {
        return action(() => {
            this.loading.set(true);
            return this._servce.fetchData()
                .then(action((json) => {
                    const {error, data} = json;

                    if (error) {
                        throw new Error(error);
                    }

                    const {entries, updated} = data;
                    this.updated.set(updated);
                    this.entries.push(...entries);
                    const visitedEntryIds = this._servce.updateVisitedEntryIds(entries.map((entry) => entry.id));
                    this.visitedEntryIds.push(...visitedEntryIds);
                    this.loading.set(false);
                }))
                .catch(action(() => {
                    this.loading.set(false);
                }));
        })();
    }
}