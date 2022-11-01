import { createStore, action, debug } from 'easy-peasy';

export const store = createStore({
	activeSongs: [],
	activeSong: null,
	changeActiveSongs: action((state: any, payload: unknown) => {
		state.activeSongs = payload;
	}),
	changeActiveSong: action((state: any, payload: unknown) => {
		state.activeSong = payload;
	}),
});
