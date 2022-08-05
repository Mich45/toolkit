import React from 'react'

type DataProps = {
   
    data: {
    title: string,
    description: string,
    url: string
    preview: string,
    category: string[]
    }
}

const Preview = ({data} : DataProps) => {
  return (
    <>
      <a href={data.url} className="">
        <div className="h-60 w-64 bg-[#080910] outline-none text-gray-500 rounded cursor-pointer overflow-hidden">
          <div className='image h-[60%]'>
              
          </div>
          
          <div className='h-[40%] pt-1 bg-gray-500 text-black flex flex-col place-items-center overflow-hidden'>
            <div>
              <h2 className="text-sm font-bold uppercase">{data.title}</h2>
            </div>
            <div>
                <p className="text-ellipsis text-sm">{data.description}</p>
            </div>
            <div className=" mt-3 flex gap-1 ">
                {
                    data.category.map((category) => {
                        return (
                            <div className="px-2 tag">{category}</div>
                        )
                    })
                }
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default Preview