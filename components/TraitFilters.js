import React, { useState } from "react";
import { Collapse, Row, Checkbox, Badge } from 'antd';
import { useRouter } from "next/router";
import { json2query } from "../util";

export const TraitFilters = ({traits}) => {
  const router  = useRouter();
  const [nfts_data, setNfts_data] = useState([]);
  
  const {trait = ""} = router.query;

  const changeTraits = (checkedValue) => {
    setNfts_data([]);
    router.push(
      `?${json2query({ ...router.query, trait: checkedValue, page : 1  })}`
    )
  }

  return (
    <Collapse className="w-full collapse" onChange={() => {}}>
      {
      traits.map((each) => {
        const temp = JSON.parse(each.detail);
        const subinfo = temp.map(each => {
          const cnt = each.label.split("::");
          return {...each, label : <span>{cnt[0]}<span>{cnt[1]}</span></span>}
        });
        return <Collapse.Panel header = {<span className = "w-full text-left">{each.trait_type } <Badge className="float-right"> {subinfo.length}</Badge></span> }> 
                <Checkbox.Group className = "w-full block " value = {trait.split(",")} options = {subinfo} onChange = {changeTraits}/>
        </Collapse.Panel>
      })
      }
    </Collapse>
  );
};
