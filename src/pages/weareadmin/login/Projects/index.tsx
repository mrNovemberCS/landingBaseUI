import Table from "@/components/Table";

import { ButtonWrapper } from "@/components/common/AntComp";
import {
  columnProjectData,
  mappingDatawKey,
} from "@/components/projects/ProjectColumn";
import ProjectFormWrapper from "@/components/projects/ProjectFormWrapper";
import { SearchInput } from "@/components/searchGlobal/SearchInput";
import { useAppContext } from "@/contexts";
import { useFetchAPI } from "@/hooks/useFetchApi";
import { API_METHOD, pathAPI } from "@/utils";
import { parseUrlToQuery } from "@/utils/common";
import { ProjectStatus } from "@/utils/enums";
import { Form } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

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

const ProjectTab: React.FC = () => {
  const { fetchApi } = useFetchAPI();
  const [loading, setLoading] = useState(false);
  const { setModalObject, onNotification } = useAppContext();

  const [form] = Form.useForm();

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
      setLoading(true);
      const result = await fetchApi({
        endpoint: `${pathAPI.PROJECTS}/admin${parseUrlToQuery({
          page: _current,
          limit: _pageSize,
          name: _keyword,
        })}`,
        method: API_METHOD.GET,
      });
      if (result?.status) {
        const data = result?.data;
        setCatData((prev: ICatData) => {
          return {
            ...prev,
            data: mappingDatawKey(data),
            paging: {
              total: data?.meta?.totalItems,
              pageSize: _pageSize,
              current: data?.meta?.currentPage,
            },
          };
        });
      }
      setLoading(false);
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

  const _onEditForm = useCallback(
    async (type: string, data?: any) => {
      switch (type) {
        case "CREATE":
          setModalObject({
            state: true,
            title: "Create new project",
            modalContent: <ProjectFormWrapper onCb={() => onGetData({})} />,
          });
          break;
        case "EDIT":
          setModalObject({
            state: true,
            title: `Update ${data?.name}'s infos`,
            modalContent: (
              <ProjectFormWrapper
                updateInfos={data}
                onCb={() => onGetData({})}
              />
            ),
          });
          break;
        case "DELETE":
          const result = await fetchApi({
            endpoint: `${pathAPI.PROJECTS}/${data?.id}`,
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
        case "STATUS":
          const result_change = await fetchApi({
            endpoint: `${pathAPI.PROJECTS}/${data?.id}`,
            method: API_METHOD.PATCH,
            sendData: {
              status:
                data?.status === ProjectStatus.APPROVED
                  ? ProjectStatus.REGISTERED
                  : ProjectStatus.APPROVED,
            },
          });
          if (result_change?.status) {
            onNotification({ des: "Successfully!" });
            onGetData({});
          }
          break;

        default:
          break;
      }
    },
    [fetchApi, onGetData, onNotification, setModalObject]
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
          New Project
        </ButtonWrapper>
      </div>
      <Table
        loading={loading}
        tableData={{
          _data: catData.data,
          _column: columnProjectData(_onEditForm),
          _pagination: { ...catData?.paging },
        }}
        handleTableChange={onTableChange}
      />
    </section>
  );
};

export default ProjectTab;
