import Wait from '@/components/Wait';
import dynamic from 'next/dynamic';
export default function Page({ params }: { params: any }) {
    const Tag = dynamic(() => import('@/components/tag/Tag'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <Tag />
        </>
    );
}