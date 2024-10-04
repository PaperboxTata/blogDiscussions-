import dynamic from "next/dynamic";
import Wait from "@/components/Wait";
export default function Post({ params }: { params: { start_cursor: string } }) {
    const PostPageList = dynamic(() => import('@/components/post/PostPageList'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <PostPageList params={params} tag={null} />
        </>
    );
}