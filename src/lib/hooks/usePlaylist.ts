import useSWR from 'swr';
import fetcher from '../fetcher';

export const usePlaylist = () => {
	const { data, error } = useSWR('/playlists', fetcher);

	return {
		playlists: (data as any) || [],
		isLoading: !data && !error,
		isError: error,
	};
};
