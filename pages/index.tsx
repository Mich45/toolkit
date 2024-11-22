//@ts-nocheck
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Preview from "../components/Preview";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import LineSVG from "../components/LineSVG";
import * as api from "../lib/controller";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = ({ tools }: any) => {
  const [filteredTools, setFilteredTools] = useState(tools);

  useEffect(() => {
    AOS.init();
  });

  const handleSearch = (query) => {
    if (!query) {
      setFilteredTools(tools);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = tools.filter(
      (tool: any) =>
        tool.title.toLowerCase().includes(lowerCaseQuery) ||
        (Array.isArray(tool.category) &&
          tool.category.some((cat: string) =>
            cat.toLowerCase().includes(lowerCaseQuery)
          ))
    );
    setFilteredTools(filtered);
  };

  const categories = Array.from(
    new Set(tools.flatMap((tool) => tool.category))
  );

  return (
    <>
      <Head>
        <title>ToolKit</title>
        <meta name="description" content="A collection of useful resources from around the internet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full bg-[#080910] h-full content-center ">
        <section className=" bg-[url('/Moon.svg')] py-10">
          <div className="flex items-center place-content-center p-5">
            <div className="flex flex-col place-items-center">
              <h1 className="text-6xl mt-10 py-2 text-gray-400 font-bold">
                ToolKit{" "}
                <span
                  style={{ display: "inline-block", verticalAlign: "bottom" }}
                ></span>
              </h1>
              <LineSVG />
            </div>
          </div>
          <div className="flex items-center place-content-center p-5">
            <div className="lg:w-3/5 w-full">
              <p
                data-aos="zoom-in"
                className=" pb-12 text-gray-500 text-sm font-semibold text-center"
              >
                Explore a comprehensive list of awesome internet tools to ease
                and accelerate your day-to-day developer experience. Toolkit
                lets you explore ready-made tools and websites so you can
                develop and ship faster.
              </p>
            </div>
          </div>
        </section>
        {/* Sidebar and tools section */}
        <div className="flex w-full">
          <div className="w-1/5 bg-[#121520] p-5">
            <Sidebar categories={categories} onSearch={handleSearch} />
          </div>
          <section className=" w-4/5 bg-[#121520] h-auto">
            {/* <div className="tags w-3/5 py-20 mx-auto grid grid-cols-6 gap-2 items-center place-content-center">
            <div className="tag">💸 Devtools</div>
            <div className="tag">✨ Writing</div>
            <div className="tag">🖌 Design</div>
            <div className="tag">🎨 Photos</div>
            <div className="tag">✒ Icons</div>
            <div className="tag">📑 AI Tools</div>
          </div> */}
            <div className=" py-10 my-0 mx-auto toolsWrapper flex flex-col lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 items-center gap-2 place-content-center">
              {filteredTools.map((data: any, key: any) => {
                return <Preview key={key} data={data} />;
              })}
            </div>
            {filteredTools.length === 0 && (
              <p className="text-center text-gray-500 py-10">No tools found</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.method === "GET") {
    api.connectToDB();
    api.saveTool();
    const response = await api.getTools();
    const tools = JSON.stringify(response);

    return { props: { tools: JSON.parse(tools) } };
  }
};

export default Home;
