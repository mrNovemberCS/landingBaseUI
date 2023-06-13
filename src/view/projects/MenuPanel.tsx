import { ViewPortUI } from "@/components/common";
import {
  ICategoriesSummary,
  useGetCategories,
} from "@/hooks/APIs/useGetgroups";
import { routerUrl } from "@/utils";
import { cleanString, findObjectById } from "@/utils/common";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  LinkWrapper,
  NavItem,
} from "../../components/styles/projects/projectStyle";

import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { Modal } from "antd";
import { TbSelector } from "react-icons/tb";
import styled from "styled-components";
import Link from "next/link";
import { IProjectInfos } from "@/pages/projects";

interface IMenuPanel {
  onCbInfos: Function;
}

const MenuPanel = (props: IMenuPanel) => {
  const { onCbInfos } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [catName, setCatName] = useState<string>("");

  const { query }: any = useRouter();
  const { categories } = useGetCategories({});

  const { width } = useWindowDimensions();

  const isMobileView = useMemo(() => width <= 768, [width]);

  const routeTag = useMemo(() => {
    if (Object.keys(query)) {
      return cleanString(query.tag);
    }
    return "";
  }, [query]);

  const onGetInfos = useCallback(
    ({ id, name, des }: { id?: string; name?: string; des: string }) => {
      onCbInfos((prev: IProjectInfos) => ({
        ...prev,
        cateId: id,
        groupId: "",
        name: name,
        des,
      }));
      setCatName(name || "");
      if (isMobileView) {
        handleCancel();
      }
    },
    [onCbInfos, isMobileView]
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (query?.tag) {
      const findData = findObjectById(query?.tag, categories);
      if (findData) {
        if (cleanString(findData.name) === "all") {
          onCbInfos((prev: IProjectInfos) => ({
            ...prev,
            cateId: "",
            name: "all",
            des: findData.description,
          }));
          setCatName("All");
          return;
        }
        onCbInfos((prev: IProjectInfos) => ({
          ...prev,
          cateId: findData?.id,
          name: "",
          des: findData.description,
        }));
        setCatName(findData.name);
        return;
      }
    }
  }, [categories, onCbInfos, query]);

  const ProjectMenuLv = () => {
    return (
      <>
        {categories?.map((item: ICategoriesSummary, idx: number) => {
          return (
            <div key={idx}>
              <div>
                <NavItem
                  onClick={() =>
                    onGetInfos({
                      id: item?.id,
                      name: "",
                      des: item.description,
                    })
                  }
                >
                  <Link
                    href={{
                      pathname: routerUrl.PROJECT,
                      query: { tag: cleanString(item?.name) },
                    }}
                  >
                    <div
                      className={`item ${
                        routeTag === cleanString(item?.name) ? "active" : ""
                      }`}
                    >
                      <span>{item?.name}</span>
                      <span className="quantity">{item?.total}</span>
                    </div>
                  </Link>
                </NavItem>
                <div style={{ paddingLeft: 15 }}>
                  {item?.categories?.map(
                    (cat: ICategoriesSummary, index: number) => {
                      return (
                        <LinkWrapper
                          key={index}
                          href={{
                            pathname: routerUrl.PROJECT,
                            query: { tag: cleanString(cat?.name) },
                          }}
                        >
                          <span>
                            <NavItem
                              onClick={() =>
                                onGetInfos({
                                  id: cat?.id,
                                  name: "",
                                  des: cat.description,
                                })
                              }
                            >
                              <div
                                className={`sub-item ${
                                  routeTag === cleanString(cat?.name)
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <span>{cat?.name}</span>
                                <span className="quantity">{cat?.total}</span>
                              </div>
                            </NavItem>
                          </span>
                        </LinkWrapper>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return isMobileView ? (
    <>
      <RawBtn style={{ color: "white" }} onClick={showModal}>
        {catName} <TbSelector />{" "}
      </RawBtn>
      <Modal
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        closable={false}
      >
        <ProjectMenuLv />
      </Modal>
    </>
  ) : (
    <ViewPortUI>
      <ProjectMenuLv />
    </ViewPortUI>
  );
};

export default React.memo(MenuPanel);

const RawBtn = styled.button`
  font-size: 0.85rem;
  font-weight: 500;
  justify-content: space-between;
  position: relative;
  z-index: 9;
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: rgba(34, 34, 34, 0.05);
  border: 0.1rem solid transparent;
  border-radius: 0.4rem;
  color: #222;
  cursor: pointer;
  display: inline-flex;
  line-height: 1.2rem;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  height: 2rem;
  padding: 0.3rem 0.6rem;
  display: flex;
  width: 100%;
`;
