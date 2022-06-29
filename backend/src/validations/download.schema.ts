import * as yup from 'yup';

export const downloadFileSchema = yup.object({
	query: yup.object({
		path: yup.string().max(90).required(),
	}),
});

export type DownloadFileInput = yup.InferType<
	typeof downloadFileSchema
>['query'];
