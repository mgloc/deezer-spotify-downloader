// Vitest
import { describe, it, expect } from 'vitest';
// Functions to test
import { searchForYoutubeVideo, downloadAudioFromVideo } from './api';
import fs from 'fs';

import type { YoutubeVideo } from '../types';

describe('Youtube API', async () => {
	const testQuery = 'Gagnam Style';
	const testDownload: YoutubeVideo = { id: 'JXAVxbfsv0Q', title: 'three_second_video' };

	it(`search youtube video`, async () => {
		const video = await searchForYoutubeVideo(testQuery);
		expect(video).toBeTruthy();
	});

	it(`download audio from youtube video`, async () => {
		const outputPath = './downloads/test.mp4';
		downloadAudioFromVideo(testDownload, outputPath);
		// Expect a none empty file to be created at outputPath
		expect(fs.readFileSync(outputPath).length).toBeGreaterThan(-1);
	});
});
