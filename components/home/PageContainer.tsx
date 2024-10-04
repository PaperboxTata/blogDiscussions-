import dynamic from 'next/dynamic'
export default async function PageContainer() {
    const defaultRecentlyPost = Array(4).fill("").map((item: any, index: number) =>
        <div key={index} className="animate-pulse shrink-0 flex basis-full transition hover:-translate-y-1">
            <div className="bg-slate-100 w-full rounded-md m-1 flex flex-row">
                <div className="w-1/4 aspect-square shrink-0 p-1">
                    <div className="h-full bg-slate-200 rounded-md"></div>
                </div>
                <div className="px-2 w-full h-full rounded-md p-2 flex flex-col justify-between">
                    <div className="w-1/2 h-2 bg-slate-300 rounded-md m-1"></div>
                    <div className="flex flex-row-reverse h-1/6 ">
                        <div className="w-1/6 h-2 bg-slate-300 rounded-md m-1"></div>
                    </div>
                </div>
            </div>
        </div>
    )
    const defaultRecentlyNote = Array(4).fill("").map((item: any, index: number) =>
        <div key={index} className="animate-pulse grow-0 basis-1/4 max-lg:basis-1/2 flex flex-col">
            <div className="bg-slate-100 h-full rounded-md m-1 transition hover:-translate-y-1">
                <div className="w-full aspect-square shrink-0 ">
                    <div className="h-full bg-slate-200 rounded-md"></div>
                </div>
                <div className="px-2 w-full -translate-y-5 bg-slate-100/30 rounded-md backdrop-blur-sm flex flex-col justify-between">
                    <div className=" translate-y-4">
                        <div className="w-1/2 h-2 bg-slate-300 rounded-md m-1"></div>
                        <div className="w-full h-2 bg-slate-300 rounded-md m-1"></div>
                        <div className="flex flex-row-reverse">
                            <div className="w-1/6 h-2 bg-slate-300 rounded-md m-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    const RecentlyPost = dynamic(() => import('./RecentlyPost'), {
        loading: () => <>{defaultRecentlyPost}</>
    })
    const RecentlyNote = dynamic(() => import('./RecentlyNote'), {
        loading: () => <>{defaultRecentlyNote}</>
    })
    const RecentlyDiscussions = dynamic(() => import('./RecentlyDiscussions'))
    return (
        <>
            <div className='pt-32 flex flex-row max-lg:flex-col divide-x divide-slate-200 animation-from-bottom'>
                <div className="pl-16 pr-8 max-lg:pl-2 basis-1/2">
                    <div className="pl-8 pb-6 text-2xl">近期文章📔</div>
                    <div className="w-full flex flex-wrap"><RecentlyPost /></div>
                    <div className="pt-16 pl-8 pb-4 text-2xl">近期日常🖼</div>
                    <div className="w-full flex flex-wrap"><RecentlyNote /></div>
                </div>
                <div className='pl-8 max-lg:pl-2 basis-1/2'>
                    <div className='pl-8 pb-6 text-2xl'>站内动态🧶</div>
                    <div><RecentlyDiscussions /></div>
                </div>
            </div>
        </>
    );
}