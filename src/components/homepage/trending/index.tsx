import { useGetGeneralgroups } from "@/hooks/APIs/useGetgroups";
import { Skeleton } from "antd";
import Image from "next/image";
import { RowWrapper } from "../../common/AntComp";
import { TrendingProject, TrendingcardCollection } from "../style";
import TrendingCard from "./TrendingCard";
import TrendingLogos from "./TrendingLogos";

export interface IGroupItem {
  description: string;
  logo: string;
  id: string;
  name: string;
  isVerify: boolean;
  createdAt: string;
  projects: Array<any>;
}

const Trending = () => {
  const { groups, isFetching } = useGetGeneralgroups({});

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <section>
      <TrendingProject className="trending-projects container  mx-auto">
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            whiteSpace: "nowrap",
            flexWrap: "wrap",
          }}
        >
          <Image src="/BASE_FIRE.png" alt="base-fire" width={50} height={50} />
          Trending on Base
        </h1>
        <TrendingLogos />
      </TrendingProject>
      <TrendingcardCollection className="container">
        <RowWrapper gutter={[32, 32]}>
          {isFetching ? (
            <Skeleton />
          ) : (
            <>
              {groups?.slice(0, 6)?.map((item: IGroupItem, idx) => {
                const limitChild = item?.projects.slice(0, 4);
                return (
                  <TrendingCard item={item} limitChild={limitChild} key={idx} />
                );
              })}
            </>
          )}
        </RowWrapper>
      </TrendingcardCollection>
    </section>
  );
};

export default Trending;
