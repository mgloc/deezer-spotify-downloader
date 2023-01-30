import type { User, Playlist, Tracks } from '../types';

export const fetchUser = async (id: string): Promise<User> => {
	const response = await fetch(`https://api.deezer.com/user/${id}`);
	const data = await response.json();
	return {
		id: data.id,
		name: data.name,
		image_url: data.picture_medium
	};
};
