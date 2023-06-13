import { BASE_URL_API, baseDefaultUrl, routerUrl } from "@/utils";
import { cleanString } from "@/utils/common";
import Link from "next/link";

import { Skeleton } from "antd";
import styled from "styled-components";
import { ColWrapper, RowWrapper } from "../common/AntComp";
import { MainNextImage } from "../common/Images";
import { H1 } from "../common/SemanticTag";
import SocialsnShare from "./SocialsnShare";
import { FlexStyle } from "../common";
import StatusTag from "../common/StatusTag";
import VerifyComp from "../common/VerifyComp";

interface ProductDetailProps {
  data: any;
}

const leftColResponsive = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 16 },
  xl: { span: 16 },
};
const rightColResponsive = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 8 },
  xl: { span: 8 },
};

const ProjectDetailView = ({ data }: ProductDetailProps): JSX.Element => {
  return (
    <section style={{ marginTop: 34 }}>
      {!!data ? (
        <RowWrapper gutter={[16, 16]}>
          <ColWrapper {...leftColResponsive}>
            <div>
              <TopDetail>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <MainNextImage
                    isrc={`${BASE_URL_API}${data?.logo}`}
                    style={{ width: 100, height: 100, borderRadius: "100%" }}
                  />
                  <div>
                    <div style={{ marginBottom: 15 }}>
                      <FlexStyle
                        style={{
                          justifyContent: "flex-start",
                          gap: 15,
                        }}
                      >
                        <StatusTag mainnet={data?.mainnet} />
                        {data?.isNativeBase && (
                          <StatusTag
                            hasBase
                            icon={
                              <MainNextImage
                                isrc={`${BASE_URL_API}${baseDefaultUrl}`}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            }
                          />
                        )}
                      </FlexStyle>
                    </div>
                    <H1>
                      <FlexStyle
                        style={{ justifyContent: "flex-start", gap: 8 }}
                      >
                        {data?.name}
                        <VerifyComp
                          item={data}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          warningStyle={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      </FlexStyle>
                    </H1>
                    <SubDescription>{data?.short_description}</SubDescription>
                    <FlexCategory>
                      {data?.categories?.map((item: any, idx: number) => {
                        return (
                          <CatTag
                            key={idx}
                            href={{
                              pathname: routerUrl.PROJECT,
                              query: {
                                tag: cleanString(item?.name),
                              },
                            }}
                          >
                            {item?.name}
                          </CatTag>
                        );
                      })}
                    </FlexCategory>
                  </div>
                </div>
              </TopDetail>
              <DescriptionCard>
                <CardTitle>{`About ${data?.name}`}</CardTitle>
                <span className="description">{data?.description}</span>
              </DescriptionCard>
            </div>
          </ColWrapper>
          <ColWrapper {...rightColResponsive}>
            <SocialsnShare data={data} />
          </ColWrapper>
        </RowWrapper>
      ) : (
        <Skeleton active />
      )}
    </section>
  );
};

export default ProjectDetailView;

export const TopDetail = styled.div``;
export const SubDescription = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  /* line-height: 0.6rem; */
  margin: 0.5rem 0 1rem;
  white-space: pre-wrap;
  color: #d2d2d2;
`;

export const FlexCategory = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 24px 0;
  svg {
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    &:hover {
      transform: translate(0, -2px);
    }
  }
`;

export const CatTag = styled(Link)`
  border-radius: 0.4rem;
  font-size: 0.85rem;
  line-height: 1.5rem;
  padding: 0.1rem 0.55rem;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 32px rgba(27, 82, 237, 0.15);
  backdrop-filter: blur(2px);
`;

const DescriptionCard = styled.div`
  border: 0.05rem solid #eee;
  border-radius: 0.8rem;
  box-shadow: 0 0.1rem 1.4rem rgba(34, 34, 34, 0.05);
  font-size: 1.1rem;
  margin: 1rem 0;
  padding: 2rem;
  font-weight: 300;
  .description {
    white-space: pre-wrap;
    /* line-height: 0.9rem; */
    display: block;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;
