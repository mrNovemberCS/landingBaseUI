import { LinkWrapper } from "@/components/styles/projects/projectStyle";
import { BASE_URL_API, routerUrl } from "@/utils";
import { cleanString } from "@/utils/common";
import { AiOutlineArrowRight } from "react-icons/ai";
import styled from "styled-components";
import { ColWrapper } from "../../common/AntComp";
import { MainNextImage } from "../../common/Images";
import { ContentStyleElipSis, FlexCardList } from "../style";
import { IGroupItem } from ".";
import VerifyComp from "@/components/common/VerifyComp";

interface ICategory {
  description: string;
  groupId: string;
  id: string;
  name: string;
  logo: string;
  slug_name: string;
  isVerify?: boolean;
  isPremium?: boolean;
  isWarning?: boolean;
}

const TrendingCard = ({
  item,
  limitChild,
}: {
  item: IGroupItem;
  limitChild: Array<ICategory>;
}) => {
  return (
    <ColWrapper xs={24} sm={24} md={12} lg={8} xl={8}>
      <FlexCardList>
        <div className="card-list-container">
          <div className="top-item">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  margin: "0 auto",
                }}
              >
                <MainNextImage
                  isrc={`${BASE_URL_API}${item?.logo}`}
                  style={{
                    width: "125px",
                    height: "125px",
                  }}
                />
              </div>
            </div>
            <div className="bold-title" style={{}}>
              {item?.name}{" "}
            </div>
            <LinkWrapper
              href={{
                pathname: routerUrl.PROJECT,
                query: { tag: cleanString(item?.name) },
              }}
            >
              <ExplorerItem>
                <span>Explore</span>
                <AiOutlineArrowRight />
              </ExplorerItem>
            </LinkWrapper>
          </div>
          <div>
            {limitChild.map((el: ICategory, i: number) => {
              return (
                <div className="cat-child" key={i}>
                  <LinkWrapper href={`${routerUrl.PROJECT}/${el?.slug_name}`}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <div className="img-icon">
                        <MainNextImage
                          isrc={`${BASE_URL_API}${el?.logo}`}
                          style={{
                            borderRadius: "100%",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <ContentStyleElipSis>
                        <div
                          className="cat-child-text"
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div className="cat-child-text">{el?.name}</div>
                          <VerifyComp
                            item={el}
                            style={{
                              width: 18,
                              height: 18,
                            }}
                          />
                        </div>
                        <div
                          className="cat-child-text text"
                          style={{ fontSize: 16 }}
                        >
                          {el?.description}
                        </div>
                      </ContentStyleElipSis>
                    </div>
                  </LinkWrapper>
                </div>
              );
            })}
          </div>
        </div>
      </FlexCardList>
    </ColWrapper>
  );
};

export default TrendingCard;

const ExplorerItem = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  font-weight: 700;
  margin: 0.5rem 0px 2rem;
  svg {
    transition: all 0.3s ease;
  }
  &:hover {
    svg {
      transform: translateX(3px);
    }
  }
`;
