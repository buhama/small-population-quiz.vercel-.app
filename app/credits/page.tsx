import Link from 'next/link';
import React from 'react';

const CreditsPage = () => {
	return (
		<div className='flex min-h-screen flex-col md:p-24 p-10 pt-24 w-full text-center items-center gap-2 font-mono'>
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
				<p>
					Website by
					<Link
						href='https://twitter.com/buhama_'
						target='_blank'
						className='text-blue-500 hover:underline cursor-pointer'
					>
						buhama_
					</Link>
				</p>
				<Link
					href={'/?page=0'}
					className='bg-purple-100 w-fit rounded-lg p-2 font-bold font-mono mt-8'
				>
					Go back to the quiz
				</Link>
			</div>
		</div>
	);
};

export default CreditsPage;
