import { getDatabaseInfo } from "@/api/personalRequest";
import Link from "next/link";

import "@/components/css/tagsColor.css"
export default async function Tag() {
    const data = await getDatabaseInfo() as any
    const tagList = data.properties.tag.multi_select.options
    const seriesList = data.properties.series.select.options
    const tagItems = tagList.map((item: any, index: number) =>
        <Link key={index} href={`/other/tag/post/${item.name}`} className={`tags-${item.color} px-2 m-1 rounded`}>
            {item.name}
        </Link>
    )
    const seriesItems = seriesList.map((item: any, index: number) =>
        <Link key={index} href={`/other/tag/note/${item.name}`} className={`tags-${item.color} px-2 m-1 rounded`}>
            {item.name}
        </Link>
    )
    return (
        <>
            <div className="flex justify-center page-height">
                <div className="flex flex-col w-3/4">
                    <div className="pt-8">
                        <div className="text-2xl">文章标签</div>
                        <div className="flex flex-wrap">{tagItems}</div>
                    </div>
                    <div className="pt-8">
                        <div className="text-2xl">日常标签</div>
                        <div className="flex flex-wrap">{seriesItems}</div>
                    </div>
                </div>
            </div>
        </>
    );
}