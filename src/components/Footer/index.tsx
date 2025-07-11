import React from "react";
import { GitHubIcon } from "../Icons";
const Footer = () => {
  return (
    <>
      <div className="h-24 w-full z-50 relative bg-[#080910]">
        <div className="lg:mx-[130px] h-full text-sm flex-col flex lg:flex-row lg:justify-between items-center text-gray-300">
          <div className="py-4">
            <p>
              With 💜 by{" "}
              <a
                className="hover:text-gray-700 transition ease-in-out"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/michaelhungbo"
              >
                Michael Hungbo
              </a>
            </p>
          </div>
          <div>
            <a
              className="hover:text-gray-700 transition ease-iin-out flex"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/"
            >
              <span className="px-1">
                <GitHubIcon />{" "}
              </span>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
