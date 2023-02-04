export type User = {
	id: string;
	name: string;
	image_url?: string;
};
export type Playlist = {
	id: string;
	name: string;
	image_url?: string;
	track_count?: number;
};
export type Track = {
	id: string;
	name: string;
	image_url?: string;
	preview_url?: string;
};

export enum Status {
	OK = 'OK',
	NOT_FOUND = 'NOT_FOUND',
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export type YoutubeVideo = {
	id: string;
	title: string;
};
