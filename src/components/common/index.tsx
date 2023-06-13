import { ITitle } from "@/utils/interfaces";
import styled from "styled-components";
import { AiOutlineSortAscending } from "react-icons/ai";

export const ViewContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
`;
export const ViewPortUI = styled.div`
  height: calc(100vh);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px 0;
  position: relative;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;
export const FlexStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const TitleColumn = ({ title, isSort = false }: ITitle) => (
  <FlexStyle>
    <span style={{ textTransform: "capitalize" }}>{title}</span>{" "}
    {isSort && <AiOutlineSortAscending />}
  </FlexStyle>
);
