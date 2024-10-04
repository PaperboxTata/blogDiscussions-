import dynamic from "next/dynamic";
import Wait from "@/components/Wait";
export default function Post({ params }: { params: { start_cursor: string } }) {
    const NotePageList = dynamic(() => import('@/components/note/NotePageList'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <NotePageList params={params} tag={null}/>
        </>
    );
}