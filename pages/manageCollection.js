import Head from "next/head";
import React, {useState} from "react";
import {Button, notification, Row , Table} from "antd";
import {config} from "../config/index"
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router";

const ManageCollection = ({ user, pwd}) => {
  const [logStatus, setLogStatus] = useState(false);
  const [logData, setLogData] = useState({id : '', pwd : ''});
  const [tableData, setTableData] = useState([]);
  const [selectedKey, setSelectedKey] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const onLogin = async() => {
    if(user == logData.id && pwd == logData.pwd){
      const {data} = await axios.get(config.SERVERURL + "getRequestCollections");
      setTableData(data);
      setLogStatus(true);
    }else{
      notification["error"]({
        message : "Login Failed",
        description : "Incorrect User Id or Password"
      });
    }
  }
  const column = [{
    title : "Id",
    dataIndex : "id",
    width: "0%"
  },{
    title : "Name",
    dataIndex : "name",
    width: "10%",
    sorter : (a, b) => a.name.localeCompare(b.name)
  },{
    title : "Discord Name",
    dataIndex : "discord_name",
    width: "15%"
  },{
    title : "Discord",
    dataIndex : "discord_url",
    width: "20%",
    render : a => <a target='_blank' href = {"https://"+a}>{a}</a>
  },{
    title : "Twitter",
    dataIndex : "twitter_url",
    width: "25%",
    render : a => <a target='_blank' href = {"https://"+a}>{a}</a>
  },{
    title : "Total Count",
    dataIndex : 'count',
    width : "10%"
  },{
    title : "Request Date",
    dataIndex : 'create_date',
    width : '20%',
    render : a => a.substring(0,10)
  }];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
     console.log(selectedRowKeys);
     setSelectedKey(selectedRowKeys);
    }
  };
  const clickAccept = async () => {
    if(selectedKey.length == 0){
      notification.info({
        message : "Message",
        description : "Select some rows"
      });
      return;
    }else{
      const {data} = await axios.post(config.SERVERURL + "acceptCollections", {row : selectedKey.join(',')});
      //const temp = JSON.parse(data.split("}{").join("},{"))
      // notification.success({
      //   message : "Message",
      //   description : JSON.stringify(temp)
      // })
      data.map(each => {
        notification[each.mode]({
          message : "Message",
          description : JSON.stringify(each.msg)
        })
      })
      onLogin();
    }
    
  }
  return (
    <Row className="item-align align-middle w-screen" align = 'center'>
      <Head>
          <title>{"manage collection"}</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        logStatus ? 
        <Row className = "w-5/6 mt-6">
          <Row>
            <Button type = "primary" onClick={clickAccept}>Accept</Button>
          </Row>
          <Table className = "w-full"
            dataSource={tableData}
            columns = {column}
            rowSelection = {rowSelection}
          />
        </Row>
        :
        <Row className = "w-48 mt-10">
          <form onSubmit = {handleSubmit(onLogin)}>
            <TextField label = "User ID" onChange={e=>setLogData({...logData, id : e.target.value})}></TextField>
            <TextField label = "Password" type = "password" onChange={e=>setLogData({...logData, pwd : e.target.value})}></TextField>
            <button type = "submit">Login</button>
          </form>
        </Row>
      }
    </Row>
  );
}

ManageCollection.getInitialProps = async ({ query }) => {
  return {
    user : config.USER,
    pwd : config.PWD,
  };
};

export default ManageCollection;
