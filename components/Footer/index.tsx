import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="h-20 w-full bg-[#080910]">
        <div className="lg:mx-[130px] flex-col flex lg:flex-row lg:justify-between items-center text-gray-300">
          <div className="py-2">
            <p>With ❤ by <a className="text-slate-700 hover:text-gray-500 transition ease-in-out"  href="https://twitter.com/michaelhungbo">Michael Hungbo</a></p>
          </div>
          <div>
            <a className="text-slate-700 hover:text-gray-500 transition ease-iin-out" href="https://github.com/">GitHub</a>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Footer