const entriesKey = "entries";

export default {
    saveEntries: (entries) => {
        localStorage.setItem(entriesKey, JSON.stringify(entries));
    },
    readEntries: () => {
        const item = localStorage.getItem(entriesKey);
        return item ? JSON.parse(item) : [];
    },
    fetchData: () => {
        return fetch('/rss').then(res => res.json());
    }
}