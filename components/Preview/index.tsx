import React from 'react'

type DataProps = {
    data: {
    description: string,
    url: string
    preview: string,
    category: string[]
    }
}

const Preview = ({data} : DataProps) => {
  return (
      <>
             <a href={data.url} className= "" >
                <div className= "h-60 w-64 bg-[#080910] outline-none text-gray-500 rounded cursor-pointer overflow-hidden">           
              <div>
                  <p className="text-sm">{data.description}</p>
              </div>

          </div>
          </a>
      </>
  )
}

export default Preview