import { useFetchAPI } from "@/hooks/useFetchApi";
import { BASE_URL_API, pathAPI, routerUrl } from "@/utils";
import { parseUrlToQuery } from "@/utils/common";
import { Form } from "antd";
import Link from "next/link";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { FlexStyle } from "../common";
import { MainNextImage } from "../common/Images";
import { SearchInput } from "./SearchInput";

const SearchGlobal = () => {
  const [form] = Form.useForm();
  const { fetchApi } = useFetchAPI();

  const [projectList, setProjectList] = useState([]);

  const _onSearch = useCallback(
    async (keyword: { keyword: string | "" }) => {
      try {
        if (!!keyword) {
          const searchResult = await fetchApi({
            endpoint: `${pathAPI.PROJECTS}${parseUrlToQuery({
              name: keyword,
            })}`,
          });
          if (searchResult?.status) {
            setProjectList(searchResult?.data);
          }
        }
      } catch (error) {}
    },
    [fetchApi]
  );
  const _onReset = useCallback(() => {
    setTimeout(() => {
      setProjectList([]);
      form.resetFields();
    }, 300);
  }, [form]);

  return (
    <div className="relative">
      <SearchWrapper>
        <SearchInput
          _onSearch={_onSearch}
          form={form}
          style={{ color: "white !important" }}
          _onReset={_onReset}
        />
      </SearchWrapper>
      {projectList?.length ? (
        <SearchPanel>
          <SearchResult>
            {projectList.map((item: any, idx: number) => {
              return (
                <SearchItemWrapper key={idx} onClick={_onReset}>
                  <Link href={`${routerUrl.PROJECT}/${item?.slug_name}`}>
                    <FlexStyle
                      style={{ justifyContent: "flex-start", gap: 15 }}
                    >
                      <MainNextImage
                        isrc={`${BASE_URL_API}${item?.logo}`}
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: "100%",
                        }}
                      />
                      <div>
                        <div className="title">{item?.name}</div>
                        <p
                          className="cat-child-text-2-line"
                          style={{
                            WebkitLineClamp: 1,
                          }}
                        >
                          {item?.description}
                        </p>
                      </div>
                    </FlexStyle>
                  </Link>
                </SearchItemWrapper>
              );
            })}
          </SearchResult>
        </SearchPanel>
      ) : null}
    </div>
  );
};

export default SearchGlobal;

const SearchItemWrapper = styled.div`
  margin: 10px 0px;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    position: relative;
    background-color: rgba(128, 128, 128, 0.1);
    transform: translateX(-3px);
    border-radius: 5px;
  }
`;

const SearchWrapper = styled.div`
  input {
    color: white !important;
  }
`;

const SearchResult = styled.div`
  padding: 10px;
  font-size: 14px;
  background-color: white;
  color: black;
  border-radius: 4px;
  transition: all 0.3s ease;
  max-height: 350px;
  overflow: auto;
  .cat-child-text-2-line {
    font-size: 12px;
    opacity: 0.8;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
  }
`;
const SearchPanel = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  z-index: 9;
`;
