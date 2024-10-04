import dynamic from 'next/dynamic'
import Wait from "@/components/Wait"
export default function PostPage({ params }: { params: { id: string } }) {
    const PostPage = dynamic(() => import('@/components/post/PostPage'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <PostPage id={params.id} />
        </>
    );
}