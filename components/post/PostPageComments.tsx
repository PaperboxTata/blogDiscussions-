"use client"
import Giscus from '@giscus/react';
export default function PostPageComments({ id, }: { id: string }) {
    return (
        <>
            <Giscus
                id="comments"
                repo="paperboxTata/pabota.top"
                repoId="R_kgDOM421Lw"
                category="General"
                categoryId="DIC_kwDOM421L84Ci5qC"
                mapping="specific"
                term={id}
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="light"
                lang="zh-CN"
                loading="lazy"
            />
        </>
    );
}