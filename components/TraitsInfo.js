import React from "react";
import { Collapse, Row, Checkbox, Badge, Table } from 'antd';
import { useRouter } from "next/router";
import { json2query } from "../util";
import { width } from "@mui/system";

export const TraitsInfo = ({traits, checkedSwitch}) => {
  var totalcnt = 0;
  const traits_organ = traits.map((each) => {
    const temp = JSON.parse(each.detail);
    const subinfo = temp.map((each1,idx) => {
      const cnt = each1.label.split("::");
      return {...each1, label : cnt[0],cnt : cnt[1], idx : idx + 1 }
    });
    totalcnt += subinfo.length
    return {...each, detail : subinfo}
  })

  const column = [{
    title : "RANK",
    dataIndex : 'idx',
    sorter : (a, b) => a.idx - b.idx,
    width : 20,
    fixed : true,
    className : 'font-bold'
  },{
    title : "VALUE",
    dataIndex : "label",
    sorter : (a, b) => a.label.localeCompare(b.label),
    width : 200,
    fixed : true,
    className : 'font-bold'
  },{
    title : "SCORE",
    dataIndex : 'rarity',
    sorter : (a, b) => a.score - b.score,
    width : 100,
    fixed : true
  },{
    title : "OCCURRENCES",
    dataIndex : "cnt",
    sorter : (a, b) => a.cnt - b.cnt,
    fixed : true,
    width : 120,
    align : "right"
  },{

  }]
  const sorted = traits_organ.sort((a, b) => a.detail.length - b.detail.length);
  return (
    <Row className={"w-full svelte-10i0xj7 "+(checkedSwitch?"bg-gray-800 text-white":" bg-gray-200 text-black")}>
      <Row className={" p-3 pl-12 pt-2 w-full font-bold text-3xl " +(checkedSwitch?"bg-gray-700 text-white":" bg-gray-200 text-black")}>
        {sorted.length} trait categories ({totalcnt} traits)
      </Row>
      {
        sorted.map((each) => 
          <Row className = {"w-full mx-10 text-lg"}>
            <Row className = {"w-full  font-bold p-4 rounded-t-xl " + (checkedSwitch ? "bg-gray-500":"bg-gray-700 text-white")}>{each.trait_type + "(" + each.detail.length + " traits)" }</Row>
            <Table rowClassName = {(record,index) => (index % 2 == 0?"tr-alt":"")} tableLayout="" size = "small" className={"w-full bg-transparent "+(checkedSwitch ? "":"")} dataSource={each.detail} columns = {column} pagination = {false}></Table>
          </Row>
        )
      }
    </Row>
  );
};
