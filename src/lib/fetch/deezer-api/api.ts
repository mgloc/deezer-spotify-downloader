/* eslint-disable @typescript-eslint/no-explicit-any */
import { type User, type Playlist, type Track, Status } from '../types';
import axios, { type AxiosResponse } from 'axios';

const getStatus = (response: AxiosResponse): Status => {
	if (response.status === 404) {
		return Status.NOT_FOUND;
	} else if (response.status === 500) {
		return Status.INTERNAL_SERVER_ERROR;
	} else {
		const data = response.data;
		if (data.error !== undefined) {
			return Status.NOT_FOUND;
		}
		return Status.OK;
	}
};

export const fetchUser = async (id: string): Promise<User> => {
	const response = await axios.get(`https://api.deezer.com/user/${id}`);
	if (getStatus(response) !== Status.OK) {
		throw new Error(getStatus(response));
	}
	const data = response.data;
	return {
		id: data.id,
		name: data.name,
		image_url: data.picture_medium
	};
};

export const fetchUserPlaylists = async (id: string): Promise<Playlist[]> => {
	const response = await axios.get(`https://api.deezer.com/user/${id}/playlists`);
	if (getStatus(response) !== Status.OK) {
		throw new Error(getStatus(response));
	}
	const data = response.data;
	return data.data.map((playlist: any) => ({
		id: playlist.id,
		name: playlist.title,
		image_url: playlist.picture_medium,
		track_count: playlist.nb_tracks
	}));
};

export const fetchPlaylist = async (id: string): Promise<Playlist> => {
	const response = await axios.get(`https://api.deezer.com/playlist/${id}`);
	if (getStatus(response) !== Status.OK) {
		throw new Error(getStatus(response));
	}
	const data = response.data;
	return {
		id: data.id,
		name: data.title,
		image_url: data.picture_medium,
		track_count: data.nb_tracks
	};
};

export const fetchTrack = async (id: string): Promise<Track> => {
	const response = await axios.get(`https://api.deezer.com/track/${id}`);
	if (getStatus(response) !== Status.OK) {
		throw new Error(getStatus(response));
	}
	const data = response.data;
	return {
		id: data.id,
		name: data.title,
		image_url: data.picture_medium,
		preview_url: data.preview
	};
};

export const fetchPlaylistTracks = async (id: string): Promise<Track[]> => {
	const response = await axios.get(`https://api.deezer.com/playlist/${id}`);
	if (getStatus(response) !== Status.OK) {
		throw new Error(getStatus(response));
	}
	const data = response.data.tracks;
	return data.data.map((track: any) => ({
		id: track.id,
		name: track.title,
		image_url: track.album.cover
	}));
};

export const searchTracks = async (query: string): Promise<Track[]> => {
	const response = await axios.get(`https://api.deezer.com/search?q=track:"${query}"`);
	if (getStatus(response) !== Status.OK) {
		throw new Error(getStatus(response));
	}
	const data = response.data;
	return data.data.map((track: any) => ({
		id: track.id,
		name: track.title,
		image_url: track.album.cover
	}));
};
