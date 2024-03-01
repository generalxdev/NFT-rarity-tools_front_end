import React, {useState} from "react";
import { formatIpfsUrl } from "../util";
import { Col, Modal, Row, Table } from 'antd';
import { check } from "prettier";

export const NFT = ({nft, traits, checkedSwitch}) => {
  const [modalVisible,setModalVisible] = useState();
  const traits_organ = traits.map((each) => {
    const temp = JSON.parse(each.detail);
    const subinfo = temp.map((each1,idx) => {
      const cnt = each1.label.split("::");
      return {...each1, label : cnt[0],cnt : cnt[1], idx : idx + 1 }
    });
    return {...each, detail : subinfo}
  })
  //console.log(traits_organ);
  if(!nft) return (<div></div>)
  const traits_detail = JSON.parse(nft.traits_info);
  const traits_info = traits_detail.map(each => {
    const {trait_type, value} = each;
    const {detail} = traits_organ.find((el) => el.trait_type == trait_type);
    const {cnt} = detail.find((el) => el.label == value);
    return {...each, occu : cnt}
  })
  const columns = [
    {
      title : 'TYPE',
      dataIndex : 'trait_type',
      sorter : (a, b) => a.trait_type.localeCompare(b.trait_type),
      width : 100,
      className : "text-base font-bold font-lato"
    },
    {
      title : 'VALUE',
      dataIndex : 'value',
      sorter : (a, b) => a.value.localeCompare(b.value),
      width : 200,
      className : "text-base font-bold font-lato"
    },
    {
      title : 'SCORE',
      dataIndex : 'rarity',
      sorter : (a, b) => a.rarity - b.rarity,
      width : 80,
      className : "text-base font-lato"
    },
    {
      title : 'OCCURRENCES',
      dataIndex : 'occu',
      align : "right",
      sorter : (a, b) => a.occu - b.occu,
      width : 20,
      className : "text-base font-lato"
    }
  ]
  
  const show = () =>{
    setModalVisible(true);
  }
  const close = () =>{
    setModalVisible(false);
  }

  return (
    <div className = "flex flex-col p-2 mb-4 w-full h-full hover:-translate-y-2 items-center" align = "center">
      <Modal className = {"modal-width " + (checkedSwitch ? "darkMode bg-gray-800 darkMode" : "")} visible = {modalVisible} footer = {null} title = {nft.name} onOk={close} onCancel={close}>
        <Row className={"w-full h-full" + (checkedSwitch ? " bg-gray-700":"")}>
          <Col className = " h-full  md:image  md:height float-left">
            <img src={formatIpfsUrl(nft.image)} className = "image rounded-bl-xl w-full h-full"></img>
          </Col>
          <Col className = "md:w-fixed h-full pr-2 pl-2   md:image  md:height w-full float-left">
            <Row className="w-full ">
              <Col span = {12}>
                <Row className = "text-4xl pl-4 font-extrabold text-gray-600">{"RANK  " + nft.rank}</Row>
                <Row className="text-3xl mt-1 font-bold pl-4">{"#" + nft.id}</Row>
              </Col>
              <Col span = {12} className="text-right font-bold text-lg">
               
                <Row className="mt-12">Rarity Score {nft.rarity}</Row>
              </Col>
            </Row>
            <Row className={(checkedSwitch ? "bg-gray-800":"bg-blue-400") + " text-white py-4 pl-4 text-xl"}>
              TRAITS ({traits_info.length} categories)
            </Row>
            <Table rowClassName={(re, index)=>(index%2==0?"tr-alt":"")} className = {" temp tableClass bg-transparent  text-2xl " + (checkedSwitch? "darkMode":"")} dataSource={traits_info} columns = {columns} size = "small" pagination = {false}/>
          </Col>
        </Row>
      </Modal>
      <div
        className={"no-underline cursor-pointer rounded-md shadow-xs mr-3 mb-4 sm:mr-4 " 
        + " m-3 text-center  w-full h-full " + (checkedSwitch ? "bg-gray-900 text-white hover:text-white": " hover:text-black bg-blue-200 text-black") } 
        onClick={show}
      >
        <img
          src={formatIpfsUrl(nft.image)}
          className="rounded-t-md h-auto bg-black"
        />
        <div className="w-full rounded-b-md py-2 px-2 ">
          <div className = "w-full  text-2xl text-left font-bold text-nft">
            { "RANK  " + nft.rank }
          </div>
          <div className = "w-full font-medium text-left text-xl">
            {"#" + nft.id}
          </div>
          <div className = "w-full   text-left text-md">
            {"Score " + nft.rarity}
          </div>
        </div>
       </div>
    </div>
  );
};
