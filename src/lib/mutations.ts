import fetcher from './fetcher';

export const auth = (
	mode: 'signIn' | 'signUp',
	body: { email: string; password: string; name?: string }
) => {
	return fetcher(`/${mode}`, body);
};
