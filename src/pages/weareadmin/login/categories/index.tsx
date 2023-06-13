import Table from "@/components/Table";
import { FlexStyle, TitleColumn } from "@/components/common";
import { MainNextImage } from "@/components/common/Images";
import { useAppContext } from "@/contexts";
import { useFetchAPI } from "@/hooks/useFetchApi";
import { API_METHOD, BASE_URL_API, pathAPI } from "@/utils";
import { parseUrlToQuery } from "@/utils/common";
import { parseTimestamp } from "@/utils/parser";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import CategoryForm from "./CatForm";
import { ButtonWrapper } from "@/components/common/AntComp";
import { BsPlusCircle } from "react-icons/bs";
import BranchItem from "../../components/BranchItem";
import { SearchInput } from "@/components/searchGlobal/SearchInput";
import { Form, Popconfirm } from "antd";

interface IPagin {
  current?: number;
  total: number;
  pageSize: number;
  //   totalItems: number;
  //   totalPages?: number;
  //   sortBy?: any;
}
interface ICatData {
  data: Array<any>;
  links?: any;
  paging: IPagin;
}

const CategoriesTab: React.FC = () => {
  const { fetchApi } = useFetchAPI();
  const [form] = Form.useForm();
  const { setModalObject, onNotification } = useAppContext();

  const [catData, setCatData] = useState<ICatData>({
    data: [],
    paging: {
      current: 1,
      total: 1,
      pageSize: 10,
    },
  });

  const onGetData = useCallback(
    async ({
      _pageSize = 10,
      _current = 1,
      _keyword = "",
    }: {
      _pageSize?: number;
      _current?: number;
      _keyword?: string | undefined;
    }) => {
      const { data, status } = await fetchApi({
        endpoint: `${pathAPI.CATEGORIES}${parseUrlToQuery({
          page: _current,
          limit: _pageSize,
          name: _keyword,
        })}`,
        method: API_METHOD.GET,
      });
      if (status) {
        setCatData((prev: ICatData) => {
          return {
            ...prev,
            data: mappingDatawKey(data),
            paging: {
              total: data?.length,
              pageSize: _pageSize,
              current: _current,
            },
          };
        });
      }
    },
    [fetchApi]
  );

  const onTableChange = ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) => {
    onGetData({
      _pageSize: pageSize,
      _current: current,
    });
  };

  const _onSuccess = useCallback(() => {
    onGetData({ _current: 1 });
  }, [onGetData]);

  const _onEditForm = useCallback(
    async (type: string, data?: any) => {
      switch (type) {
        case "CREATE":
          setModalObject({
            state: true,
            title: "Create new category",
            modalContent: <CategoryForm onCb={_onSuccess} />,
          });
          break;
        case "EDIT":
          setModalObject({
            state: true,
            title: "Update category infos",
            modalContent: (
              <CategoryForm hasEditInfos={data} onCb={_onSuccess} />
            ),
          });
          break;
        case "DELETE":
          const result = await fetchApi({
            endpoint: `${pathAPI.CATEGORIES}/${data?.id}`,
            method: API_METHOD.DELETE,
            sendData: {
              id: data?.id,
            },
          });
          if (result?.status) {
            onNotification({ des: "Successfully!" });
            onGetData({});
          }

          break;

        default:
          break;
      }
    },
    [_onSuccess, fetchApi, onGetData, onNotification, setModalObject]
  );

  const _onSearch = useCallback(
    async (keyword = "") => {
      onGetData({
        _keyword: keyword,
      });
    },
    [onGetData]
  );

  useEffect(() => {
    onGetData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 15,
          padding: "15px 0",
        }}
      >
        <SearchInput
          _onSearch={_onSearch}
          form={form}
          style={{ color: "black" }}
        />

        <ButtonWrapper
          onClick={() => _onEditForm("CREATE")}
          variant="secondary"
          icon={<BsPlusCircle />}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          New Category
        </ButtonWrapper>
      </div>
      <Table
        tableData={{
          _data: catData.data,
          _column: columnData(_onEditForm),
          _pagination: { ...catData?.paging },
        }}
        handleTableChange={onTableChange}
      />
    </section>
  );
};

export default CategoriesTab;

const mappingDatawKey = (arr: Array<any>) => {
  if (!arr) return [];
  return arr.map((item: any, idx: number) => ({
    ...item,
    key: idx,
    action: item,
  }));
};

const columnData = (_onEditForm: Function) => [
  {
    title: <TitleColumn title="created" />,
    dataIndex: "createdAt",
    key: "createdAt",
    responsive: ["xs", "sm"],
    render: (item: string) => {
      return <div>{parseTimestamp(item)}</div>;
    },
  },
  {
    title: <TitleColumn title="Updated" />,
    dataIndex: "updatedAt",
    key: "updatedAt",
    responsive: ["xs", "sm"],
    render: (item: string) => {
      return <div>{parseTimestamp(item)}</div>;
    },
  },
  {
    title: <TitleColumn title="name" />,
    dataIndex: "action",
    key: "action",
    responsive: ["xs", "sm"],
    render: (item: any) => {
      return <BranchItem item={item} />;
    },
  },
  {
    title: <TitleColumn title="level" />,
    dataIndex: "level",
    key: "level",
    responsive: ["xs", "sm"],
  },
  {
    title: <TitleColumn title="description" />,
    dataIndex: "description",
    key: "description",
    responsive: ["xs", "sm"],
  },

  {
    title: <TitleColumn title="Option" />,
    dataIndex: "action",
    key: "action",
    responsive: ["xs", "sm"],
    render: (item: string) => {
      return (
        <FlexStyle style={{ gap: 25 }}>
          <AiFillEdit
            style={{ fontSize: 20, color: "blue" }}
            onClick={() => _onEditForm("EDIT", item)}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => _onEditForm("DELETE", item)}
          >
            <AiFillDelete style={{ fontSize: 20, color: "blue" }} />
          </Popconfirm>
        </FlexStyle>
      );
    },
  },
];
