import React from "react";

interface TitleProps {
  label: string;
  isUpperCase: boolean;
}

function Title({ label, isUpperCase }: TitleProps) {
  return (
    <div className="flex items-center flex-row py-16">
      <span className="h-[1.5px] w-full bg-neutral-300" />
      <h1
        className={`text-2xl antialiased min-w-56 md:min-w-80 text-neutral-900 flex-grow text-center font-bold ${
          isUpperCase ? "uppercase" : "capitalize"
        }`}
      >
        {label}
      </h1>
      <span className="h-[1.5px] w-full bg-neutral-300" />
    </div>
  );
}

export default Title;
