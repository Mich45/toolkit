import React, { useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export interface Tool {
  data: {
  title: string;
  description: string;
  url: string;
  imgURL: string;
  category: string[];
  }
}

const Preview: React.FC<Tool>  = ({ data }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
    });
  });

  console.log("Preview component rendered");

  return (
    <>
      <a
        data-aos="fade-up"
        target="_blank"
        rel="noreferrer"
        href={data.url}
        className="block min-w-[359px] max-w-72 hover:scale-105 transition duration-300 ease-in-out group"
      >
        <div className="h-[17rem] w-full rounded-[1.25rem] overflow-hidden relative">
          <div className="h- relative overflow-hidden">
            <Image
              src={data.imgURL}
              alt={`${data.title} landing page`}
              style={{ objectFit: "cover" }}
              fill={true}
              sizes="100vw"
              className="h-full w-full transition-opacity duration-300 group-hover:opacity-50"
            />
            <p className="absolute inset-0 flex items-center justify-center text-center text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
              {data.description}
            </p>
          </div>
        </div>
          <div className="gap-3 pt-4 pl-0 flex flex-col">
            <h2 className="text-md font-bold text-gray-300 capitalize hover:underline">
              {data.title}
            </h2>
          </div>
      </a>
    </>
  );
};

export default React.memo(Preview);
