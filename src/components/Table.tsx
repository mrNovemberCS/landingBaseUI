import { Table, Tabs } from "antd";
import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";

export interface IPagination {
  page?: number;
  total?: number;
  limit?: number;
  pageSize?: number;
}

export interface ITableData {
  _data: Array<any>;
  _column: Array<any>;
  _pagination?: IPagination | false;
}

export interface IAppTable {
  className?: string;
  tableData?: ITableData;
  stateTable?: any;
  dataTableHost?: any;
  handlePaging?: (item: any) => void;
  handleTableChange?: (item: any) => void;
  loading?: boolean;
  isTabTable?: boolean;
}

const MainTable = (props: IAppTable) => {
  const {
    className,
    tableData,
    handlePaging,
    stateTable = [],
    dataTableHost,
    loading = false,
    isTabTable = false,
    handleTableChange,
  } = props;

  const iitem = stateTable.map((item: any) => {
    return {
      label: item?.title,
      key: item?.key,
      children: (
        <TableWrapperSetting
          loading={{
            indicator: (
              <div className="dual-loading" style={{ width: 30, height: 30 }} />
            ),
            spinning: loading,
          }}
          pagination={item?.pagin ? item?.pagin : false}
          columns={item?.column}
          className={`live-table ${className}`}
          dataSource={item?.data}
          rowClassName={(_, index) =>
            index % 2 === 0
              ? `table-row-light ${index === 0 ? "first-highlight" : ""}`
              : `table-row-dark `
          }
          bordered={false}
          scroll={{ x: 350 }}
          rowKey={(row: any) => {
            return row.key;
          }}
          onChange={handlePaging}
        />
      ),
    };
  });

  return (
    <>
      {isTabTable ? (
        <Fragment>
          <Tabs
            style={{
              color: "#fff",
              padding: "5px 10px",
              textTransform: "capitalize",
            }}
            onChange={handleTableChange}
            defaultActiveKey={dataTableHost}
            destroyInactiveTabPane={true}
            items={iitem}
          />
        </Fragment>
      ) : (
        <Fragment>
          <TableWrapperSetting
            columns={tableData?._column || []}
            dataSource={tableData?._data || []}
            loading={loading}
            pagination={tableData?._pagination}
            className={`live-table reset-table ${className}`}
            rowClassName={(_, index) => {
              return index % 2 === 0
                ? `table-row-light ${index === 0 ? "first-highlight" : ""}`
                : `table-row-dark `;
            }}
            bordered={false}
            scroll={{ x: 350 }}
            rowKey={(row: any) => row.key}
            onChange={handleTableChange}
          />
        </Fragment>
      )}
    </>
  );
};
export default React.memo(MainTable);

const highlight = keyframes`
0%{
  background-color: #0134eb !important;
}
25%{
  background-color: #16f6af4c !important;
}
50%{
  background-color: #0c41ff !important;
}
75%{
  background-color: rgba(29, 165, 122,.7) !important;
}
100%{
  background-color: #ff0f0f !important;
}
`;

const TableWrapperSetting = styled(Table)`
  .table-row-light {
    background: white;
    .ant-table-cell-row-hover {
      background: transparent !important;
    }
  }
  .table-row-dark {
    background: #fafafa;
    .ant-table-cell-row-hover {
      background: transparent !important;
    }
  }

  .table-row-dark,
  .table-row-light {
    &:hover,
    &:visited {
      td.ant-table-cell-row-hover {
        background: transparent !important;
      }
    }
  }

  /* .ant-table {
    .ant-table-cell {
      color: white;
    }
  } */
  /* .ant-table-thead {
    th {
      background: transparent !important;
      border-bottom: unset !important;
    }
  } */
  .ant-table-thead > tr > td {
    border-bottom: unset !important;
  }
  .ant-table-tbody > tr > td {
    border-top: unset !important;
    border-bottom: unset !important;
  }
  .ant-pagination-item a {
    /* color: whitesmoke; */
  }
  .ant-pagination-item-active a {
  }
  .ant-pagination-next,
  .ant-pagination-prev {
    svg {
      color: whitesmoke;
    }
  }

  .ant-empty-description {
    color: whitesmoke;
  }
  .ant-table-cell-fix-right,
  .ant-table-cell-fix-left {
    background: transparent !important;
  }
`;
