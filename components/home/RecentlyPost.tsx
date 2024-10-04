import { getDiscussionsCount, getRecentlyPost } from "@/api/personalRequest"
import { getTimeDifference } from "@/components/ts/Time"
import Link from "next/link";
import PostOverview from "@/components/post/PostOverview";
import '@/components/css/tagsColor.css'
import { Calendar_svgD, Click_svgD,Chat_svgD } from "@/components/ts/icon_svgD"
export default async function RecentlyPost() {
    const recentlyPostList = (await getRecentlyPost()).results
    const RecentlyPost = recentlyPostList.map((item: any, index: number) =>
        <div key={index} className="bg-white drop-shadow-lg animation-from-right basis-full transition hover:-translate-y-1 m-2 rounded-md">
            <Link href={"post/" + item.id}>
                <div className="p-2 pb-0">
                    <p className="flex">
                        <span>{item.icon && item.icon.type == "emoji" ? item.icon.emoji : ""}</span>
                        {item.properties.name.title[0].plain_text}
                    </p>
                </div>
                {item.cover
                    ?
                    <img className="w-24 h-24 rounded-md m-2 float-left" src={item.cover.type == "file" ? item.cover.file.url : item.cover.external.url} alt="" />
                    : ""}
                <div className="p-2 pb-0">
                    <p className="indent-6 text-sm font-thin break-all"><PostOverview id={item.id} /></p>
                </div>
            </Link>
            <div className="flex flex-wrap justify-between text-xs font-light p-2 pt-1">
                <span className="flex flex-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d={Calendar_svgD} />
                    </svg>
                    <p>{new Date(item.created_time).toLocaleDateString()}</p>&nbsp;
                    <span>
                        #{item.properties.tag.multi_select.map((item: any, index: number) => <span key={index}>{index ? "|" : ""}&nbsp;<a className={`tags-${item.color} px-1 rounded`} href={`/tags/${item.name}`}>{item.name}</a>&nbsp;</span>)}
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
            {RecentlyPost}
        </>
    );
}