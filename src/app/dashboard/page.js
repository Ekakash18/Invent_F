/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    router.push('/dashboard/reports');
    return (
        <div>
            Loading...
        </div>
    );
};

export default page;