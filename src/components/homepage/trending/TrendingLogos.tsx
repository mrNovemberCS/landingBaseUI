import { useFetchAPI } from "@/hooks/useFetchApi";
import { BASE_URL_API, pathAPI, routerUrl, trendingIDs } from "@/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MainNextImage } from "../../common/Images";
import { FlexStyle } from "@/components/common";
import StatusTag from "@/components/common/StatusTag";
import VerifyComp from "@/components/common/VerifyComp";

const TrendingLogos = () => {
  const { fetchApi } = useFetchAPI();
  const [trendingList, setTrendingList] = useState<Array<any>>([]);

  const _onInitfetching = useCallback(async () => {
    const trendingResult = await fetchApi({
      endpoint: `${pathAPI.PROJECTS}/${pathAPI.TRENDING}`,
    });
    if (trendingResult?.status) {
      setTrendingList(trendingResult?.data);
    }
  }, [fetchApi]);

  useEffect(() => {
    _onInitfetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inner-trending">
      {trendingList.map((item, idx) => {
        return (
          <div className="item" key={idx}>
            <Link href={`${routerUrl.PROJECT}/${item?.slug_name}`}>
              <div className="img-wrapper">
                <MainNextImage
                  isrc={`${BASE_URL_API}${item?.logo}` || ""}
                  style={{
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="branch-name">
                <div
                  style={
                    item?.isVerify || item?.isWarning
                      ? {
                          gap: 5,
                          display: "flex",
                          alignItems: "center",
                        }
                      : {}
                  }
                >
                  <div className="trend-logo-list">{item?.name}</div>
                  <VerifyComp item={item} />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TrendingLogos;
