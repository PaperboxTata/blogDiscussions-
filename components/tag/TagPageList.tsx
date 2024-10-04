import dynamic from 'next/dynamic';
import Wait from '../Wait';

export default function TagPageList({ params }: { params: any }) {

    const PageList = params.type == "post" ? dynamic(() => import('@/components/post/PostPageList'), {
        loading: () => <><Wait /></>
    }) : dynamic(() => import('@/components/note/NotePageList'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <div className="flex flex-col page-height">
                <div className="flex justify-center">
                    <div className="w-3/4 pt-4">
                        <div className="text-2xl">🔖标签:{params.tag}</div>
                    </div>
                </div>
                <PageList params={{ start_cursor: params.start_cursor }} tag={params.tag} />
            </div>
        </>
    );
}