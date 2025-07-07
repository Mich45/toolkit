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

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "", ...props }) => (
  <span
    className={`inline-block align-middle ${className}`}
    {...props}
  >
    {children}
  </span>
);

const Preview: React.FC<Tool>  = ({ data }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
    });
  });


const getCategoryColor = (category: string) => {
  const colors = {
    design: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200/50",
    desktop: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200/50",
    image: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border-green-200/50",
    productivity: "bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-700 border-orange-200/50",
    writing: "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-700 border-yellow-200/50",
    devtool: "bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-700 border-teal-200/50",
    video: "bg-gradient-to-r from-indigo-500/10 to-violet-500/10 text-indigo-700 border-indigo-200/50",
    ai: "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-700 border-pink-200/50",
    jobs: "bg-gradient-to-r from-gray-500/10 to-slate-500/10 text-gray-700 border-gray-200/50",
  }
  return (
    colors[category as keyof typeof colors] ||
    "bg-gradient-to-r from-gray-500/10 to-slate-500/10 text-gray-700 border-gray-200/50"
  )
}

  console.log("Preview component rendered");

  return (
    <>
      <a
        data-aos="fade-up"
        target="_blank"
        rel="noreferrer"
        href={data.url}
        className="block w-[330px] lg:w-[380px] sm:w-[380px] hover:scale-105 transition duration-300 ease-in-out group"
      >
        <div className="h-[14rem] w-full rounded-[0.8rem] overflow-hidden relative">
          <div className="h-full relative overflow-hidden">
            <div>
              <Image
              src={data.imgURL}
              alt={`${data.title} landing page`}
              style={{ objectFit: "cover" }}
              fill={true}
              sizes="100vw"
              className="h-full w-full transition-opacity duration-300 group-hover:opacity-50"
            />
             <div className="absolute top-4 right-4 z-20">
                  <Badge
                    className={`${getCategoryColor(data.category[0])} px-3 py-1 text-xs font-bold rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80  shadow-lg backdrop-blur-sm border border-white/20`}
                  >
                    {data.category[0]}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
            <p className="absolute inset-0 flex items-center justify-center text-center text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
              {data.description}
            </p>
          </div>
        </div>
          <div className=" gap-3 pt-4 pl-0 flex flex-col">
            <h2 className="z-30 text-md font-bold text-gray-400 capitalize hover:underline">
              {data.title}
            </h2>
          </div>
      </a>
    </>
  );
};

export default React.memo(Preview);
