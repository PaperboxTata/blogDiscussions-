import { getPostOverview } from "@/api/personalRequest"
export default async function PostOverview({ id }: { id: string }) {
    const overviewList = (await getPostOverview(id)).rich_text
    const overviewItems = overviewList ? overviewList.map((item: any, index: number) =>
        <span key={index}>
            {item.text.link
                ? <span className="font-normal text-xs underline">{item.text.content}</span>
                : item.text.content}
        </span>
    ) : ""
    return (
        <>
            {overviewItems}
        </>
    );
}