import { FlexStyle, ViewPortUI } from "@/components/common";
import { ColWrapper, RowWrapper } from "@/components/common/AntComp";
import { MainNextImage } from "@/components/common/Images";
import { ProjectItem } from "@/components/styles/projects/collectionStyle";
import { useFetchAPI } from "@/hooks/useFetchApi";
import { BASE_URL_API, baseDefaultUrl, pathAPI, routerUrl } from "@/utils";
import { parseUrlToQuery } from "@/utils/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Skeleton } from "antd";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";

import { TurnSocialIcon } from "@/components/common/SocialIcon";
import StatusTag from "@/components/common/StatusTag";
import VerifyComp from "@/components/common/VerifyComp";
import { ProjectFilter, ProjectMainnet } from "@/utils/enums";
import { IProjectInfos } from "../../../pages/projects";

interface IProjectCollections {
  infos: IProjectInfos;
}

const ProjectCollections = (props: IProjectCollections) => {
  const { infos } = props;

  const { fetchApi } = useFetchAPI();
  const queryClient = useQueryClient();
  const { data: result, isFetching } = useQuery({
    queryKey: ["all-project", JSON.stringify(infos)],
    queryFn: async () => {
      switch (infos.name) {
        case "all":
          const reEndPoint =
            infos?.isNative === ProjectFilter.All
              ? pathAPI.PROJECTS
              : `${pathAPI.PROJECTS}${parseUrlToQuery({
                  isNative: infos?.isNative,
                })}`;
          const { data, status } = await fetchApi({
            endpoint: reEndPoint,
          });

          if (status) {
            return data;
          } else {
            throw new Error("Failed to fetch data");
          }

        default:
          if (infos?.cateId) {
            const cat_endpoint =
              typeof infos?.isNative === "boolean"
                ? `${pathAPI.CATEGORY_PROJECT}${parseUrlToQuery({
                    categoryId: infos?.cateId,
                    isNative: infos?.isNative,
                  })}`
                : `${pathAPI.CATEGORY_PROJECT}${parseUrlToQuery({
                    categoryId: infos?.cateId,
                  })}`;
            const result = await fetchApi({
              endpoint: cat_endpoint,
            });
            if (result?.status) {
              return result?.data;
            } else {
              throw new Error("Failed to fetch data");
            }
          }
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    queryClient.invalidateQueries(["all-project", JSON.stringify(infos)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(infos), queryClient]);

  if (isFetching) {
    return <Skeleton active />;
  }

  const baseStyle = {
    height: "1.5rem",
    fontSize: "0.7rem",
  };

  if (result?.length) {
    return (
      <ViewPortUI>
        <RowWrapper gutter={[32, 32]}>
          {result?.map((item: any, idx: number) => {
            return (
              <ColWrapper key={idx} xs={24} sm={24} md={24} lg={8} xl={8}>
                <Link href={`${routerUrl.PROJECT}/${item?.slug_name}`}>
                  <ProjectItem>
                    <div style={{ marginBottom: 15 }}>
                      <FlexStyle
                        style={
                          item?.mainnet === ProjectMainnet.None
                            ? {
                                justifyContent: "flex-end",
                              }
                            : {}
                        }
                      >
                        <StatusTag
                          mainnet={item?.mainnet}
                          bg={
                            item?.mainnet === ProjectMainnet.Mainnet
                              ? {
                                  background: "#1B52ED",
                                  ...baseStyle,
                                }
                              : {
                                  ...baseStyle,
                                }
                          }
                          statusSize={8}
                        />
                        {item?.isNativeBase && (
                          <StatusTag
                            hasBase={item?.isNativeBase}
                            isJustIcon
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
                    <div className="flex-top-header">
                      <div>
                        <div className="img-icon">
                          <MainNextImage
                            isrc={`${BASE_URL_API}${item?.logo}` || ""}
                            style={{
                              borderRadius: "100%",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <FlexStyle
                          style={{
                            justifyContent: "flex-start",
                            gap: 5,
                          }}
                        >
                          <h3 className="title cat-child-text">{item?.name}</h3>
                          <VerifyComp item={item} />
                        </FlexStyle>
                        <div className="subTitle cat-child-text">
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "100%",
                              whiteSpace: "nowrap",
                              color: "#D2D2D2",
                            }}
                          >
                            {item?.categories?.map((el: any, index: number) => {
                              return (
                                <Fragment key={index}>{`${el.name}${
                                  index === item?.categories?.length - 1
                                    ? ""
                                    : ", "
                                }`}</Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ margin: "1rem 0" }}
                      className="cat-child-text-2-line"
                    >
                      {item?.description}
                    </div>
                    <div className="social-list">
                      <TurnSocialIcon socialList={item} />
                    </div>
                  </ProjectItem>
                </Link>
              </ColWrapper>
            );
          })}
        </RowWrapper>
      </ViewPortUI>
    );
  }
  if (!result?.length) {
    return (
      <Empty
        prefixCls="Oops!"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
          flexDirection: "column",
        }}
      />
    );
  }
  return <Empty description="Connecting" />;
};

export default React.memo(ProjectCollections);
