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

// // Custom debounce hook
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

const Home: React.FC<HomeProps> = ({ tools }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allTools, setTools] = useState([]);
  const [searchResults, setSearchResults] = useState([])


  // const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay

  // const handleChange = useCallback((e) => {
  //   setSearchQuery(e.target.value);
  // }, []);

  // const searchFilter = (data) => {
  //   console.log("running")
  //   return data.filter((tool) =>
  //     tool.category.some((category) =>
  //       category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  //     )
  //   );
  // };

  useEffect(() => {
    AOS.init();
    setTools(tools)
    setSearchResults(tools)
  }, []);

  // const handleChange = useCallback((e) => {
  //   setSearchQuery(e.target.value);
  // }, [searchQuery]);
   
  //   const searchFilter = (data) => {
  //     return data.filter((tool) =>
  //       tool.category.some((category) =>
  //         category.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     ); 
  //   }

  // const filtered = searchFilter(tools)
  

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full bg-[#080910] h-full content-center ">
        <section className="gradient h-[80vh] md:h-[60vh] md:pl-7 py-10">
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
            <div className="tags ml-4 flex flex-wrap gap-2">
            <div className="tag">💸 Devtool</div>
            <div className="tag">✨ Productivity</div>
            <div className="tag">🖌 Design</div>
            <div className="tag">🎨 Photos</div>
            <div className="tag">✒ Icons</div>
            <div className="tag">📑 AI</div>
          </div>
        </section>
        {/* Sidebar and tools section */}
        <div className="flex w-full">
          <div className="w-1/4 hidden md:hidden lg:block bg-[#121520] p-5">
            <div className=" pt-9 bg-[#1a1a2e] text-white p-5 rounded-md shadow-md w-full ">
              <div className="mb-5">
              <Search tools={allTools} setSearchResults={setSearchResults} />
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
                      {category.length == 2 ? category.toUpperCase() : category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <section className=" w-full lg:w-3/4 bg-[#121520] h-auto">
            <div className=" py-10 my-0 mx-auto justify-items-center toolsWrapper grid-cols-1 grid lg:grid-cols-3 md:max-lg:grid-cols-2 items-center gap-y-4">
              
              <Tools data={searchResults}/>
              
              {/* {filtered.map((data: any, key: any) => {
                return <Preview key={key} data={data} />;
              })} */}
            </div>
            {/* {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-10">No tools found</p>
            )} */}
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
