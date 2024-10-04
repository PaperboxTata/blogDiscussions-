"use client"
import { NotionRenderer as Renderer } from 'react-notion-x'
import dynamic from 'next/dynamic'

const components = {
    Code: dynamic(() =>
        import('react-notion-x/build/third-party/code').then((m) => m.Code)
    ),
    Collection: dynamic(() =>
        import('react-notion-x/build/third-party/collection').then(
            (m) => m.Collection
        )
    ),
    Equation: dynamic(() =>
        import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
    ),
    Pdf: dynamic(
        () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
        {
            ssr: false
        }
    ),
    Modal: dynamic(
        () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
        {
            ssr: false
        }
    )
}
const mapPageUrl = (id: string) => `https://www.notion.so/${id.replace(/-/g, '')}`
export default function NotionRenderer(props: any) {
    return (
        <>
            <Renderer
                components={components}
                mapPageUrl={mapPageUrl}
                {...props}
                disableHeader={true}
            />
        </>
    );
}