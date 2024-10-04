import Wait from '@/components/Wait';
import dynamic from 'next/dynamic';
export default function Page({ params }: { params: { id: string } }) {
    const NotePage = dynamic(() => import('@/components/note/NotePage'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <NotePage id={params.id} />
        </>
    );
}