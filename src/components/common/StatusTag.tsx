import { ProjectMainnet } from "@/utils/enums";
import { mock_text } from "@/utils/mock_content";
import { Tooltip } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface IStatusTag {
  mainnet?: string;
  hasBase?: boolean;
  isJustIcon?: boolean;
  statusSize?: number;
  icon?: string | ReactElement;
  bg?: string | React.CSSProperties;
}

const StatusTag = (props: IStatusTag) => {
  const { mainnet, icon, hasBase, bg, statusSize = 10, isJustIcon } = props;

  const style =
    typeof bg === "string"
      ? {
          background: bg,
        }
      : bg;
  return (
    <>
      {isJustIcon ? (
        <Tooltip title={mock_text.native_base}>
          <ProductStatusTag>{icon}</ProductStatusTag>
        </Tooltip>
      ) : (
        <>
          {mainnet === ProjectMainnet.Mainnet && (
            <ProductStatusTag>
              <div className="tag-item bg-opacity item" style={{ ...style }}>
                <div
                  className="mainnet-cl"
                  style={{
                    width: statusSize,
                    height: statusSize,
                  }}
                />
                <>mainnet</>
              </div>
            </ProductStatusTag>
          )}
          {mainnet === ProjectMainnet.Testnet && (
            <ProductStatusTag>
              <div className="tag-item bg-opacity item" style={{ ...style }}>
                testnet
              </div>
            </ProductStatusTag>
          )}
          {hasBase && (
            <ProductStatusTag>
              <div className="tag-item bg-opacity item" style={{ ...style }}>
                {icon}
                base
              </div>
            </ProductStatusTag>
          )}
        </>
      )}
    </>
  );
};

export default StatusTag;

export const ProductStatusTag = styled.div`
  .item {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .tag-item {
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
    border-radius: 15px;
  }
  .mainnet-cl {
    position: relative;
    background: #09ec20;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;
