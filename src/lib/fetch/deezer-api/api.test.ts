// Vitest
import { describe, it, expect } from 'vitest';
import { expectTypeOf } from 'vitest';

// Functions to test
import {
	fetchUser,
	fetchUserPlaylists,
	fetchPlaylist,
	fetchTrack,
	fetchPlaylistTracks,
	searchTracks
} from './api';

// Types to test
import { type User, type Playlist, type Track, Status } from '../types';

describe('Deezer API', async () => {
	const validUserId = '2278880688';
	const invalidUserId = '0';

	const validPlaylistId = '3338949242';
	const invalidPlaylistId = '0';

	const validTrackId = '3135556';
	const invalidTrackId = '0';

	// Tests on fetchUser
	it(`fetch user ${validUserId} and expect results`, async () => {
		const user = await fetchUser(validUserId);
		expectTypeOf(user).toEqualTypeOf<User>();
		expect(user.id).toBe(parseInt(validUserId));
		expect(user.name).toBe('Matteo');
	});
	it(`fetch user ${invalidUserId} and expect error`, async () => {
		expect(fetchUser(invalidUserId)).rejects.toThrow(Status.NOT_FOUND);
	});

	// Tests on fetchUserPlaylists
	it(`fetch user playlists ${validUserId} and expect results`, async () => {
		const playlists = await fetchUserPlaylists(validUserId);
		expectTypeOf(playlists).toEqualTypeOf<Playlist[]>();
	});
	it(`fetch user playlists ${invalidUserId} and expect error`, async () => {
		expect(fetchUserPlaylists(invalidUserId)).rejects.toThrow(Status.NOT_FOUND);
	});

	// Tests on fetchPlaylist
	it(`fetch playlist ${validPlaylistId} and expect results`, async () => {
		const playlist = await fetchPlaylist(validPlaylistId);
		expectTypeOf(playlist).toEqualTypeOf<Playlist>();
		expect(playlist.id).toBe(parseInt(validPlaylistId));
		expect(playlist.name).toBe('chill lofi');
	});
	it(`fetch playlist ${invalidPlaylistId} and expect error`, async () => {
		expect(fetchPlaylist(invalidPlaylistId)).rejects.toThrow(Status.NOT_FOUND);
	});

	// Tests on fetchTracks
	it(`fetch track ${validTrackId} and expect results`, async () => {
		const track = await fetchTrack(validTrackId);
		expectTypeOf(track).toEqualTypeOf<Track>();
		expect(track.id).toBe(3135556);
		expect(track.name).toBe('Harder, Better, Faster, Stronger');
	});
	it(`fetch track ${invalidTrackId} and expect error`, async () => {
		expect(fetchTrack(invalidTrackId)).rejects.toThrow(Status.NOT_FOUND);
	});

	// Tests on fetchPlaylistTracks
	it(`fetch playlist tracks ${validPlaylistId} and expect results`, async () => {
		const tracks = await fetchPlaylistTracks(validPlaylistId);
		expectTypeOf(tracks).toEqualTypeOf<Track[]>();
	});

	// Tests on searchTracks
	it(`search tracks and expect results`, async () => {
		const tracks = await searchTracks('harder');
		expectTypeOf(tracks).toEqualTypeOf<Track[]>();
	});
	it(`search tracks and expect empty`, async () => {
		const tracks = await searchTracks('dzdzfezeezfz');
		expect(tracks).toEqual([]);
	});
});
