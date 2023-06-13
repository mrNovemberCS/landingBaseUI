import styled from "styled-components";
import { ColWrapper } from "../common/AntComp";

export const ATag = styled.a`
  display: flex;
  text-decoration: none;
  padding: 0 2rem;
  white-space: nowrap;
  &:not(:last-child) {
    border-right: 0.05rem solid #d7dbff;
  }
`;

export const ATagInerRight = styled.div`
  font-size: 0.65rem;
  height: 0.8rem;
  line-height: 1rem;
`;
export const ATagInerLeft = styled.div`
  font-size: 1.8rem;
  font-weight: bolder;
  letter-spacing: -0.05rem;
  line-height: 2rem;
  margin-right: 1rem;
`;
export const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  line-height: 2.8rem;
  margin: 0 auto;
  max-width: 840px;
`;

export const AwesomeStats = styled.div`
  background: #fff;
  box-shadow: 0 0.2rem 1.6rem rgba(34, 34, 34, 0.05);
  padding: 1rem;
  margin: 4rem 0;
  height: 5rem;
`;
export const AwesomeStatsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: auto;
`;

export const TrendingProject = styled.div`
  padding: 5px 10px;
  text-align: center;
  h1 {
    font-size: 2rem;
    padding: 2rem;
    font-weight: 500;
  }
  .img-wrapper {
    box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.6);
    border-radius: 50%;
    width: 5.2rem;
    height: 5.2rem;
    margin: 0.5rem auto;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .inner-trending {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
    .item {
      flex: 1;
      &:hover {
        .img-wrapper {
          box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.6);
          transform: translateY(-2px);
        }
      }
    }
    .trend-logo-list {
      flex: 1;
    }
  }
  .branch-name {
    white-space: pre-wrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 445px) {
    padding: 0;
    .inner-trending {
      .item {
        width: 27%;
        flex: unset;
      }
      .trend-logo-list {
        overflow: hidden;
        flex: unset;
      }
    }
  }
`;

export const ContentStyleElipSis = styled.div`
  flex: 1;
  overflow: hidden;

  .text {
    color: #d2d2d2;
  }
`;

export const TrendingcardCollection = styled.div`
  margin: 4rem auto;
`;

export const FlexCardList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 32px rgba(27, 82, 237, 0.15);
  backdrop-filter: blur(2px);
  border-radius: 1em;
  box-shadow: 0 0.2rem 1.6rem rgba(34, 34, 34, 0.15);
  width: 100%;
  padding: 1rem;
  height: 100%;
  position: relative;
  color: white;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    background: linear-gradient(
        180deg,
        #eeeeee 0%,
        rgba(238, 238, 238, 0) 84.2%
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    border-radius: inherit;
    z-index: -1;
  }
  .top-item {
    text-align: center;
  }
  .bold-title {
    font-weight: 700;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  .head-icon {
    font-size: 32px;
  }
  .img-icon {
    box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.1);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    background: rgba(34, 34, 34, 0.15);
  }
  .cat-child {
    background: transparent;
    border: 0;
    box-shadow: none;
    min-height: auto;
    padding: 0.85rem;
    position: relative;
    transition: all 0.3s ease;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0.1rem 0.2rem rgba(34, 34, 34, 0.05),
        0 0.4rem 1.6rem rgba(34, 34, 34, 0.15);
      text-decoration: none;
      transform: translateY(-0.1rem);
    }
  }
`;
