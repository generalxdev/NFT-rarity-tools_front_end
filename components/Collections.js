import { check } from "prettier";
import React , { useState } from "react";

export const Collections = (props) => {
  const {checkedSwitch, nfts, keyword, traits,BufComp} = props;
  return (
    <div className = {"px-4 grid grid-cols-2 4k:grid-cols-8 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 auto-cols-fr -mx-2 svelte-10i0xj7 " + (checkedSwitch?"bg-gray-800 text-white":" bg-gray-100 text-black")}>
     {nfts.map((nft, idx) => (<BufComp nft = {nft} traits = {traits} keyword = {keyword} index = {idx} key = {idx} checkedSwitch = {checkedSwitch}/>))}
    </div>
  );
};