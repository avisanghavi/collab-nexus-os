import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

const DashboardLiftSection = () => {
  return (
    <section className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
      <MacbookScroll
        src="/dashbaord2.png"
        showGradient={false}
      />
    </section>
  );
};

export default DashboardLiftSection;
