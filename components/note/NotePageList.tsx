import { getDiscussionsCount, getPaginationNote } from "@/api/personalRequest";
import NotionRenderer from "../NotionRenderer";
import notionClient from "@/api/notionClient";
import "@/components/css/notionNotePage.css"
import Link from "next/link";
import dynamic from "next/dynamic";
export default async function NotePageList({ params, tag }: { params: any, tag: string | null }) {
    const NoteComments = dynamic(() => import('./NoteComments'))
    const paginationNoteData = (await getPaginationNote(10, params ? params.start_cursor : undefined, tag) as any)
    const noteList = paginationNoteData.results
    const postItems = noteList.map(async (item: any, index: number) =>
        <div key={index} className="bg-white drop-shadow-lg basis-full m-2 rounded-md">
            <div className="p-2 pb-0 flex flex-row">
                <span className="text-2xl">{item.icon && item.icon.type == "emoji" ? item.icon.emoji : ""}</span>
                <span className="flex flex-col">
                    <span className="text-sm">{item.properties.name.title[0].plain_text}</span>
                    <span className="text-xs font-thin">{new Date(item.created_time).toLocaleString()}</span>
                </span>
            </div>
            <div className="p-2 pb-0">
                <NotionRenderer recordMap={await notionClient.getPage(item.id)} fullPage={true} darkMode={false} />
            </div>
            <NoteComments id={item.id} commentNum={await getDiscussionsCount(item.id)} />
        </div>
    )
    return (
        <>
            <div className="flex flex-row justify-center animation-from-bottom">
                <div className="basis-1/2 max-lg:basis-3/4">{postItems}</div>
            </div>
            <div className="flex flex-row justify-center">
                <Link href={tag ? `/other/tag/note/${tag}` : "/note"} className={`mx-4 bg-white p-4 rounded-full drop-shadow ${params && params.start_cursor ? "" : "hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
                <Link href={tag ? `/other/tag/note/${tag}/${paginationNoteData.next_cursor}` : `/note/s/${paginationNoteData.next_cursor}`} className={`mx-4 bg-white p-4 rounded-full drop-shadow ${paginationNoteData.has_more ? "" : "hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
            </div>
        </>
    );
}