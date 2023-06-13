import { parseTimestamp } from "@/utils/parser";
import { FlexStyle, TitleColumn } from "../common";
import BranchItem from "@/pages/weareadmin/components/BranchItem";
import {
  ObjectParam,
  getMatchingKeys,
  socialIconList,
} from "@/components/common/SocialIcon";
import styled from "styled-components";
import Link from "next/link";
import { CheckBoxComp, InputWrapper } from "../common/AntComp";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Checkbox, Popconfirm, Tag } from "antd";
import { ProjectStatus } from "@/utils/enums";
import VerifyComp from "../common/VerifyComp";
import { MainNextImage } from "../common/Images";
import { BASE_URL_API, baseDefaultUrl } from "@/utils";

export const mappingDatawKey = (arr: Array<any>) => {
  if (!arr) return [];
  return arr.map((item: any, idx: number) => ({
    ...item,
    key: idx,
    action: item,
    stt: idx + 1,
  }));
};

export const columnProjectData = (_onEditForm: Function) => [
  {
    title: <TitleColumn title="stt" />,
    dataIndex: "stt",
    key: "stt",
    responsive: ["xs", "sm"],
    width: "50px",
  },
  {
    title: <TitleColumn title="created" />,
    dataIndex: "createdAt",
    key: "createdAt",
    responsive: ["xs", "sm"],
    render: (item: string) => {
      return <div>{parseTimestamp(item)}</div>;
    },
  },
  {
    title: <TitleColumn title="name" />,
    dataIndex: "action",
    key: "action",
    responsive: ["xs", "sm"],
    render: (item: any) => {
      return <BranchItem item={item} />;
    },
  },
  {
    title: <TitleColumn title="Social network" />,
    dataIndex: "action",
    key: "action",
    responsive: ["xs", "sm"],
    render: (item: any) => {
      const list = getMatchingKeys(item);
      return (
        <FlexStyle
          style={{
            gap: 8,
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {list?.map((icon: ObjectParam, idx: number) => {
            return (
              <LinkCustom key={idx} legacyBehavior href={icon?.value}>
                <a target="_blank" rel="noopener noreferrer">
                  <WrapperLinking className="icon-social">
                    {socialIconList[icon.key]}
                  </WrapperLinking>
                </a>
              </LinkCustom>
            );
          })}
        </FlexStyle>
      );
    },
  },
  {
    title: <TitleColumn title="short description" />,
    dataIndex: "short_description",
    key: "short_description",
    width: 180,
    ellipsis: true,
    render: (data: string) => {
      return (
        <InputWrapper.TextArea
          value={data}
          style={{ border: "none", height: 50 }}
        />
      );
    },
  },
  {
    title: <TitleColumn title="description" />,
    dataIndex: "description",
    key: "description",
    width: 180,
    ellipsis: true,
    render: (data: string) => {
      return (
        <InputWrapper.TextArea
          value={data}
          style={{ border: "none", height: 50 }}
        />
      );
    },
  },
  {
    title: <TitleColumn title="categories" />,
    dataIndex: "categories",
    key: "categories",
    responsive: ["xs", "sm"],
    render: (data: Array<any>) => {
      return (
        <FlexStyle
          style={{ gap: 8, justifyContent: "flex-start", flexWrap: "wrap" }}
        >
          {data.map((item: any, idx: number) => {
            return <Tag key={idx}>{item?.name}</Tag>;
          })}
        </FlexStyle>
      );
    },
  },
  {
    title: <TitleColumn title="status" />,
    dataIndex: "status",
    key: "status",
    responsive: ["xs", "sm"],
    render: (status: string) => {
      return (
        <div>
          {status === ProjectStatus.REGISTERED ? (
            <Tag color="#87d068">{status}</Tag>
          ) : (
            <Tag color="#f50">{status}</Tag>
          )}
        </div>
      );
    },
  },
  {
    title: <TitleColumn title="verify status" />,
    dataIndex: "action",
    key: "action",
    responsive: ["xs", "sm"],
    render: (item: any) => {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(128,128,128,.5)",
            padding: "2px",
            borderRadius: 4,
          }}
        >
          <div>
            <VerifyComp
              item={item}
              style={{
                width: 20,
                height: 20,
              }}
              warningStyle={{
                width: 20,
                height: 20,
              }}
            />
          </div>
          {item?.isNativeBase && (
            <div
              style={{
                width: 20,
                height: 20,
                flex: 1,
              }}
            >
              <MainNextImage
                style={{
                  width: "100%",
                  height: "100%",
                }}
                isrc={`${BASE_URL_API}${baseDefaultUrl}`}
              />
            </div>
          )}
        </div>
      );
    },
  },
  {
    title: <TitleColumn title="Option" />,
    dataIndex: "action",
    key: "action",
    responsive: ["xs", "sm"],
    render: (item: string) => {
      return (
        <FlexStyle style={{ gap: 15, justifyContent: "flex-start" }}>
          <FlexItemEdit>
            <CheckBoxComp
              checkItem={item}
              cb={() => _onEditForm("STATUS", item)}
            />
          </FlexItemEdit>
          <FlexItemEdit>
            <AiFillEdit
              style={{ fontSize: 20, color: "blue" }}
              onClick={() => _onEditForm("EDIT", item)}
            />
          </FlexItemEdit>
          <FlexItemEdit>
            <Popconfirm
              title="Delete this project ?"
              onConfirm={() => _onEditForm("DELETE", item)}
            >
              <AiFillDelete style={{ fontSize: 20, color: "blue" }} />
            </Popconfirm>
          </FlexItemEdit>
        </FlexStyle>
      );
    },
  },
];

const FlexItemEdit = styled.div`
  flex: 1;
`;

const LinkCustom = styled(Link)`
  color: #1677ff;
  text-transform: capitalize;
`;

export const WrapperLinking = styled.span`
  svg {
    font-size: 22px;
    color: gray;
    transition: all 0.3s ease;
  }
  &:hover {
    svg {
      color: blue;
    }
  }
`;
