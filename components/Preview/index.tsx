import React from 'react'

type DataProps = {  
    data: {
    title: string,
    description: string,
    url: string
    category: string[],
    imgURL: string
    }
}

const Preview = ({data} : DataProps) => {
  return (
    <>
      <a href={data.url} className="">
        <div className="h-60 w-64 bg-[#080910] outline-none text-gray-500 rounded cursor-pointer overflow-hidden">
          <div className='image h-[70%]'>
              
          </div>
          
          <div className='h-[30%] pt-1 bg-gray-500 text-black flex flex-col place-items-center overflow-hidden'>
            <div>
              <h2 className="text-sm font-bold uppercase">{data.title}</h2>
            </div>
            <div>
                <p className="text-ellipsis text-sm">{data.description}</p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default Preview