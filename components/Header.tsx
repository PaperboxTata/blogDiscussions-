"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { headerMenu } from "@/components/ts/HeaderConfig"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Header() {
    const navRef = useRef<HTMLDivElement>(null)
    const navBottomRef = useRef<HTMLDivElement>(null)
    const navIconRef = useRef<HTMLDivElement>(null)
    const handler = useCallback((e: any) => {
        navRef.current?.classList.toggle('sticky-nav-full', !e[0].isIntersecting)
        navRef.current?.classList.toggle('sticky-nav-unfull', e[0].isIntersecting)
        navIconRef.current?.classList.toggle('scale-y-100', !e[0].isIntersecting)
        navIconRef.current?.classList.toggle('scale-y-0', e[0].isIntersecting)
    }, [])
    useEffect(() => {
        const observer = new window.IntersectionObserver(handler)
        let headerTarget = document.querySelector('#headerTarget');
        observer.observe(headerTarget as Element)
        const pathPiece = window.location.pathname.split("/")
        setPath("/" + pathPiece[1])
        if (pathPiece.length > 2)
            setPathOther("/other/" + pathPiece[2])
        else setPathOther("")
    }, [])
    const params = useParams();
    const [path, setPath] = useState<string>("");
    const [pathOther, setPathOther] = useState<string>("");
    const [novSvgD, setNovSvgD] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        const pathPiece = window.location.pathname.split("/")
        setPath("/" + pathPiece[1])
        if (pathPiece.length > 2)
            setPathOther("/other/" + pathPiece[2])
        else setPathOther("")
        const i = headerMenu.findIndex(i => i.path === "/" + window.location.pathname.split("/")[1])
        navBottomRef.current?.classList.remove("-translate-x-0/4")
        navBottomRef.current?.classList.remove("-translate-x-1/4")
        navBottomRef.current?.classList.remove("-translate-x-2/4")
        navBottomRef.current?.classList.remove("-translate-x-3/4")
        navBottomRef.current?.classList.add(`-translate-x-${3 - i}/4`)
        if (headerMenu[i]) {
            setNovSvgD(headerMenu[i].icon_svgD)
            setTitle(headerMenu[i].name)
        }
    }, [params]);
    const menuItems = headerMenu.map((item: any, index: number) =>
        <div key={index} className="h-full w-full basis-1/4">
            {item.type != "list" ?
                <Link href={item.path} className="h-full w-full flex flex-row justify-center items-center">
                    <div className={`transition text-sm ${path == item.path ? "translate-x-3 text-yellow-500" : "translate-x-0"}`}>{item.name}</div>
                </Link> : <div className="h-full w-full flex flex-col justify-center items-center group">
                    <div className={`transition text-sm cursor-pointer ${path == item.path ? "translate-x-3 text-yellow-500" : "translate-x-0"}`}>{item.name}</div>
                    <div className="absolute top-12 transition duration-300 origin-top scale-y-0 bg-slate-100 rounded-md divide-y divide-slate-200 group-hover:scale-y-100">
                        {item.list.map((item_: any, index_: number) => <div key={index_} className="px-4 py-1">
                            <Link href={item_.path} className="flex justify-center items-center">
                                <div className={`transition text-sm ${pathOther == item_.path ? "text-orange-500" : ""}`}>{item_.name}</div>
                            </Link>
                        </div>)}
                    </div>
                </div>}
        </div>
    );
    const lgMenuItems = <div className="absolute top-12 left-0 w-1/4 origin-top scale-y-0 group-hover:scale-y-100">
        <div className="flex justify-center">
            <div className="basis-1/2 flex flex-col h-8 divide-y divide-slate-300">
                {headerMenu.map((item: any, index: number) => <div key={index} className="bg-slate-200/50 py-1">
                    {item.type != "list" ?
                        <Link href={item.path} className="flex flex-row justify-center items-center">
                            <div className={`transition text-sm ${path == item.path ? "translate-x-3 text-yellow-500" : "translate-x-0"}`}>{item.name}</div>
                        </Link> : <div className="flex flex-col justify-center items-center">
                            <div className={`transition text-slate-500 text-sm cursor-pointer ${path == item.path ? "translate-x-3 text-yellow-500" : "translate-x-0"}`}>{item.name}</div>
                            <div className="translate-x-3 divide-y divide-slate-300  w-1/2">
                                {item.list.map((item_: any, index_: number) => <div key={index_}>
                                    <Link href={item_.path} className="flex justify-center items-center">
                                        <div className={`text-sm ${pathOther == item_.path ? "text-yellow-500" : ""}`}>{item_.name}</div>
                                    </Link>
                                </div>)}
                            </div>
                        </div>}
                </div>)}
            </div>
        </div>
    </div>
    return (
        <>
            <div className="absolute h-16" id="headerTarget"></div>
            <div className="sticky-nav transition h-12 flex justify-end duration-300" ref={navRef}>
                <div className="absolute text-2xl transition scale-y-0 px-8 pt-2 max-lg:right-0 lg:left-0" ref={navIconRef}>🐾</div>
                <div id="sticky-nav-left" className="flex h-full items-center transition-all duration-300 max-lg:hidden">
                    <div id="sticky-nav-left-main" className="h-3/4 flex-row grow shadow-inner">
                        <div className="h-full flex items-center">
                            <div id="sticky-nav-left-mask" className="absolute transition h-9 w-1/4 flex flex-row-reverse" ref={navBottomRef}>
                                <div className="h-full w-1/4 flex items-center">
                                    <svg id="nav-left-bottom-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-[20px] stroke-2 stroke-amber-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={novSvgD} />
                                    </svg>
                                    <div className="absolute w-1/4 h-full top-0 flex justify-center">
                                        <div id="nav-left-bottom-boder" className="h-full w-3/4 left-0 top-0 nav-bottom-boder"></div>
                                    </div>
                                </div>
                            </div>
                            {menuItems}
                        </div>
                    </div>
                </div>
                <div className="lg:hidden w-full flex bg-slate-100/50 group">
                    <div className="basis-1/4 flex items-center justify-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 stroke-slate-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                    <div className="basis-1/4 flex items-center text-slate-500 text-sm">{title}</div>
                    {lgMenuItems}
                </div>
            </div>
        </>
    );
}