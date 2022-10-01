import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Preview from '../components/Preview';
import {  GetStaticProps } from 'next'
import * as api from '../lib/controller';

const Home = ({tools}: any) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await fetch('/data/data.json');
    const data = await result.json();
  }

  useEffect( () => {
    fetchData();
    console.log(tools)
    setData(tools);
  }, [])

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
                ToolKit
              </h1>
            </div>
          </div>
          <div className="flex items-center place-content-center p-5">
            <div className=" w-3/5 ">
              <p className=" pb-12 text-gray-500 text-sm font-semibold text-center">
                Explore a comprehensive list of awesome web tools to ease and accelerate your
                day-to-day developer experience. This toolkit lets you explore ready-made programming tools so you can develop and ship faster.
              </p>
            </div>
          </div>
        </section>
        <section className="  bg-[#121520] h-auto">
          <div className="tags w-3/5 py-20 mx-auto grid grid-cols-6 gap-2 items-center place-content-center">
            <div className="tag">💸 React</div>
            <div className="tag">✨ Frontend</div>
            <div className="tag">🖌 Design</div>
            <div className="tag">🎨 UI/UX</div>
            <div className="tag">✒ Icons</div>
            <div className="tag">📑 Cheatsheets</div>
          </div>
          <div className=" w-4/5 py-10 my-0 mx-auto toolsWrapper grid grid-cols-4 gap-5 items-center place-content-center">
            {
              tools.map((data: any, key: any) => {
                return <Preview key={key} data={data} />
              })
           }
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await api.getTools();
  const tools = JSON.stringify(res);

//  // Pass data to the page via props
 return { props: { tools } }
}

export default Home;
