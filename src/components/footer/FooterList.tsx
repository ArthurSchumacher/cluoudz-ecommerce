import React, { ReactNode } from "react";

interface FooterListProps {
  children: ReactNode;
}

function FooterList({ children }: FooterListProps) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 flex flex-col gap-2 sm:py-0 py-4">
      {children}
    </div>
  );
}

export default FooterList;
