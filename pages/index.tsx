//@ts-nocheck
import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Preview from "../components/Preview";
import Footer from "../components/Footer";
import LineSVG from "../components/LineSVG";
import * as api from "../lib/controller";
import AOS from "aos";
import "aos/dist/aos.css";


export interface Tool {
  title: string;
  description: string;
  url: string;
  imgURL?: string;
  category: string[];
}

export interface HomeProps {
  tools: Tool[];
}

const Home: React.FC<HomeProps> = ({ tools }) => {
  // const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
   
    const searchFilter = (data) => {
      return data.filter((tool) =>
        tool.category.some((category) =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ); 
    }

    const filtered = searchFilter(tools)
   console.log(filtered)
  

  const categories = Array.from(
    new Set(tools.flatMap((tool) => tool.category))
  );

  return (
    <>
      <Head>
        <title>ToolKit</title>
        <meta
          name="description"
          content="A collection of useful resources from around the internet."
        />
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
          <div className="w-1/4 bg-[#121520] p-5">
            <div className=" pt-9 bg-[#1a1a2e] text-white p-5 rounded-md shadow-md w-full ">
              <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={handleChange}
                    className="w-full p-3 text-sm rounded-md bg-[#121212] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>

              <div>
                <h1 className="text-lg font-semibold mb-3">Categories</h1>
                <ul className="space-y-2">
                  {
                    <li
                      key={1}
                      onClick={() => setSearchQuery("")}
                      className="cursor-pointer capitalize text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition"
                    >
                      All
                    </li>
                  }
                  {categories!.map((category) => (
                    <li
                      key={category}
                      onClick={() => setSearchQuery(category)}
                      className="cursor-pointer capitalize text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <section className=" w-3/4 bg-[#121520] h-auto">
            {/* <div className="tags w-3/5 py-20 mx-auto grid grid-cols-6 gap-2 items-center place-content-center">
            <div className="tag">💸 Devtools</div>
            <div className="tag">✨ Writing</div>
            <div className="tag">🖌 Design</div>
            <div className="tag">🎨 Photos</div>
            <div className="tag">✒ Icons</div>
            <div className="tag">📑 AI Tools</div>
          </div> */}
            <div className=" py-10 my-0 mx-auto toolsWrapper flex flex-col lg:grid lg:grid-cols-4 md:grid md:grid-cols-4 items-center gap-y-6 place-content-center">
              {filtered.map((data: any, key: any) => {
                return <Preview key={key} data={data} />;
              })}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-10">No tools found</p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
    api.connectToDB();
    api.saveTool();
    const response = await api.getTools();
    const tools = JSON.stringify(response);

    return { props: { tools: JSON.parse(tools) } };
};

export default Home;
