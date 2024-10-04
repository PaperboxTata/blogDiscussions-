import dynamic from "next/dynamic";
import Wait from "@/components/Wait";
export default function Post() {
    const PostPageList = dynamic(() => import('@/components/post/PostPageList'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <PostPageList params={null} tag={null} />
        </>
    );
}