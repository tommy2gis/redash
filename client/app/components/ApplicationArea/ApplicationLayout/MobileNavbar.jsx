/**
 * @Author: shitao
 * @Date: 2021-12-30 19:50:37
 * @LastEditTime: 2022-01-04 11:30:20
 * @LastEditors: shitao
 * @Description: 
 * @FilePath: \redash_cn\client\app\components\ApplicationArea\ApplicationLayout\MobileNavbar.jsx
 * @无锡四维时空信息科技有限公司
 */
import { first } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Button from "antd/lib/button";
import MenuOutlinedIcon from "@ant-design/icons/MenuOutlined";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import Link from "@/components/Link";
import { Auth, currentUser } from "@/services/auth";
import settingsMenu from "@/services/settingsMenu";
import logoUrl from "@/assets/images/redash_icon_small.png";

import "./MobileNavbar.less";

export default function MobileNavbar({ getPopupContainer }) {
  const firstSettingsTab = first(settingsMenu.getAvailableItems());

  return (
    <div className="mobile-navbar">
      <div className="mobile-navbar-logo">
        <Link href="./">
          <img src={logoUrl} alt="Redash" />
        </Link>
      </div>
      <div>
        <Dropdown
          overlayStyle={{ minWidth: 200 }}
          trigger={["click"]}
          getPopupContainer={getPopupContainer} // so the overlay menu stays with the fixed header when page scrolls
          overlay={
            <Menu mode="vertical" theme="dark" selectable={false} className="mobile-navbar-menu">
              {currentUser.hasPermission("list_dashboards") && (
                <Menu.Item key="dashboards">
                  <Link href="dashboards">报表</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("view_query") && (
                <Menu.Item key="queries">
                  <Link href="queries">查询</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("list_alerts") && (
                <Menu.Item key="alerts">
                  <Link href="alerts">提醒</Link>
                </Menu.Item>
              )}
              <Menu.Item key="profile">
                <Link href="users/me">个人设置</Link>
              </Menu.Item>
              <Menu.Divider />
              {firstSettingsTab && (
                <Menu.Item key="settings">
                  <Link href={firstSettingsTab.path}>设置</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("super_admin") && (
                <Menu.Item key="status">
                  <Link href="admin/status">系统状态</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("super_admin") && <Menu.Divider />}
              {/* <Menu.Item key="help">
                <Link href="https://redash.io/help" target="_blank" rel="noopener">
                  帮助
                </Link>
              </Menu.Item> */}
              <Menu.Item key="logout" onClick={() => Auth.logout()}>
                退出
              </Menu.Item>
            </Menu>
          }>
          <Button className="mobile-navbar-toggle-button" ghost>
            <MenuOutlinedIcon />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

MobileNavbar.propTypes = {
  getPopupContainer: PropTypes.func,
};

MobileNavbar.defaultProps = {
  getPopupContainer: null,
};
