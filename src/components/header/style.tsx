import styled from "styled-components";

export const HeaderWrapper = styled.header``;

export const NavStyle = styled.nav`
  ul {
    display: flex;
    gap: 1rem;
  }
  input::-webkit-input-placeholder {
    font-size: 15px;
    font-weight: 300;
    color: #e4e4e4;
  }
  @media (max-width: 768px) {
    .logo-text {
      display: none;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div<{ open?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${({ open }) => (open ? "100%" : "0")};
  background-color: white;
  z-index: 1000;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    ul {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;
