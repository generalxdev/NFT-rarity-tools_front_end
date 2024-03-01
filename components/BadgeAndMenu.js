import React  from "react";
import { useRouter} from "next/router";
import { Divider, Menu, Row, Button} from "antd";
import Link from "next/link";
import { FaBuffer, FaHandPointRight} from "react-icons/fa";

export function BadgeAndMenu(props)  {
  const router = useRouter();
  const {title, checkedSwitch, showMenu} = props;
  return (
    <Row gutter = {4} className = {"items-center md:hidden"} align = "center">
      <Row gutter = {[0, 0]} align = "middle" className = {"p-4 text-3xl m-4 mb-0 " + (!showMenu ? "" :"hidden")}>
        {/* {title}  */}
        <img src = {checkedSwitch ? "2.png" : "1.png"}></img>
      </Row>
      <Divider className = {"  " + (checkedSwitch?"border-white":"")}></Divider>
      <Menu  className = {"w-5/6 m-8 rounded-md border border-solid border-grey-50 " + (checkedSwitch?"border-white":"")}  theme = { checkedSwitch ? "dark" : "light"}>
        <Menu.Item key = "collection" className = "hover:text-primary">
          <Link href={"/collection"} ><a className = "text-lg"><FaBuffer className = "float-left mt-3 mr-8 items-middle"/>NFT Collections</a></Link></Menu.Item>
        <Menu.Item key = "listed">
          <Link href={"/listed"} ><a className = "text-lg"><FaHandPointRight  className = "float-left mt-3 mr-8 items-middle"/>Get Listed</a></Link></Menu.Item>
      </Menu>
      <Divider className = {"  " + (checkedSwitch?"border-white":"")}></Divider>
    </Row>
  );
};