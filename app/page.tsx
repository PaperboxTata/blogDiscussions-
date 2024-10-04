"use server"
import dynamic from 'next/dynamic'
import avatar from '@/pubic/avatar.jpg'
import { PersonalLinks } from "@/components/ts/PageConfig"
import Link from 'next/link';
import { ChevronDown_svgD } from '@/components/ts/icon_svgD';
export default async function Page() {
  const PageContainer = dynamic(() => import('@/components/home/PageContainer'))
  const PageCover = dynamic(() => import('@/components/home/PageCover'))

  const personalLinkItems = PersonalLinks.map((item) =>
    <div key={item.name} className='transition hover:scale-110 mx-2 ring-offset-2 ring-black ring-1 rounded-full'>
      <Link href={item.path} target='_blank'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox={item.viewBox}>
          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon_svgD} />
        </svg>
      </Link>
    </div>
  );
  return (
    <>
      <div className="page-height flex flex-col justify-between max-lg:h-screen">
        <div></div>
        <div className="flex flex-col w-full items-start px-32 max-lg:px-2">
          <div className="flex flex-row max-lg:justify-center">
            <div className='basis-1/2'>
              <img className='rounded-full' src={avatar.src} alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center pt-8 text-4xl max-lg:text-xl font-thin leading-relaxed text-justify">
            <div>Hi,I'm Pabota.🍀</div>
            <div className='flex flex-row pt-1'>
              <p><span>A</span> <span className='line-through'>Noob</span> <span>NodeJS</span> </p>
              <div className='flex items-center font-medium text-2xl ml-4 max-lg:ml-2 max-lg:text-base hover:bg-slate-200'>
                <div>
                  <span>{'<'}</span>
                  Developer
                  <span>{' />'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='text-xs font-thin pt-1'>Studying / Practicing</div>
          <div className='flex flex-row pt-5'>
            {personalLinkItems}
          </div>
        </div>
        <div className='flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-bounce">
            <path strokeLinecap="round" strokeLinejoin="round" d={ChevronDown_svgD} />
          </svg>
        </div>
      </div>
      <PageCover>
        <PageContainer />
      </PageCover>
    </>
  );
}