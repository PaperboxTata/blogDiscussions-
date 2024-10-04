import Wait from '@/components/Wait';
import dynamic from 'next/dynamic';

export default function Page({ params }: { params: any }) {
    const TagPageList = dynamic(() => import('@/components/tag/TagPageList'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <TagPageList params={params} />
        </>
    );
}