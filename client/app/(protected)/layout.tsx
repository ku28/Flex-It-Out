'use client';
import { FC, useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/global/loading';

interface ProtectedLayoutProps {
    children: React.JSX.Element;
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return router.push('/auth');
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return <Loading />;
    }

    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default ProtectedLayout;