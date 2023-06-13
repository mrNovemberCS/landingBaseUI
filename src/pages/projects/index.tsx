import HeadSeoContent, { DEFAULT_OG_IMAGE, defaultContent } from "@/SEO";
import { ColWrapper, RowWrapper } from "@/components/common/AntComp";
import { H1, H2 } from "@/components/common/SemanticTag";
import { useState } from "react";
import styled from "styled-components";
import ProjectCollections from "../../components/projects/collection";
import { TopTitle } from "../../components/styles/projects/projectStyle";
import MenuPanel from "../../view/projects/MenuPanel";
import { ProjectFilter } from "@/utils/enums";

export interface IProjectInfos {
  cateId: string;
  groupId: string;
  name: string;
  des?: string;
  isNative?: boolean | string;
}

interface IFilterListComp {
  cb: (type?: string | boolean) => void;
}

const ProjectView = () => {
  const [infos, setInfos] = useState<IProjectInfos>({
    cateId: "",
    groupId: "",
    name: "",
    des: "",
    isNative: ProjectFilter.All,
  });

  return (
    <>
      <HeadSeoContent
        title={`Project - ${defaultContent.title}`}
        description={defaultContent.description}
        imageUrl={DEFAULT_OG_IMAGE}
      />
      <TopTitle>
        <FlexElement
          style={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            color: "whitesmoke",
          }}
        >
          <div>
            <H1>Projects</H1>
            <H2>{infos?.des}</H2>
          </div>
          <FilterListComp
            cb={(type: any) =>
              setInfos((prev: IProjectInfos) => ({ ...prev, isNative: type }))
            }
          />
        </FlexElement>
      </TopTitle>
      <RowWrapper gutter={[16, 16]}>
        <ColWrapper xs={24} sm={24} md={24} lg={7} xl={7}>
          <MenuPanel onCbInfos={setInfos} />
        </ColWrapper>
        <ColWrapper xs={24} sm={24} md={24} lg={17} xl={17}>
          <ProjectCollections infos={infos} />
        </ColWrapper>
      </RowWrapper>
    </>
  );
};

export default ProjectView;

const filters = [
  ProjectFilter.All,
  ProjectFilter.NATIVE,
  ProjectFilter.CROSSCHAIN,
];

const FilterListComp = (props: IFilterListComp) => {
  const { cb } = props;
  const [activeItem, setActiveItem] = useState<number>(0);

  const _onCb = (id: number, type: string) => {
    setActiveItem(id);
    switch (type) {
      case ProjectFilter.NATIVE:
        cb?.(true);
        break;
      case ProjectFilter.CROSSCHAIN:
        cb?.(false);
        break;
      default:
        cb?.(ProjectFilter.All);
        break;
    }
  };

  return (
    <FilterShortcus>
      <FlexElement>
        {filters.map((text: string, idx: number) => {
          return (
            <div
              onClick={() => _onCb(idx, text)}
              key={idx}
              className={`element ${activeItem === idx ? "active" : ""}`}
            >
              {text}
            </div>
          );
        })}
      </FlexElement>
    </FilterShortcus>
  );
};

const FlexElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  .element {
    border-radius: 0.4rem;
    font-size: 0.8rem;
    margin: 0 0.05rem;
    padding: 0.2rem 0.4rem;
    transition: all 0.4s ease;
    cursor: pointer;
  }
  .active {
    background: #fff;
    box-shadow: 0 0.1rem 0.4rem rgba(34, 34, 34, 0.05);
    color: #222;
  }
`;

const FilterShortcus = styled.div`
  align-items: center;
  background: rgba(34, 34, 34, 0.05);
  border: 0.05rem solid rgba(34, 34, 34, 0.01);
  border-radius: 0.6rem;
  box-shadow: 0 0.1rem 0.4rem rgba(34, 34, 34, 0.05);
  display: inline-flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0.2rem 0;
  padding: 0.2rem;
  border: 1px solid rgba(238, 238, 238, 0.5);
`;
