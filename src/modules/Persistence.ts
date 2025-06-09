import { openDB } from 'idb';
import { State } from '../store/useEditorStore';

const DB_NAME = 'minecraft-skin-editor';
const STORE_NAME = 'editor-state';
const KEY = 'current';

export async function saveState(state: Partial<State>) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  await db.put(STORE_NAME, state, KEY);
}

export async function loadState(): Promise<Partial<State> | undefined> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  return await db.get(STORE_NAME, KEY);
}