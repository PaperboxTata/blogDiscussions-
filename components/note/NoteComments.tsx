"use client"
import Giscus from "@giscus/react";
import { useState } from "react";
import { Chat_svgD, ChevronDown_svgD } from "@/components/ts/icon_svgD";
export default function NoteComments({ id, commentNum }: { id: string, commentNum: number }) {
    const [show, setShow] = useState<boolean | null>(null);
    return (
        <>
            <div className="pb-4">
                <div className="flex justify-center w-full">
                    <button onClick={() => { setShow(!show) }}>
                        <div className="flex flex-col">
                            <span className={`flex flex-row items-center transition ${show == null ? "" : "scale-y-0"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={Chat_svgD} />
                                </svg>
                                <span>{commentNum}</span>
                            </span>
                            <span className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 transition ${show ? "rotate-180 -translate-y-4" : "rotate-0"}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={ChevronDown_svgD} />
                                </svg>
                            </span>
                        </div>
                    </button>
                </div>
                {show ? <div className='mx-8 bg-white px-4 max-lg:mx-0'>
                    <Giscus
                        id="comments"
                        repo="paperboxTata/blog"
                        repoId="R_kgDOM421Lw"
                        category="General"
                        categoryId="DIC_kwDOM421L84Ci5qC"
                        mapping="specific"
                        term={id}
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="bottom"
                        theme="light"
                        lang="zh-CN"
                        loading="lazy"
                    />
                </div> : ""}
            </div>
        </>
    );
}