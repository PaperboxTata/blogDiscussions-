import notionClient from "@/api/notionClient";
import PostPageComments from "@/components/post/PostPageComments";
import { getPageData } from "@/api/notionRequest";
import NotionRenderer from '@/components/NotionRenderer'
import "@/components/css/notionNotePage.css"
export default async function NotePage({ id }: { id: string }) {
    const recordMap = await notionClient.getPage(id)
    const pageData = await getPageData(id, false) as any
    return (
        <>
            <div className="flex flex-row justify-center animation-from-bottom">
                <div className="basis-1/2 max-lg:basis-3/4">
                    <div className="bg-white drop-shadow-lg basis-full m-2 rounded-md">
                        <div className="p-2 pb-0 flex flex-row">
                            <span className="text-2xl">{pageData.icon && pageData.icon.type == "emoji" ? pageData.icon.emoji : ""}</span>
                            <span className="flex flex-col">
                                <span className="text-sm">{pageData.properties.name.title[0].plain_text}</span>
                                <span className="text-xs font-thin">{new Date(pageData.created_time).toLocaleString()}</span>
                            </span>
                        </div>
                        <div className="p-2 pb-0">
                            <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
                        </div>
                        <div className='mx-8 bg-white px-4 max-lg:mx-0'>
                            <PostPageComments id={id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}