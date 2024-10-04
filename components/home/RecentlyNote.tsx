import { getRecentlyNote } from "@/api/personalRequest"
import { getTimeDifference } from "@/components/ts/Time"
import Link from "next/link";
import PostOverview from "@/components/post/PostOverview";
export default async function RecentlyNote() {

    const recentlyNoteList = (await getRecentlyNote()).results
    const RecentlyNote = recentlyNoteList.map((item: any, index: number) =>
        <div key={index} className="animation-from-right grow-0 basis-1/4 max-lg:basis-1/2 flex flex-col">
            <Link href={"note/" + item.id} className="bg-slate-100 h-full rounded-md m-1 transition hover:-translate-y-1">
                <div className="w-full aspect-square shrink-0 ">
                    {item.cover
                        ? <img className="h-full rounded-md" src={item.cover.type == "file" ? item.cover.file.url : item.cover.external.url} alt="" />
                        : <div className="h-full bg-slate-100 rounded-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>}
                </div>
                <div className="px-2 w-full -translate-y-5 bg-slate-100/30 rounded-md backdrop-blur-sm">
                    <div className="translate-y-5">
                        <p className="indent-6 break-all text-xs font-thin h-12 overflow-hidden"><PostOverview id={item.id} /></p>
                        <div className="text-xs font-light flex flex-row-reverse">
                            <p className="flex items-center">{getTimeDifference(item.created_time)}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
    return (
        <>
            {RecentlyNote}
        </>
    );
}