import Head from "next/head";
import axios from 'axios';
import React, {  useState } from "react";
import {Collapse, Row , Col,Modal, Button , Switch, Radio, Input, Select, Badge, Checkbox} from "antd";
import { NextSeo } from "next-seo";
import { config } from "../config";
import TextField from '@mui/material/TextField';
import { BadgeAndMenu } from "../components/BadgeAndMenu";
import { TwitterAndDiscord } from "../components/TwitterAndDiscord";
import { Collections } from "../components/Collections";
import {FaMoon,FaDiscord,FaTwitter,FaInfoCircle} from "react-icons/fa";
import Navbar from "../components/Navbar";
import {NFT} from "../components/NFT";
import {TraitsInfo} from "../components/TraitsInfo";
import { useRouter } from "next/router";
import { json2query } from "../util";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "@mui/material";
const {Search} = Input;

const HomeList = ({ title,nfts, description,img, info, traits, filters }) => {
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mode, setMode] = useState(true);
  const [nfts_data, setNfts_data] = useState(nfts);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const {from = 1, to = info.maxRank, sort = 'rank asc', search=''} = router.query;



  const [trait, setTrait] = useState("");
  const [postData, setPostData] = useState(router.query);


  const close = () => {
    setModalVisible(false);
  }
  const changeTraits = async (checkedValue) => {
    setTrait(checkedValue.join(","));
    setPostData({...postData, trait : checkedValue.join(",")});
    const {data}= await axios.get(config.SERVERURL + "getNFTInfos?"+json2query({...postData, trait:checkedValue.join(","), page : 1}));
    const {nfts} = data;
    setNfts_data(nfts);
  }

  const moreData = async() => {
    const page = nfts_data.length / 30 +1;
    const {data}= await axios.get(config.SERVERURL + "getNFTInfos?"+json2query({...postData, page:page}));
    const {nfts} = data;
    setNfts_data(nfts_data.concat(nfts));
  }
  const changeMode = (e) => {
    setMode(e.target.value);
  }

  const changeSwitch = (e) => {
    setCheckedSwitch(!e);
  }

  const changeSearch = async(value) => {
    const {data}= await axios.get(config.SERVERURL + "getNFTInfos?"+json2query({...postData, search:value, page : 1}));
    const {nfts} = data;
    setPostData({...postData, search : value});
    setNfts_data((nfts));
    // router.push(
    //   `?${json2query({ ...router.query, search: value, page : 1 })}`)  
  }

  const changeSort = async(value) => {
    const {data}= await axios.get(config.SERVERURL + "getNFTInfos?"+json2query({...postData, sort:value, page : 1}));
    const {nfts} = data;
    setPostData({...postData, sort : value});
    setNfts_data((nfts));
    // router.push(
    // `?${json2query({ ...router.query, sort: value })}`)
  }

  const changeFrom = async(e) => {
    if(e.target.value<1) e.target.value = 1;
    const {to = info.maxRank} = router.query;
    if(e.target.value > to) e.target.value = to;
    const {data}= await axios.get(config.SERVERURL + "getNFTInfos?"+json2query({...postData, from: e.target.value , page : 1}));
    const {nfts} = data;
    setPostData({...postData, from : e.target.value});
    setNfts_data((nfts));
    // router.push(
    //   `?${json2query({ ...router.query, from: e.target.value , page : 1 })}`)
  }
  
  const changeTo = async(e) => {
    if(e.target.value>info.maxRank) e.target.value = info.maxRank;
    const {from = 1} = router.query;
    if(e.target.value<from) e.target.value = from;
    const {data}= await axios.get(config.SERVERURL + "getNFTInfos?"+json2query({...postData, to: e.target.value , page : 1}));
    const {nfts} = data;
    setPostData({...postData, to : e.trait.value});
    setNfts_data((nfts));
    // router.push(
    //   `?${json2query({ ...router.query, to : e.target.value , page : 1 })}`)
  }
  return (
    <Row>
        <Head>
          <title>{title + " I " + info.name}</title>
          <link rel="icon" href="/3853.png" />
        </Head>
        <NextSeo
          title={info.name}
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
        <Col align = "center" className = {"overflow-auto z-20  leftPanel w-full h-screen md:block md:w-72 " +(showMenu ? "block " : "hidden ") +  (checkedSwitch?"bg-gray-900 text-white darkMode":"bg-white text-black")}>
            <BadgeAndMenu title={title} checkedSwitch = {checkedSwitch} showMenu = {showMenu} />
            <Row className = "w-5/6" align = "center">
              <Row className = "w-full">
                <Radio.Group className = "w-full" defaultValue = {mode} size = "large" buttonStyle="solid"
                  onChange={(e) => {changeMode(e);}}
                >
                  <Radio.Button className = "w-3/6" value = {true}>Ranking</Radio.Button>
                  <Radio.Button className = "w-3/6" value = {false}>Traits</Radio.Button>
                </Radio.Group>
              </Row>
            </Row>
            {mode?
            <Row className = "w-5/6" align = "center">
                <div className = "text-bold mt-4 text-lg text-left mb-4 w-full labels">CHECK YOUR ID</div>
                <Search defaultValue={search} className = "rounded-md" placeholder = "Enter Your ID" enterButton = "CHECK" size = "large"
                  onSearch={changeSearch}
                ></Search>
                <div className = "text-bold mt-4 text-lg text-left mb-4 w-full  labels">SORT</div>
                <Select
                  defaultValue={sort}
                  className = "w-full rounded-md text-left"
                  showSearch
                  optionFilterProp="children"
                  onChange={changeSort}
                  dropdownClassName = {checkedSwitch?"darkDropDown":""}
                  filterOption = {(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase())>=0}
                >
                  <Select.Option value = "rank asc">Rank: Low to high</Select.Option>
                  <Select.Option value = "rank desc">Rank: High to Low</Select.Option>
                  <Select.Option value = "id asc">ID: Low to high</Select.Option>
                  <Select.Option value = "id desc">ID: High to Low</Select.Option>
                </Select>
                <div className = "text-bold mt-4 text-lg text-left mb-4 w-full labels">RANK</div>
                <Row className = "w-full block">
                  <TextField
                    label="FROM"
                    type="number"
                    className = "w-5/12 text-sm p-0 block float-left"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange = {changeFrom}
                    defaultValue = {from}
                    size = "small"
                  />            
                  <TextField
                    label="TO"
                    type="number"
                    className = "w-5/12 text-sm p-0 block float-right"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange = {changeTo}
                    defaultValue = {to}
                    size = "small"
                  />
                  </Row>           
                  <div className = "text-bold mt-4 text-lg text-left mb-4 w-full labels">TRAITS</div>
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
            </Row>
            :<></>}
            <TwitterAndDiscord checkedSwitch = {checkedSwitch}/>
            <Row className = "w-5/6 h-14 items-center border border-solid border-grey-50 rounded-md" align = "center">
              <Button className = {"w-full rounded-md m-2 border-none bg-transparent " + (checkedSwitch ? "text-white" : "text-black")}>
                <FaMoon className = "m-1 float-left"/>Dark Mode
                <Switch defaultChecked className = {"switch float-right"} onChange={changeSwitch}/>
              </Button>
            </Row>
        </Col>
        <Col className = {"collection h-screen md:w-remain w-full md:block  -mx-1 z-10 " + (!showMenu ? "block " : "hidden ")  + (!checkedSwitch ? " bg-gray-100":" bg-gray-800 darkMode")}>
        {
            mode?
          <InfiniteScroll
              className={(!checkedSwitch ? " ":"  darkMode")}
              dataLength={nfts_data.length}
              next = {moreData}
              height = {"100vh"}
              hasMore = {nfts_data.length % 30 == 0}
              loader = {<p className="text-xs">Loading...</p>}
          >
          <Row gutter={0} className = {"text-white w-full p-12 pb-3" + (!checkedSwitch ? " bg-indigo-500":" bg-gray-700")}>
              <h1 className = {"text-5xl mb-1 " + (!checkedSwitch ? " text-black " : " text-white ")}>{info.name.toUpperCase()}</h1>
              <div className = "font-normal block text-2xl w-full">
              {"NFT Rarity Ranking"}
            </div>
            <div className="border border-solid border-white rounded-md p-2 my-4">
                <span className="border-r border-solid border-white px-2 pr-6 text-xl">{info.cnt} items</span><span className="px-2 pl-6 text-xl">{info.minted_cnt} minted</span>
              </div>
              <div className="links text-white md:padding">
                <Link href = {info.discord_url}><FaDiscord></FaDiscord></Link>
                <Link href = {info.twitter_url}><FaTwitter></FaTwitter></Link>
                <Link onClick={() => {setModalVisible(true)}}><FaInfoCircle></FaInfoCircle></Link>
                <Modal className = {"modal-width linkModal " + (checkedSwitch? "darkMode":"")} visible = {modalVisible} footer = {null} title = {"Description about " + info.name} onOk={close} onCancel={close}>
                  <Row className = "modalinfo">
                    {info.description}
                  </Row>
                </Modal>
              </div>
          </Row>      
          <Collections BufComp = {NFT} checkedSwitch = {checkedSwitch} nfts = {nfts_data} mode = {mode} traits = {traits}/> 
          </InfiniteScroll>
            :
          <Row className={"w-full overflow-auto h-screen" + (checkedSwitch ? " darkMode":"")}>
            <Row gutter={0} className = {"text-white w-full p-12 pb-3" + (!checkedSwitch ? " bg-indigo-500":" bg-gray-700")}>
              <h1 className = {"text-5xl mb-1 " + (!checkedSwitch ? " text-black " : " text-white ")}>{info.name.toUpperCase()}</h1>
              <div className = "font-normal block text-2xl w-full">
                {"NFT Trait List"}
              </div>
              <div className="border border-solid border-white rounded-md p-2 my-4">
                <span className="border-r border-solid border-white px-2 pr-6 text-xl">{info.cnt} items</span><span className="px-2 pl-6 text-xl">{info.minted_cnt} minted</span>
              </div>
              <div  className="links text-white md:padding">
                <Link href = {info.discord_url}><FaDiscord></FaDiscord></Link>
                <Link href = {info.twitter_url}><FaTwitter></FaTwitter></Link>
                <Link onClick={() => {setModalVisible(true)}}><FaInfoCircle></FaInfoCircle></Link>
                <Modal className = {"modal-width linkModal " + (checkedSwitch? "darkMode":"")} visible = {modalVisible} footer = {null} title = {"Description about " + info.name} onOk={close} onCancel={close}>
                  <Row  className = "modalinfo">
                    {info.description}
                  </Row>
                </Modal>
              </div>
            </Row>
            <TraitsInfo traits = {traits} checkedSwitch = {checkedSwitch}/>
          </Row>
          }
        </Col>
      </Row>
  );
}

HomeList.getInitialProps = async ({ query }) => {
  const {data}= await axios.get(config.SERVERURL + "getNFTInfos?"+json2query(query));
  const {nfts, info, traits} = data;
  return {      
     title: config.COLLECTION_TITLE,
     nfts,
     info,
     traits
    };
};

export default HomeList;
