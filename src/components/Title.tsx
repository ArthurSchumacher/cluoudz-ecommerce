import React from "react";

interface TitleProps {
  label: string;
  isUpperCase: boolean;
}

function Title({ label, isUpperCase }: TitleProps) {
  return (
    <div className="flex items-center flex-row sm:py-16 py-8">
      <span className="h-[1.5px] w-full bg-content1" />
      <h1
        className={`text-2xl antialiased min-w-56 md:min-w-80 text-foreground tracking-widest flex-grow text-center font-semibold ${
          isUpperCase ? "uppercase" : "capitalize"
        }`}
      >
        {label}
      </h1>
      <span className="h-[1.5px] w-full bg-content1" />
    </div>
  );
}

export default Title;
