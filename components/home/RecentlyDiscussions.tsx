import { getRecentlyDiscussions } from "@/api/personalRequest"
import Link from "next/link";
import {getPageInfo} from"@/api/personalRequest"
export default async function RecentlyDiscussions() {
    const discussionList = await getRecentlyDiscussions()
    const discussionItems = discussionList.map(async (item: any, index: number) =>
        <div key={index} className="flex flex-col pb-4 animation-from-bottom">
            <div className="flex flex-row">
                <Link href={item.author.url} target='_blank' className="flex flex-row items-center duration-500 transition hover:scale-105">
                    <img className="w-8 rounded-full" src={item.author.avatarUrl} alt="" />
                    {item.author.login}
                </Link>
                <span className="flex items-center text-xs font-thin pl-4">{new Date(item.createdAt).toLocaleString()}</span>
            </div>
            <Link href={`/${item.type}/${item.id}`} className="w-2/3 bg-white min-h-16 px-4 pt-2 ml-2 mt-2 drop-shadow rounded-tr-lg rounded-bl-lg duration-500 transition hover:-translate-y-1">
                {(await getPageInfo(item.id)).properties.name.title[0].plain_text}
                <div className="text-sm font-thin" dangerouslySetInnerHTML={{ __html: item.bodyHTML }} />
            </Link>
        </div>
    )
    return (
        <>
            {discussionItems}
        </>
    );
}