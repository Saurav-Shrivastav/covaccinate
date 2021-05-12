import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  BookOutlined,
  ExportOutlined,
  FileSearchOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { HamburgerContext } from "context/HamburgerContext";
import useOutsideAlerter from "hooks/useOutsideAlerter";

import { MenuWrapper } from "./HamburgerMenu.styles";

const HamburgerMenu: React.FC = () => {
  const { push } = useHistory();
  const { isVisible, setIsVisible } = useContext(HamburgerContext);
  const hamburgerRef = useRef(null);
  useOutsideAlerter(hamburgerRef, setIsVisible);
  return (
    <MenuWrapper isOpen={isVisible} ref={hamburgerRef}>
      <Menu theme="dark" className="menu">
        <Menu.Item
          key="1"
          icon={<NotificationOutlined />}
          onClick={() => {
            push("/");
            setIsVisible(false);
          }}
        >
          Register for Alerts
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<FileSearchOutlined />}
          onClick={() => {
            push("/availabilty");
            setIsVisible(false);
          }}
        >
          Check Vaccine Availability
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<BookOutlined />}
          onClick={() => {
            push("/news");
            setIsVisible(false);
          }}
        >
          Vaccine News
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<ExportOutlined />}
          onClick={() => {
            window.open("https://www.cowin.gov.in/home");
          }}
        >
          Open CoWin
        </Menu.Item>
      </Menu>
    </MenuWrapper>
  );
};

export default HamburgerMenu;
