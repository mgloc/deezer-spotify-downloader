// Vitest
import { describe, it, expect } from 'vitest';
import { expectTypeOf } from 'vitest';

// Functions to test
import { fetchUser, fetchPlaylist, fetchTrack } from './api';

// Types to test
import { type User, type Playlist, type Track, Status } from '../types';

describe('Deezer API', async () => {
	const validUserId = '2278880688';
	const invalidUserId = '0';

	const validPlaylistId = '10165637682';
	const invalidPlaylistId = '0';

	const validTrackId = '3135556';
	const invalidTrackId = '0';

	// Tests on fetchUser
	it(`fetch user ${validUserId} and expect results`, async () => {
		const user = await fetchUser(validUserId);
		expectTypeOf(user).toEqualTypeOf<User>();
		expect(user.id).toBe(2278880688);
		expect(user.name).toBe('Matteo');
	});

	it(`fetch user ${invalidUserId} and expect error`, async () => {
		expect(fetchUser(invalidUserId)).rejects.toThrow(Status.NOT_FOUND);
	});

	// Tests on fetchPlaylist
	it(`fetch playlist ${validPlaylistId} and expect results`, async () => {
		const playlist = await fetchPlaylist('10165637682');
		expectTypeOf(playlist).toEqualTypeOf<Playlist>();
		expect(playlist.id).toBe(10165637682);
		expect(playlist.name).toBe('Bangers');
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
});
