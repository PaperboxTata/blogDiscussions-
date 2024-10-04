import dynamic from "next/dynamic";
import Wait from "@/components/Wait";
export default function Note() {
    const NotePageList = dynamic(() => import('@/components/note/NotePageList'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <NotePageList params={null} tag={null} />
        </>
    );
}