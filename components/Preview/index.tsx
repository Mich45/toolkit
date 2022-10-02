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
      <a href={data.url} className="shadow-md hover:scale-105 hover:translate-y-1 transition-all duration-300 ease-in-out">
        <div className="h-60 w-64 bg-[#080910] outline-none text-gray-500 rounded cursor-pointer overflow-hidden">
          <div className='image h-[70%]'>
            <img src={data.imgURL} alt={`${data.title} landing page`} className="h-full w-full"/>
          </div>
          
          <div className='h-[30%] pt-1 bg-black text-gray-300 flex flex-col place-items-center overflow-hidden'>
            <div>
              <h2 className="text-sm font-bold uppercase">{data.title}</h2>
            </div>
            <div className="text-center">
                <p className="text-ellipsis text-sm">{data.description}</p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default Preview