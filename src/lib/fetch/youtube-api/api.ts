import ytdl from 'ytdl-core';
import ytsr from 'ytsr';
import fs from 'fs';

import type { YoutubeVideo } from '../types';
import { Status } from '../types';
import { expect } from 'vitest';

export async function searchForYoutubeVideo(query: string): Promise<YoutubeVideo> {
	const filters = await ytsr.getFilters(query);
	const filter = filters.get('Type')?.get('Video');
	if (!filter || !filter.url) {
		throw new Error(Status.NOT_FOUND);
	}
	const searchResults = await ytsr(filter.url, { limit: 1 });
	const firstVideo = searchResults.items[0];
	if (!firstVideo) {
		throw new Error(Status.NOT_FOUND);
	}
	if (firstVideo.type !== 'video') {
		throw new Error(Status.NOT_FOUND);
	}
	return {
		id: firstVideo.id,
		title: firstVideo.title
	};
}

export async function downloadAudioFromVideo(video: YoutubeVideo, outputPath: string) {
	const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
	ytdl(videoUrl, {
		quality: 'highestaudio'
	})
		.pipe(fs.createWriteStream(outputPath))
		.on('finish', () => {
			console.log('Finished downloading audio');
		});
}
