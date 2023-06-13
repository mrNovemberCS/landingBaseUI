import Link from "next/link";
import styled from "styled-components";

export const LinkWrapper = styled(Link)`
  &:hover {
    background-color: initial;
    color: white;
  }
`;

export const NavItem = styled.div`
  margin-bottom: 0.15rem;
  width: 100%;
  .item {
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease-in-out;
    border: 1px solid transparent;
    padding: 0.4rem;
    border-radius: 8px;
    background-color: transparent;
    .quantity {
      font-size: 0.7rem;
      font-weight: 400;
      margin-left: 0.5rem;
      opacity: 0.75;
      padding: 0 0.2rem;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid white;
      color: white;
    }
  }
  .sub-item {
    font-size: 0.95rem;
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    border: 1px solid transparent;
    background-color: transparent;
    .quantity {
      font-size: 0.7rem;
      font-weight: 400;
      margin-left: 0.5rem;
      opacity: 0.75;
      padding: 0 0.2rem;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid white;
      color: white;
    }
  }
  .active {
    transition: all 0.3s ease-in-out;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid white;
    color: white;
  }
`;

export const TopTitle = styled.div`
  color: #222;
  padding: 3rem 0 1rem 0;
  position: relative;
  z-index: 1;
`;
