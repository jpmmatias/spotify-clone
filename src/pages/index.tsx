import Head from 'next/head';
import GradientLayout from '../components/gradientLayout';

export default function Home() {
	return (
		<GradientLayout
			roundeImage
			subtitle='profile'
			title='João Pedro Matias'
			description='15 order playlists'
			color='purple'
		>
			<h1>Home page</h1>
		</GradientLayout>
	);
}
