export interface IContext {
	user: string;
	label?: string | null;
	requestID?: string | null;
	request?: object | null;
	response?: object | null;
	error?: object | null;
}
