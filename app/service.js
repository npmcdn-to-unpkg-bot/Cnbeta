import request from './request';

const visitedEntryIdsKey = "visitedEntryIds";

const save = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
    }
};

const read = (key) => {
    return localStorage.getItem(key);
};

const getVisitedEntryIds = () => {
    const data = read(visitedEntryIdsKey);
    return data ? JSON.parse(data) : [];
};

const saveVisitedEntryIds = (entryIds) => save(visitedEntryIdsKey, JSON.stringify(entryIds));

const saveVisitedEntryId = (entryId) => {
    const ids = getVisitedEntryIds();
    if (ids.indexOf(entryId) < 0) {
        ids.push(entryId);
        saveVisitedEntryIds(ids);
    }
};

const updateVisitedEntryIds = (entryIds) => {
    const ids = getVisitedEntryIds().filter((id) => entryIds.indexOf(id) >= 0);
    saveVisitedEntryIds(ids);
    return ids;
};

const fetchData = () => request.get('/rss');

const updateHistory = (data, title, url) => {
    history.pushState(data, title, url);
};

const goBackHistory = () => {
    history.back();
};

export default {
    saveVisitedEntryId,
    updateVisitedEntryIds,
    fetchData,
    updateHistory,
    goBackHistory,
}