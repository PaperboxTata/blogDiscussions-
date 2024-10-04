import Wait from '@/components/Wait';
import dynamic from 'next/dynamic';
export default function Page() {
    const About = dynamic(() => import('@/components/about/About'), {
        loading: () => <><Wait /></>
    })
    return (
        <>
            <About />
        </>
    );
}