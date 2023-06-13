import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import styled from "styled-components";
import ProjectTab from "./Projects";
import CategoryTab from "./categories";

const TabUI = styled.h4`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 20px;
`;

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <TabUI>Projects</TabUI>,
    children: <ProjectTab />,
  },
  {
    key: "2",
    label: <TabUI>Statistic</TabUI>,
    children: <div>"Statistic"</div>,
  },

  {
    key: "3",
    label: <TabUI>Categories</TabUI>,
    children: <CategoryTab />,
  },
];

const TabsManager: React.FC = () => (
  <div>
    <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
  </div>
);

export default TabsManager;
