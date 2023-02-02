import type { AxiosResponse } from 'axios';
import { Status } from './types';

export const getStatus = (response: AxiosResponse): Status => {
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
