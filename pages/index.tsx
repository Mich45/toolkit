//@ts-nocheck
import React, { useCallback, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Preview from "../components/Preview";
import Footer from "../components/Footer";
import LineSVG from "../components/LineSVG";
import Tools from "../components/Tools";
import Search from "../components/Search";
import * as api from "../lib/controller";
import AOS from "aos";
import "aos/dist/aos.css";
import { set } from "mongoose";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchResults(tools);
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(tools.flatMap((tool) => tool.category)));
  }, [tools]);

const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedCategory = e.target.value;

  try {
    setLoading(true);
    const res = await fetch(`/api/tools?category=${selectedCategory}`);
    const data = await res.json();
    setSearchResults(data);
    setLoading(false);
  } catch (err) {
    console.error("Failed to fetch tools by category:", err);
  }
};


  const memoizedTools = useMemo(() => tools, []);

  return (
    <>
      <Head>
        <title>ToolKit</title>
        <meta
          name="description"
          content="A collection of useful resources from around the internet."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full bg-[#080910] content-center ">
        <section className="gradient md:pl-7 py-20">
          <div className="flex p-5">
            <div className="flex">
              <h1 className="text-6xl mt-10 text-white font-bold">
                ToolKit{" "}
                <span
                  style={{ display: "inline-block", verticalAlign: "bottom" }}
                ></span>
              </h1>
            </div>
          </div>
          <div className="flex p-5">
            <div className="lg:w-3/5 w-full">
              <p
                data-aos="zoom-in"
                className=" pb-12 text-white text-sm font-semibold"
              >
                Explore a comprehensive list of awesome internet tools to ease
                and accelerate your day-to-day developer experience. Toolkit
                lets you explore ready-made tools and websites so you can
                develop and ship faster.
              </p>
            </div>
          </div>
          {/* Trending tags */}
          <p className="text-white ml-4 mb-2 font-bold">Trending categories</p>
          <div className="tags absolute z-10 ml-4 flex flex-wrap gap-2">
            <div className="tag">💸 Devtool</div>
            <div className="tag">✨ Productivity</div>
            <div className="tag">🖌 Design</div>
            <div className="tag">🎨 Photos</div>
            <div className="tag">✒ Icons</div>
            <div className="tag">📑 AI</div>
          </div>
        </section>
        {/* Sidebar and tools section */}
            <div className="bg-[#3595e7] py-2 z-50 text-center sticky top-[0px] text-white w-full ">
              {/* <div className="mb-5">
                <Search
                  tools={memoizedTools}
                  setSearchResults={setSearchResults}
                />
              </div> */}

              <div>
                <select
                  onChange={handleCategoryChange}
                  className="bg-gray-800 text-white p-2 rounded-md border-none focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          <section className=" w-full bg-[#121520] h-auto">
            <div className=" py-10 my-0 mx-auto justify-items-center toolsWrapper grid-cols-1 grid lg:grid-cols-3 md:max-lg:grid-cols-2 items-center gap-y-4">
              <Tools data={searchResults.length ? searchResults : tools} />
            </div>

          </section>
      </main>

      <Footer />
    </>
  );
};

export const getServerSideProps = async () => {
  api.connectToDB();
  api.saveTool();
  const response = await api.getTools();
  const tools = JSON.stringify(response);

  return { props: { tools: JSON.parse(tools) } };
};

export default Home;
