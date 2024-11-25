import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

type DataProps = {
  data: {
    title: string;
    description: string;
    url: string;
    category: string[];
    imgURL: string;
  };
};

const Preview = ({ data }: DataProps) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
    });
  });

  return (
    <>
      <a
        data-aos="fade-up"
        target="_blank"
        rel="noreferrer"
        href={data.url}
        className="block max-w-60 hover:scale-105 transition duration-300 ease-in-out group"
      >
        <div className="h-52 w-full bg-[#080910] rounded overflow-hidden relative">
          <div className="h-[80%] relative overflow-hidden">
            <Image
              src={data.imgURL}
              alt={`${data.title} landing page`}
              style={{ objectFit: "cover" }}
              fill={true}
              className="h-full w-full transition-opacity duration-300 group-hover:opacity-50"
            />
            {/* Description on Hover */}
            <p className="absolute inset-0 flex items-center justify-center text-center text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
              {data.description}
            </p>
          </div>
          <div className="h-[20%] pt-1 bg-[#080910] flex flex-col items-center">
            <h2 className="text-md font-bold text-gray-300 capitalize hover:underline">
              {data.title}
            </h2>
          </div>
        </div>
      </a>
    </>
  );
};

export default Preview;
