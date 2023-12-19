import { Slider } from '@/components/ui/slider';
import { RandomTrueValues, TrueValues } from '@/data/data';
import { applyMargin, numberIsInMiddle } from '@/lib/utils';
import { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const generateMetadata = async (): Promise<Metadata> => {
	return {
		title: 'Small Quiz',
		description:
			'Do you know the true values of small subgroups of the US? You might be surprised.',
		themeColor: '#7E22CE',
		publisher: 'Hassan Ahmed',
		openGraph: {
			title: 'Small Quiz',
			// description: description,
			images: [
				{
					url: 'https://small-population-quiz-buhama.vercel.app/small_pop_quiz.png',
					width: 1200,
					height: 1200,
					alt: 'OG image',
				},
			],
			siteName: 'Small Quiz',
		},
		twitter: {
			creator: '@buhama_',
			site: '@buhama_',
			card: 'summary_large_image',
			title: 'Small Quiz',
			description:
				'Do you know the true values of small subgroups of the US? You might be surprised.',
			images: [
				'https://small-population-quiz-buhama.vercel.app/small_pop_quiz.png',
			],
		},
	};
};

export default function Home({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { page: string; prediction: string };
}) {
	const page = Number(searchParams.page || 0);
	const data = RandomTrueValues;
	const selected = Object.entries(data)[page];
	const prediction =
		Number(searchParams.prediction) || Number(searchParams.prediction) === 0
			? Number(searchParams.prediction)
			: null;

	const submitAnswer = async (formData: FormData) => {
		'use server';
		console.log(formData);

		const prediction = formData.get('slider');

		console.log(prediction);
		redirect(`/?page=${page}&prediction=${prediction}`);
	};

	return (
		<main className='flex min-h-screen flex-col md:p-24 p-10 pt-24 w-full text-center items-center gap-2 font-mono'>
			<p className='-ml-8 hidden'>Ghost div</p>
			<p className='ml-4 hidden'>Ghost div</p>
			{page >= 45 && (
				<div className='mb-8 text-sm'>
					<p>
						Source:{' '}
						<Link
							href='https://today.yougov.com/politics/articles/41556-americans-misestimate-small-subgroups-population'
							target='_blank'
							className='text-blue-500 hover:underline cursor-pointer'
						>
							YouGov
						</Link>
					</p>
					<p className='text-sm'>
						Idea From:{' '}
						<Link
							href='https://twitter.com/rauchg/status/1736810488674365856'
							target='_blank'
							className='text-blue-500 hover:underline cursor-pointer'
						>
							@rauchg
						</Link>
					</p>
					<p className='mb-8 text-sm'>
						Website by:{' '}
						<Link
							href='https://twitter.com/buhama_'
							target='_blank'
							className='text-blue-500 hover:underline cursor-pointer'
						>
							@buhama_
						</Link>
					</p>
					<Link
						href={'/?page=0'}
						className='bg-purple-100 w-fit rounded-lg p-2 font-bold font-mono mt-8'
					>
						Start Over
					</Link>
				</div>
			)}
			{page < 45 && (
				<>
					{' '}
					<p className='md:m-0 mb-5'>
						If you had to guess what percentage of American adults...
					</p>
					<p className='font-bold text-white bg-gray-600 px-8 p-2 rounded-full'>
						{selected[0]}?
					</p>
					{prediction === null && (
						<form action={submitAnswer} className='w-full'>
							<Slider
								defaultValue={[50]}
								max={100}
								step={1}
								name='slider'
								className='mt-5'
							/>
							<button
								type='submit'
								className='bg-purple-100 w-fit rounded-lg p-2 font-bold font-mono mt-8'
							>
								Submit
							</button>
						</form>
					)}
					{(!!prediction || prediction === 0) && (
						<div className='flex flex-col gap-2 w-full items-center justify-center mt-5'>
							<div className='flex flex-col md:flex-row items-center justify-center gap-2 mb-8'>
								<div className='flex gap-2 text-sm items-center'>
									<p>Your Prediction:</p>{' '}
									<div className='h-3 w-3 bg-blue-500 rounded-full'></div>
									<p className='hidden md:block'>|</p>
								</div>
								<div className='flex gap-2 text-sm items-center'>
									<p> Actual:</p>
									<div className='h-3 w-3 bg-green-500 rounded-full'></div>
									<p className='hidden md:block'>|</p>
								</div>
								<div className='flex gap-2 text-sm items-center'>
									<p> What People Think:</p>
									<div className='h-3 w-3 bg-amber-500 rounded-full'></div>
								</div>
							</div>
							<div className='relative w-full'>
								<div className='relative w-full rounded-full h-2 bg-white'>
									<div
										className={`items-center absolute h-3 w-3 ${
											numberIsInMiddle(prediction, [
												prediction,
												selected[1][0],
												selected[1][1],
											])
												? 'flex'
												: 'hidden'
										}`}
										style={{ left: `calc(${prediction}% - 8px)` }}
									>
										<p className={'text-blue-500'}>{prediction}%</p>
									</div>
									<div
										className={`items-center absolute h-3 w-3 ${
											numberIsInMiddle(selected[1][0], [
												prediction,
												selected[1][0],
												selected[1][1],
											])
												? 'flex'
												: 'hidden'
										}`}
										style={{ left: `calc(${selected[1][0]}% - 8px)` }}
									>
										<p className={'text-green-500'}>{selected[1][0]}%</p>
									</div>
									<div
										className={`items-center absolute h-3 w-3 ${
											numberIsInMiddle(selected[1][1], [
												prediction,
												selected[1][0],
												selected[1][1],
											])
												? 'flex'
												: 'hidden'
										}`}
										style={{ left: `calc(${selected[1][1]}% - 8px)` }}
									>
										<p className={'text-amber-500'}>{selected[1][1]}%</p>
									</div>
								</div>
							</div>
							<div className='relative w-full'>
								<div className='relative w-full rounded-full h-2 bg-secondary'>
									<div
										className={`flex items-center absolute h-3 w-3 `}
										style={{ left: `calc(${prediction}% - 8px)` }}
									>
										<div className=' h-3 w-3 absolute bg-blue-500 rounded-full'></div>
										<p
											className={`${applyMargin(prediction, [
												prediction,
												selected[1][0],
												selected[1][1],
											])} text-blue-500`}
										>
											{prediction}%
										</p>
									</div>
									<div
										className='flex items-center absolute h-3 w-3'
										style={{ left: `calc(${selected[1][0]}% - 8px)` }}
									>
										<div className='absolute h-3 w-3 bg-green-500 rounded-full'></div>
										<p
											className={`${applyMargin(selected[1][0], [
												prediction,
												selected[1][0],
												selected[1][1],
											])} text-green-500`}
										>
											{selected[1][0]}%
										</p>
									</div>
									<div
										className='flex items-center absolute h-3 w-3'
										style={{ left: `calc(${selected[1][1]}% - 8px)` }}
									>
										<div className='absolute h-3 w-3 bg-amber-500 rounded-full'></div>
										<p
											className={`${applyMargin(selected[1][1], [
												prediction,
												selected[1][0],
												selected[1][1],
											])} text-amber-500`}
										>
											{selected[1][1]}%
										</p>
									</div>
								</div>
							</div>

							<Link
								href={`/?page=${page + 1}`}
								className='bg-purple-100 w-fit rounded-lg p-2 font-bold font-mono mt-8'
							>
								Next Question -{'>'}
							</Link>
						</div>
					)}
					{/* <p className="text-4xl font-bold">{selected[0]}</p> */}
					<Link
						href='/credits'
						className='text-sm text-blue-500 hover:underline mt-20'
					>
						Credits
					</Link>
					<p>-</p>
					<p className='mt-8 text-sm'>
						Host parties and events on:{' '}
						<Link
							href='https://simpli.events'
							target='_blank'
							className='text-blue-500 hover:underline cursor-pointer'
						>
							Simpli Events
						</Link>
					</p>
					<p className='mb-8 text-sm'>Free Palestine 🇵🇸</p>
				</>
			)}
		</main>
	);
}
