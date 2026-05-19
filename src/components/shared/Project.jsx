import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-between py-10 px-4 group cursor-pointer border-b border-neutral-800/50 hover:bg-neutral-900/40 transition-all"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <h3 className="text-2xl font-medium text-white group-hover:text-neutral-300 transition-colors">
            {title}
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {tags && tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-1.5">
                <span className="text-sm text-neutral-400 font-light">
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsHidden(true);
          }}
          className="flex items-center gap-2 bg-neutral-900 px-5 py-2.5 rounded-full border border-neutral-800 hover:border-neutral-600 transition-all text-white text-sm"
        >
          Read More
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;