import React  from "react";
import { Divider, Row, Button} from "antd";
import {FaTwitter, FaDiscord} from "react-icons/fa";

export function TwitterAndDiscord(props)  {
  const { checkedSwitch} = props;
  return (
    <Row gutter = {4} className = {"items-center md:hidden"} align = "center">
      <Divider className = {"  " + (checkedSwitch?"border-white":"")}></Divider>
      <Row className = {' text-lg text-left w-5/6 font-semibold text-gray-700 ' + (checkedSwitch ? "text-white" : "text-black")}>
        JOIN OUR COMMUNITY
      </Row>
      <Row className = "w-full" align = "center">
        <Button className = {"w-5/6  rounded-md m-2 " + (checkedSwitch?"border-white":"")}  type = "primary" ghost>
          <a href = "/twitter"><FaTwitter className = "float-left m-1"/>Twitter      |      373k followers</a>
        </Button>
        <Button className = {"w-5/6  rounded-md m-2 border-purple-600 " + (checkedSwitch?"border-white":"")} ghost type = "danger">
          <a href = "/discord"><FaDiscord className = "float-left m-1"/>Discord      |      300k followers</a>
        </Button>
      </Row>
      <Divider className = {"  " + (checkedSwitch?"border-white":"")}></Divider>
    </Row>
  );
};
