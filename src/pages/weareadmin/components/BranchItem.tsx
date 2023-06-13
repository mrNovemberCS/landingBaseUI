import { FlexStyle } from "@/components/common";
import { MainNextImage } from "@/components/common/Images";
import { BASE_URL_API } from "@/utils";
import { Tag } from "antd";
import React from "react";

const BranchItem = ({ item }: { item: { logo: string; name: string } }) => {
  return (
    <div>
      <FlexStyle
        style={{
          justifyContent: "flex-start",
          gap: 10,
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <MainNextImage
          isrc={item?.logo ? `${BASE_URL_API}${item?.logo}` : ""}
          style={{ borderRadius: "50%", width: 35, height: 35 }}
        />
        <Tag>{item?.name}</Tag>
      </FlexStyle>
    </div>
  );
};

export default BranchItem;
