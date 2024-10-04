"use server"
import { getDiscussionsCount, getPaginationPost } from "@/api/personalRequest"
import { getTimeDifference } from "@/components/ts/Time";
import PostOverview from "@/components/post/PostOverview"
import Link from "next/link";
import "@/components/css/tagsColor.css"
import { Calendar_svgD, Click_svgD, Chat_svgD } from "@/components/ts/icon_svgD"
export default async function PostMainPage({ params, tag }: { params: any, tag: string | null }) {
    const paginationPostData = (await getPaginationPost(10, params ? params.start_cursor : undefined, tag) as any)
    const postList = paginationPostData.results
    const postItems = postList.map((item: any, index: number) =>
        <div key={index} className="bg-white drop-shadow-lg basis-full transition hover:-translate-y-1 m-2 rounded-md">
            <Link href={"/post/" + item.id}>
                <div className="p-2 pb-0">
                    <p className="flex">
                        <span>{item.icon && item.icon.type == "emoji" ? item.icon.emoji : ""}</span>
                        {item.properties.name.title[0].plain_text}
                    </p>
                </div>
                {item.cover
                    ?
                    <img className="w-20 h-20 rounded-md m-2" src={item.cover.type == "file" ? item.cover.file.url : item.cover.external.url} alt="" />
                    : ""}
                <div className="p-2 pb-0">
                    <p className="text-sm font-thin break-all"><PostOverview id={item.id} /></p>
                </div>
            </Link>
            <div className="flex flex-wrap justify-between text-xs font-light p-2 pt-1">
                <span className="flex flex-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d={Calendar_svgD} />
                    </svg>
                    <p>{new Date(item.created_time).toLocaleDateString()}</p>&nbsp;
                    <span>
                        #{item.properties.tag.multi_select.map((item: any, index: number) => <span key={index}>{index ? "|" : ""}&nbsp;<a className={`tags-${item.color} px-1 rounded`} href={`/other/tag/post/${item.name}`}>{item.name}</a>&nbsp;</span>)}
                    </span>
                </span>
                <div className="flex items-center">
                    <span className="flex pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d={Click_svgD} />
                        </svg>
                        {item.properties.visitedNum.number || 0}
                    </span>
                    <span className="flex pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d={Chat_svgD} />
                        </svg>
                        {getDiscussionsCount(item.id)}
                    </span>
                    {getTimeDifference(item.created_time)}
                </div>
            </div>
        </div>
    )
    return (
        <>
            <div className="flex flex-row justify-center animation-from-bottom">
                <div className="basis-2/3 post-odd-even">{postItems}</div>
            </div>
            <div className="flex flex-row justify-center">
                <Link href={tag ? `/other/tag/post/${tag}` : "/post"} className={`mx-4 bg-white p-4 rounded-full drop-shadow ${params && params.start_cursor ? "" : "hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
                <Link href={tag ? `/other/tag/post/${tag}/${paginationPostData.next_cursor}` : `/post/s/${paginationPostData.next_cursor}`} className={`mx-4 bg-white p-4 rounded-full drop-shadow ${paginationPostData.has_more ? "" : "hidden"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
            </div>
        </>
    );
}