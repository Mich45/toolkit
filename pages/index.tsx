//@ts-nocheck
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Image from 'next/image'
import Preview from '../components/Preview';
import Footer from '../components/Footer';
import * as api from '../lib/controller';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Toolkit from '../public/toolkit.png'

const Home = ({tools}: any) => {

  useEffect(() => {
    AOS.init();
  })

  return (
    <>
      <Head>
        <title>ToolKit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full bg-[#080910] h-full content-center ">
        <section className=" bg-[url('/Moon.svg')] py-10">
          <div className="flex items-center place-content-center p-5">
            <div className="">
              <h1 className="text-6xl mt-10 py-2 text-gray-400 font-bold font-[cursive] ">
                ToolKit <span style={{ display: "inline-block", verticalAlign: "bottom" }}><img src={Toolkit.src} style={{verticalAlign: "bottom"}} height={55} width={55} /></span>
              </h1>
            </div>
          </div>
          <div className="flex items-center place-content-center p-5">
            <div className="lg:w-3/5 w-full">
              <p data-aos="zoom-in" className=" pb-12 text-gray-500 text-sm font-semibold text-center">
                Explore a comprehensive list of awesome web tools to ease and accelerate your
                day-to-day developer experience. Toolkit lets you explore ready-made programming tools so you can develop and ship faster.
              </p>
            </div>
          </div>
        </section>
        <section className="  bg-[#121520] h-auto">
          <div className="tags w-3/5 py-20 mx-auto grid grid-cols-6 gap-2 items-center place-content-center">
            <div className="tag">💸 Devtools</div>
            <div className="tag">✨ Writing</div>
            <div className="tag">🖌 Design</div>
            <div className="tag">🎨 Photos</div>
            <div className="tag">✒ Icons</div>
            <div className="tag">📑 AI Tools</div>
          </div>
          <div className=" w-4/5 py-10 my-0 mx-auto toolsWrapper flex flex-col lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-5 items-center place-content-center">
            {  
              tools.map((data: any, key: any) => {
                return <Preview key={key} data={data} />
              })
           }
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}; 

export const getServerSideProps = async({req, res}) => {
  if (req.method === 'GET') {
   api.connectToDB();
   api.saveTool();
  const response = await api.getTools();
  const tools = JSON.stringify(response);

  return { props: { tools: JSON.parse(tools) } }
}
}

export default Home;
