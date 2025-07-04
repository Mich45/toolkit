import React from "react";
import Preview from "@/components/Preview";

export interface Tool {
  title: string;
  description: string;
  url: string;
  imgURL: string;
  category: string[];
}

interface ToolsProps {
  data: Tool[];
}

const Tools: React.FC<ToolsProps> = ({ data }) => {
  console.log("Tools component rendered");

  const results = data.map((data: Tool) => (
    <Preview key={data.title} data={data} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Match Found.</p>
    </article>
  );

  return <>{content}</>;
};
export default React.memo(Tools);
