import React from "react";

interface TitleProps {
  label: string;
  isUpperCase: boolean;
}

function Title({ label, isUpperCase }: TitleProps) {
  return (
    <div className="flex items-center flex-row py-16">
      <span className="h-0.5 w-full bg-neutral-400 flex-shrink" />
      <h1
        className={`text-3xl antialiased text-neutral-900 px-8 flex-grow text-center font-bold ${
          isUpperCase ? "uppercase" : "capitalize"
        }`}
      >
        {label}
      </h1>
      <span className="h-0.5 w-full bg-neutral-400 flex-shrink" />
    </div>
  );
}

export default Title;
