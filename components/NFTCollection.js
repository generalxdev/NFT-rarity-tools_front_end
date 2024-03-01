import React from "react";
import { formatIpfsUrl, ipfs2http } from "../util";
import dateFormat from "dateformat";

export const NFTCollection = ({nft, checkedSwitch, index, keyword}) => {
  return nft.map_url.toLowerCase().split(" ").join("").search(keyword.toLowerCase().split(" ").join("")) == -1 ? null :(
    <div className = " flex flex-col p-2 mb-4 w-full h-full  hover:-translate-y-2 items-center" align = "center">
      <a
        className={"no-underline cursor-pointer rounded-md shadow-xs mr-3 mb-4 sm:mr-4 " 
        + " m-3 text-center  w-full h-full " + (checkedSwitch ? "bg-gray-900 text-white hover:text-white": " hover:text-black bg-blue-200 text-black") } 
            href={`/${nft.map_url }`}
      >
        <img
          src={formatIpfsUrl(nft.image)}
          className="rounded-t-md h-auto bg-black"
        />
        <div className="w-full rounded-b-md py-2 px-2 ">
          <div className = "w-full  text-2xl text-left font-bold el_name">
            {nft.name.toLowerCase() }
          </div>
          <div className = {"px-2 py-1 mt-2 float-left border text-left text-sm border-solid  rounded-md inline-block w-auto " + (!checkedSwitch ? "border-transparent bg-indigo-300":"bg-black border-gray-300")}>
            <img src = '3853.png' className = "h-5 float-left mr-1"/>{"MTV"}
          </div>
          <div className = "w-full  mt-2 text-left text-lg el_3line inline-block">
            {dateFormat(nft.create_date, 'mmm d, yyyy')}
          </div>
        </div>
      </a>
    </div>
  );
};
