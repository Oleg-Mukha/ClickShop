import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ThreeDots
        color="#6B7280"
        height={window.innerWidth < 576 ? 350 : 500}
        width={window.innerWidth < 576 ? 350 : 500}
      />
    </div>
  );
};

export default Spinner;
