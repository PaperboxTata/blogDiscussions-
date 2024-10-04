'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
export default function PageCover({
    children,
}: {
    children: React.ReactNode
}) {
    const pageTarget = useRef<HTMLDivElement>(null)
    const [childrenShow, setChildrenShow] = useState<boolean>(false);
    const handler = useCallback((e: any) => {
        if (e[0].isIntersecting && !childrenShow) {
            setChildrenShow(true)
            pageTarget.current?.classList.toggle("hidden", true)
        }
    }, [])
    useEffect(() => {
        const observer = new window.IntersectionObserver(handler)
        let target = document.querySelector('#pageTarget');
        observer.observe(target as Element)
    }, [])
    return (
        <>
            {childrenShow ? children : ""}
            <div className='absolute -bottom-96 w-full h-80' id="pageTarget" ref={pageTarget}></div>
        </>
    );
}