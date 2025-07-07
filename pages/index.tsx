//@ts-nocheck
import React, { useCallback, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Preview from "@/components/Preview";
import Footer from "@/components/Footer";
import LineSVG from "@/components/LineSVG";
import Tools from "@/components/Tools";
import Search from "@/components/Search";
import * as api from "../lib/controller";
import Scroll from "@/components/Scroll";
import AOS from "aos";
import { SparklesText } from "@/components/magicui/sparkles-text";
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

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
        <title>DevTools</title>
        <meta
          name="description"
          content="A collection of useful resources from around the internet."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative w-full bg-[#080910] content-center ">
        <section className="relative before-bg-grid min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-16 lg:pt-32 sm:pt-32 pb-16">
          <div className="fixed inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 opacity-40 mix-blend-soft-light bg-micro-noise-overlay"></div>
            <div className="absolute inset-0 animated-grid-background"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute inset-0 bg-gradient-to-b to-transparent from-teal-500/10 via-teal-400/5"
                style={{ filter: "blur(80px)" }}
              ></div>
              <div
                className="absolute inset-0 bg-gradient-to-b to-transparent from-blue-400/10 via-blue-300/5"
                style={{ filter: "blur(80px)" }}
              ></div>
              <div
                className="absolute inset-0 bg-gradient-to-b to-transparent from-yellow-300/5 via-yellow-200/2"
                style={{ filter: "blur(80px)" }}
              ></div>
              <div
                className="w-full absolute inset-0"
                style={{
                  background:
                    "radial-gradient(90% 100% at 50% 0%, transparent 5%, rgba(0, 0, 0, 0.6) 30%, rgba(1, 1, 2, 0.95) 70%)",
                }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171F2C]/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F293A]/0 via-[#1F293A]/20 to-[#1F293A]/40"></div>
          </div>

          <div className="relative z-20 max-w-7xl w-full flex items-center pb-8">
            <section className="flex flex-col items-center text-center px-4">
              <div className="mb-8">
                <div className="font-semibold flex items-center gap-2 rounded-full border border-teal-800/60 bg-teal-950/30 px-4 py-2 text-sm text-teal-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-teal-700/80 hover:bg-teal-950/50">
                  <span className="text-teal-400">
                    Over 200+ free tools and counting!{" "}
                  </span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6 animate-fade-in-up">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400">
                  Discover A Curated Collection of{" "}
                </span>
                <SparklesText className="inline">Free Tools.</SparklesText>
              </h1>

              <p className="text-lg text-zinc-300 max-w-xl leading-relaxed mb-10 animate-fade-in-up">
                DevTools curates a comprehensive list of free and open-source
                tools to help you with your daily software needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up">
                <a
                  className="gap-2 whitespace-nowrap shadow group inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-medium text-zinc-900 transition-all hover:bg-white/90 hover:shadow-xl ring-1 ring-zinc-300/50 hover:-translate-y-1 duration-300"
                  href="#tools"
                >
                  <span className="relative z-10 flex items-center">
                    Explore All Tools
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex bg-white h-12 items-center justify-center rounded-lg px-8 text-base font-medium text-black transition-all hover:bg-white/90 hover:shadow-xl hover:-translate-y-1 duration-300"
                >
                  Submit a Tool
                </a>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-4 animate-fade-in-up">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm font-medium text-zinc-400">
                  <span className="flex items-center gap-1 hover:text-zinc-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-code h-6 w-6 text-orange-400"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Productivity
                  </span>
                  <span className="flex items-center gap-1 hover:text-zinc-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-smartphone h-6 w-6 text-emerald-400"
                    >
                      <rect
                        width="14"
                        height="20"
                        x="5"
                        y="2"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="12" x2="12" y1="18" y2="18"></line>
                    </svg>
                    Design
                  </span>
                  <span className="flex items-center gap-1 hover:text-zinc-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-brain h-6 w-6 text-sky-400"
                    >
                      <path d="M12 5a3 3 0 1 0 0 6 3 3 0 1 0 0-6" />
                      <path d="M12 18a3 3 0 1 0 0-6 3 3 0 1 0 0 6" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    </svg>
                    Desktop Apps
                  </span>
                  <span className="flex items-center gap-1 hover:text-zinc-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-bar-chart-2 h-6 w-6 text-rose-400"
                    >
                      <line x1="18" x2="18" y1="20" y2="10"></line>
                      <line x1="12" x2="12" y1="20" y2="4"></line>
                      <line x1="6" x2="6" y1="20" y2="14"></line>
                    </svg>
                    Image and Video Editors
                  </span>
                  <span className="flex items-center gap-1 hover:text-zinc-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-figma h-6 w-6 text-fuchsia-400"
                    >
                      <path d="M5.5 8.5A2.5 2.5 0 0 1 8 6h.5A2.5 2.5 0 0 1 11 8.5v.5H5.5z" />
                      <path d="M5.5 15.5A2.5 2.5 0 0 0 8 18h.5A2.5 2.5 0 0 0 11 15.5v-.5H5.5z" />
                      <path d="M18.5 8.5A2.5 2.5 0 0 0 16 6h-.5A2.5 2.5 0 0 0 13 8.5v.5h5.5z" />
                      <path d="M18.5 15.5A2.5 2.5 0 0 1 16 18h-.5A2.5 2.5 0 0 1 13 15.5v-.5h5.5z" />
                      <path d="M12 12h-1v-3.5A2.5 2.5 0 0 0 8.5 6H8A2.5 2.5 0 0 0 5.5 8.5v7A2.5 2.5 0 0 0 8 18h.5A2.5 2.5 0 0 0 11 15.5V12h1z" />
                    </svg>
                    Stock Images and Videos
                  </span>
                </div>
              </div>
              {/* Floating icons */}
              <div className=" xl:flex hidden absolute left-60 -rotate-[95deg] p-2 bg-white backdrop-blur-lg rounded-xl border border-white/20 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pen-tool-icon lucide-pen-tool"
                >
                  <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
                  <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
                  <path d="m2.3 2.3 7.286 7.286" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
              <div className=" xl:flex hidden absolute top-60 right-60 rotate-[-40deg] p-2 bg-red-400 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-palette-icon lucide-palette"
                >
                  <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r=".5" fill="none" />
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </div>
              <div className=" xl:flex hidden absolute top-1 right-40 p-2 bg-blue-400 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-monitor-play-icon lucide-monitor-play"
                >
                  <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" />
                  <path d="M12 17v4" />
                  <path d="M8 21h8" />
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                </svg>
              </div>
              <div className=" xl:flex hidden absolute top-[240px] left-20 -rotate-6 p-2 bg-green-400 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-briefcase-business-icon lucide-briefcase-business"
                >
                  <path d="M12 12h.01" />
                  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                  <rect width="20" height="14" x="2" y="6" rx="2" />
                </svg>
              </div>
            </section>
          </div>
          {/* <Scroll /> */}
        </section>
        {/* Sidebar and tools section */}
        <div className="z-10 py-2 text-center sticky top-[0px] text-white w-full ">
          {/* <div className="mb-5">
                <Search
                  tools={memoizedTools}
                  setSearchResults={setSearchResults}
                />
              </div> */}

          <div className="z-50">
            <select
              onChange={handleCategoryChange}
              className="font-semibold rounded-full border outline-none border-teal-800/60 bg-teal-950/30 px-4 py-2 text-sm text-teal-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-teal-700/80 hover:bg-teal-950/50"
            >
              <option className="text-white" value="all">
                All Categories
              </option>
              {categories.map((cat) => (
                <option className="text-white" key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <section id="tools" className="w-full bg-[#121520] h-auto">
          <div className=" py-10 my-0 mx-auto max-w-[1230px] justify-items-center toolsWrapper grid-cols-1 grid lg:grid-cols-3 md:max-lg:grid-cols-2 items-center gap-y-12">
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
