import { sharelink } from "@/utils";
import { parseTimestamp } from "@/utils/parser";
import { Divider, Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";
import { FlexStyle } from "../common";
import SocialList from "./SocialList";

export interface ISocialsnSharePrpops {
  data: any;
}

const SocialsnShare = (props: ISocialsnSharePrpops) => {
  const { data } = props;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div>
            <Link legacyBehavior href="https://tally.so/r/w8zNOk">
              <a target="_blank" rel="noopener noreferrer">
                <FlexStyle style={{ justifyContent: "flex-start", gap: 10 }}>
                  <BiEdit />
                  <span> Edit Project</span>
                </FlexStyle>
              </a>
            </Link>
          </div>
          <Divider plain style={{ margin: "8px 0" }}>
            <span style={{ fontSize: 10, opacity: "0.7" }}>last update</span>
          </Divider>
          <div style={{ whiteSpace: "nowrap" }}>
            {parseTimestamp(data?.updatedAt, "YYYY-MM-DD hh:mm:ss A")}
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <FlexStyle style={{ justifyContent: "flex-end", gap: 5 }}>
        <Sharing>
          <div className="item dark-item visit">
            {data?.website ? (
              <Link legacyBehavior href={data?.website}>
                <a target="_blank" rel="noopener noreferrer">
                  visit website
                </a>
              </Link>
            ) : (
              "visit website"
            )}
          </div>
          <div className="item dark-item app">
            {data?.dAppUrl ? (
              <Link legacyBehavior href={data?.dAppUrl}>
                <a target="_blank" rel="noopener noreferrer">
                  DApp
                </a>
              </Link>
            ) : (
              "DApp"
            )}
          </div>
        </Sharing>
        <Sharing>
          <div className="item bg-opacity app">
            <Link legacyBehavior href={sharelink(data.name, data.slug_name)}>
              <a target="_blank" rel="noopener noreferrer">
                Share
              </a>
            </Link>
          </div>
          <div className="item bg-opacity app">
            <Dropdown menu={{ items }} placement="bottomRight">
              <BsThreeDotsVertical />
            </Dropdown>
          </div>
        </Sharing>
      </FlexStyle>
      <SocialList data={data} />
    </div>
  );
};

export default SocialsnShare;

export const Sharing = styled.div`
  display: flex;
  gap: 2px;
  justify-content: flex-end;
  .item {
    box-shadow: 0 0.1rem 0.4rem rgba(34, 34, 34, 0.25);
    color: #fff;
    transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
    border: 0.1rem solid transparent;
    align-items: center;
    display: inline-flex;
    height: 2rem;
    font-size: 0.85rem;
    padding: 0.3rem 0.5rem;
    text-transform: capitalize;
    &:first-child {
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
    }
    &:last-child {
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }
  }
  .dark-item {
    background: #222;
    border-color: #1d1d1d;
  }
`;
