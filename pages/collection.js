import Head from "next/head";
import axios from 'axios';
import { DebounceInput } from "react-debounce-input";
import React, { useState } from "react";
import {Row , Col, Button , Switch} from "antd";
import { NextSeo } from "next-seo";
import { config } from "../config";
import { BadgeAndMenu } from "../components/BadgeAndMenu";
import { TwitterAndDiscord } from "../components/TwitterAndDiscord";
import { Collections } from "../components/Collections";
import {FaMoon} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { NFTCollection } from '../components/NFTCollection';

const HomeCollection = ({ title, description,img, pages, filters }) => {
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const changeSwitch = (e) => {
    setCheckedSwitch(!e);
  }
  const [nfts, setNfts] = useState([])
  if(nfts.length == 0)
  axios.get(config.SERVERURL + "getCollections").then((res)=>{
    setNfts(res.data);
  }

  );
  return (
    <Row>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/3853.png" />
        </Head>
        <NextSeo
          title={title}
          openGraph={{
            images: [
              {
                url: img,
              },
            ],
          }}
          twitter={{
            image: img,
            cardType: "summary_large_image",
          }}
          description={description}
        />
        <Navbar
          title={title}
          menu={true}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
        />
        <Col align = "center" className = {" w-full md:block md:w-72 " +(showMenu ? "block " : "hidden ") + (checkedSwitch?"bg-gray-900 text-white darkMode":"bg-white text-black")}>
            <BadgeAndMenu title={title} checkedSwitch = {checkedSwitch} />
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              className={"p-2 pl-6  rounded-md w-5/6 text-lg m-4 border border-solid " + (checkedSwitch?"bg-gray-900 hover:bg-gray-600 text-white border-white":"bg-white hover:bg-blue-100 border-grey-100 text-black")}
              placeholder="Search Collections..."
              onChange={e => { setKeyword(e.target.value);  }}
            />
            <TwitterAndDiscord checkedSwitch = {checkedSwitch}/>
            <Row className = "w-5/6 h-14 items-center border border-solid border-grey-50 rounded-md" align = "center">
              <Button className = {"w-full rounded-md m-2 border-none bg-transparent " + (checkedSwitch ? "text-white" : "text-black")}>
                <FaMoon className = "m-1 float-left"/>Dark Mode
                <Switch defaultChecked className = {"switch float-right"} onChange={changeSwitch}/>
              </Button>
            </Row>
        </Col>
        <Col className = {"md:w-remain w-full md:block " + (!showMenu ? "block " : "hidden ") + (!checkedSwitch ? " bg-gray-100":" bg-gray-800 darkMode")}>
          <Row gutter={16} className = {"text-white p-12 " + (!checkedSwitch ? " bg-indigo-500":" bg-gray-700")}>
            {<h1 className = {"text-5xl" + (!checkedSwitch ? " text-white " : " text-white ")}>NFT Collections</h1>}
            <div className = "font-normal block text-2xl w-full">
              {nfts.length} collections
            </div>
          </Row> 
          <Collections BufComp = {NFTCollection} checkedSwitch = {checkedSwitch} nfts = {nfts} keyword = {keyword} />
        </Col>
      </Row>
  );
}

HomeCollection.getInitialProps =  ({ query }) => {
  //const {data}= await axios.get(config.SERVERURL + "getCollections");

  return {
      title: config.COLLECTION_TITLE,
      //nfts : data
    };
};

export default HomeCollection;
