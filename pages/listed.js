import Head from "next/head";
import React, {useState} from "react";
import {Row , Radio, Col, notification, Button } from "antd";
import {config} from "../config/index"
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

const HomeListed = ({ title, img, description, nfts, pages, filters }) => {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState({start_from:1});
  const submitForm = () => {
    axios.post(config.SERVERURL + 'saveCollection', formData).then((response) => {
      const {error = null, success = null} = response.data;
      if(error) {notification["error"]({
        message : 'Operation Error',
        description : error
      });}
      if(success){
        notification["success"]({
          message : "Operation Success",
          description : "Data is inserted exactly!!!",
          duration : 3
        });
        window.location.href = '/';
      }
    });
  } 
  return (
    <Row className="item-align align-middle w-screen form_bg " align = 'center'>
        <Head>
          <title>{title  + "-Get Listed"}</title>
          <link rel="icon" href="/3853.png" />
        </Head>
        <form className = "w-form border border-solid border-gray-200 block p-0 m-12 bg-white rounded-md " onSubmit = {handleSubmit(submitForm)}>
            <Row className = "w-full p-4 py-10 mt-0 text-white text-4xl font-extrabold bg-indigo-500 rounded-t-md">
              PUNK TOOL REGISTER
            </Row>
          <Row className="height-form p-3">
            <Row className = "w-full p-4 mt-2">
                <TextField className = "w-full" classes={{height : "20px"}}
                required  
                onChange={(e) => {setFormData({...formData, name : e.target.value})}}
                inputProps={ { 'shrink':'true' }} 
                placeholder="Input your collection name."
                label = {"Collection Name"}
                />
              </Row>
              <Row className = "w-full p-4 mt-2">
                <TextField className = "w-full"
                id = "sc_url"
                name = "sc_url"
                onChange={(e) => {setFormData({...formData, sc_url : e.target.value})}}
                required  
                inputProps={ { 'shrink':'true' }} 
                placeholder="Input your smart contract address."
                label = {"Smart Contract Address"}
                />
              </Row>
              <Row className="w-full p-4 mt-2">
                <Col className="py-3 px-3 min-100" span = {5}>
                  Start From
                </Col>
                <Col className="py-1 min-100" span = {5}>
                  <Radio.Group label = {"Start From"} className = "w-24" defaultValue = {1} size = "large" buttonStyle="solid"
                  onChange = {(e) => {setFormData({...formData, start_from : e.target.value})}}
                  >
                      <Radio.Button className = "w-3/6" value = {1}>1</Radio.Button>
                      <Radio.Button className = "w-3/6" value = {0}>0</Radio.Button>
                  </Radio.Group>  
                </Col>
                <Col className="py-3 min-100">
                  (Your NFTs start with ...)
                </Col>
              </Row>
              <Row className="w-full p-4 mt-2">
                  <TextField className = "w-full"
                  required  
                  name = "count"
                  id = "count"
                  onChange={(e) => {setFormData({...formData, count : e.target.value})}}
                  type = "number"
                  inputProps={ { 'shrink':'true' }} 
                  placeholder="Input count."
                  label = {"Total Count"}
                  />
              </Row>
              <Row className = "w-full p-4 mt-2">
                <TextField className = "w-full"
                required  
                name = "discord_url"
                id = "discord_url"
                onChange={(e) => {setFormData({...formData, discord_url : e.target.value})}}
                inputProps={ { 'shrink':'true' }} 
                placeholder="Input your discord url."
                label = {"Discord Url"}
                />
              </Row>
              <Row className = "w-full p-4 mt-2">
                <TextField className = "w-full"
                required  
                name = "discord_name"
                id = "discord_name"
                onChange={(e) => {setFormData({...formData, discord_name : e.target.value})}}
                inputProps={ { 'shrink':'true' }} 
                placeholder="Input your discord name."
                label = {"Discord Name"}
                />
              </Row>
              <Row className = "w-full p-4 mt-2">
                <TextField className = "w-full"
                required  
                name = "twitter_url"
                id = "twitter_url"
                onChange={(e) => {setFormData({...formData, twitter_url : e.target.value})}}
                inputProps={ { 'shrink':'true' }} 
                placeholder="Input your twitter url."
                label = {"Twitter Url"}
                />
              </Row>
            </Row>
            <Row className="p-6 pr-10 mb-10 w-full block">
              <button type="submit" className="ant-btn ant-btn-primary float-right"><span>Submit</span></button>
              <Button type = "danger" className = " mr-6 float-right"><a href = "/listed">Reset</a></Button>
            </Row>
          </form>
    </Row>
  );
}

HomeListed.getInitialProps = async ({ query }) => {
  
  return {
    title: config.COLLECTION_TITLE,
    description: config.COLLECTION_DESCRIPTION,
    img: config.COLLECTION_IMG_LINK,
  };
};

export default HomeListed;
