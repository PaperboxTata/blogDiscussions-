import NotionRenderer from '@/components/NotionRenderer'
import notionClient from "@/api/notionClient"
import { getPageData } from "@/api/notionRequest"
import '@/components/css/tagsColor.css'
import '@/components/css/notionPostPage.css'
import PostPageComments from "@/components/post/PostPageComments"
export default async function PostPage({ id }: { id: string }) {
    const recordMap = await notionClient.getPage(id)
    const pageData = await getPageData(id, true) as any
    return (
        <>
            <div className='px-8 animation-from-bottom'>
                {pageData.cover ? <div className='flex items-center justify-center'>
                    <img className='notion-page-cover' src={pageData.cover.type == "external" ? pageData.cover.external.url : pageData.cover.file.url} alt="" />
                </div> : ""}
                <div className='flex flex-col items-center bg-white pt-8'>
                    <span className='text-2xl font-normal pb-4'>
                        {pageData.properties.name.title[0].plain_text}
                    </span>
                    <span className='text-xs font-thin'>
                        创建于：{new Date(pageData.created_time).toLocaleDateString()}&nbsp;
                        更新于：{new Date(pageData.last_edited_time).toLocaleString()}
                    </span>
                    <span className='text-xs font-thin flex flex-wrap'>
                        {pageData.icon && pageData.icon.type == "emoji" ? pageData.icon.emoji : ""}
                        #{pageData.properties.tag.multi_select.map((item: any, index: number) => <span key={index}>{index ? "|" : ""}&nbsp;<a className={`tags-${item.color} px-2 rounded`} href={`/tags/${item.name}`}>{item.name}</a>&nbsp;</span>)}
                        &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                        </svg>
                        {pageData.properties.visitedNum.number}
                    </span>
                    <div className='w-3/4 max-lg:w-full'>
                        <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
                    </div>
                </div>
            </div>
            <div className='mx-8 bg-white px-4 pt-4'>
                <PostPageComments id={id} />
            </div>
        </>
    );
}