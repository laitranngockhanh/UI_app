// ============================================================
// music-db.js - Toàn bộ logic IndexedDB cho Music App
// ============================================================

const DB_NAME = 'MusicAppDB';
const DB_VERSION = 1;
let db;
let songs = [];
let albums = [];

function initIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            db.createObjectStore('songs', { keyPath: 'song_id' });
            db.createObjectStore('albums', { keyPath: 'id' });
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

function saveToIndexedDB(storeName, data) {
    return new Promise((resolve, reject) => {
        if (!db) {
            resolve();
            return;
        }

        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        const isValidData = (item) => {
            if (storeName === 'songs') {
                return item && item.song_id && item.custom_name && item.localPath && item.songData instanceof Blob && item.songData.type.startsWith('audio/');
            } else if (storeName === 'albums') {
                return item && item.id && item.album_name && item.album_name.trim() !== '' && Array.isArray(item.songs);
            }
            return false;
        };

        if (!data || (Array.isArray(data) && data.length === 0)) {
            resolve();
            return;
        }

        if (Array.isArray(data)) {
            const validData = data.filter(isValidData);
            if (validData.length === 0) {
                resolve();
                return;
            }
            validData.forEach(item => {
                if (storeName === 'albums') {
                    item.songs = item.songs.filter(song => song && song.song_id && songs.find(s => s.song_id === song.song_id)?.localPath);
                }
                store.put(item);
            });
        } else {
            if (!isValidData(data)) {
                resolve();
                return;
            }
            if (storeName === 'albums') {
                data.songs = data.songs.filter(song => song && song.song_id && songs.find(s => s.song_id === song.song_id)?.localPath);
            }
            store.put(data);
        }

        transaction.oncomplete = () => {
            resolve();
        };
        transaction.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

function loadFromIndexedDB(storeName) {
    return new Promise((resolve, reject) => {
        if (!db) {
            resolve([]);
            return;
        }

        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = (event) => resolve(event.target.result || []);
        request.onerror = (event) => reject(event.target.error);
    });
}

function deleteFromIndexedDB(storeName, key) {
    return new Promise((resolve, reject) => {
        if (!db) {
            resolve();
            return;
        }

        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onsuccess = () => {
            resolve();
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

async function clearIndexedDB(storeName) {
    try {
        if (!db) await initIndexedDB();
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
        showNotification(`Đã xóa ${storeName} khỏi thiết bị`, 'success');
    } catch (error) {
        showNotification(`Không thể xóa ${storeName}: ${error.message}`, 'error');
    }
}

async function clearAllIndexedDB() {
    await clearIndexedDB('songs');
    await clearIndexedDB('albums');
    songs = [];
    albums = [];
    updateSongList();
    displayAlbumsList();
}

// Hàm kiểm tra và làm mới dữ liệu trong IndexedDB nếu cần
async function refreshIndexedDBIfNeeded() {
    const isOnline = navigator.onLine;
    const isLoggedIn = !!localStorage.getItem('auth_token');

    if (isOnline && isLoggedIn) {
        const existingSongs = await loadFromIndexedDB('songs');
        if (existingSongs.length > 0 && existingSongs.some(song => !song.custom_artist)) {
            showNotification('Đang làm mới dữ liệu...', 'info');
            await clearIndexedDB('songs');
            const songsFromAPI = await fetchAPI('/songs');
            const songsToSave = songsFromAPI.filter(song =>
                song.localPath && song.songData instanceof Blob && song.songData.type.startsWith('audio/')
            );
            if (songsToSave.length > 0) {
                await saveToIndexedDB('songs', songsToSave);
                showNotification('Đã làm mới dữ liệu bài hát trong thiết bị.', 'info');
            }
        }
    }
}
