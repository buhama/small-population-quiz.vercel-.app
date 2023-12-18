import { Slider } from '@/components/ui/slider';
import { RandomTrueValues, TrueValues } from '@/data/data';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
					<p className='mb-8 text-sm'>
						Idea From:{' '}
						<Link
							href='https://twitter.com/rauchg/status/1736810488674365856'
							target='_blank'
							className='text-blue-500 hover:underline cursor-pointer'
						>
							@rauchg
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
							<div className='flex gap-4 mb-8'>
								<div className='flex gap-2 text-sm items-center'>
									<p>Your Prediction:</p>{' '}
									<div className='h-3 w-3 bg-blue-500 rounded-full'></div>
								</div>
								<div className='flex gap-2 text-sm items-center'>
									<p> Actual:</p>
									<div className='h-3 w-3 bg-green-500 rounded-full'></div>
								</div>
							</div>
							<div className='relative w-full'>
								<div className='relative w-full rounded-full h-2 bg-secondary'>
									<div
										className='flex items-center absolute h-3 w-3'
										style={{ left: `calc(${prediction}% - 8px)` }}
									>
										<div className=' h-3 w-3 absolute bg-blue-500 rounded-full'></div>
										<p
											className={
												Number(prediction) < Number(selected[1])
													? '-ml-8'
													: 'ml-4'
											}
										>
											{prediction}%
										</p>
									</div>
									<div
										className='flex items-center absolute h-3 w-3'
										style={{ left: `calc(${selected[1]}% - 8px)` }}
									>
										<div className='absolute h-3 w-3 bg-green-500 rounded-full'></div>
										<p
											className={
												Number(prediction) > Number(selected[1])
													? '-ml-8'
													: 'ml-6'
											}
										>
											{selected[1]}%
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
				</>
			)}
		</main>
	);
}
