import { Slider } from '@/components/ui/slider';
import { TrueValues } from '@/data/data';

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
	const data = TrueValues;
	const selected = Object.entries(data)[page];
	const prediction = Number(searchParams.prediction) || null;

	const submitAnswer = async (formData: FormData) => {
		'use server';
		console.log(formData);

		const prediction = formData.get('slider');

		console.log(prediction);
		redirect(`/?page=${page}&prediction=${prediction}`);
	};

	return (
		<main className='flex min-h-screen flex-col p-24 w-full text-center items-center gap-2 font-mono'>
			<p>If you had to guess what percentage of American adults...</p>
			<p className='font-bold'>{selected[0]}</p>
			{!prediction && (
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
						className='bg-purple-100 w-fit rounded-lg p-2 font-bold font-mono mt-4'
					>
						Submit
					</button>
				</form>
			)}

			{prediction && (
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
										Number(prediction) < Number(selected[1]) ? '-ml-8' : 'ml-4'
									}
								>
									{prediction}
								</p>
							</div>
							<div
								className='flex items-center absolute h-3 w-3'
								style={{ left: `calc(${selected[1]}% - 8px)` }}
							>
								<div className='absolute h-3 w-3 bg-green-500 rounded-full'></div>
								<p
									className={
										Number(prediction) > Number(selected[1]) ? '-ml-4' : 'ml-8'
									}
								>
									{selected[1]}
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
		</main>
	);
}
