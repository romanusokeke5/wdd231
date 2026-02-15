const KEY = 'amd_bookmarks';

export function loadProgress() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProgress(id) {
  const current = loadProgress();
  if (!current.includes(id)) {
    current.push(id);
    localStorage.setItem(KEY, JSON.stringify(current));
  }
}