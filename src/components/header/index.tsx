import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { menus, routerUrl } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { FlexStyle, ViewContainer } from "../common";
import { MainNextImage } from "../common/Images";
import SearchGlobal from "../searchGlobal";
import { MobileMenu, MobileMenuButton, NavStyle } from "./style";

const AppHeader = () => {
  const { width } = useWindowDimensions();
  const isMobileView = useMemo(() => width <= 768, [width]);

  const [open, setOpen] = useState<boolean>(false);

  const _onCloseCb = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    if (isMobileView) {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [open, isMobileView]);

  return (
    <ViewContainer>
      <NavStyle
        className="sticky"
        style={{
          zIndex: 999,
        }}
      >
        <FlexStyle
          style={{
            flexDirection: isMobileView ? "row-reverse" : "row",
            alignItems: "center",
            gap: 24,
            justifyContent: "space-between",
          }}
        >
          <div className="flex gap-14 items-center">
            <MenuItem>
              <Link href={routerUrl.HOMEPAGE}>
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <MainNextImage
                    isrc="/LOG.png"
                    style={{ borderRadius: "50%", width: 40 }}
                  />
                  <span
                    className="logo-text"
                    style={{ fontSize: 20, fontWeight: 500 }}
                  >
                    Base Universe
                  </span>
                </div>
              </Link>
            </MenuItem>
            {!isMobileView && <MenuList _onCloseCb={_onCloseCb} />}
          </div>
          <SearchGlobal />
          <MobileMenuButton onClick={() => setOpen(!open)}>
            <GiHamburgerMenu style={{ fontSize: 30 }} />
          </MobileMenuButton>
        </FlexStyle>
      </NavStyle>
      {isMobileView && (
        <MobileMenu open={open}>
          <div style={{ padding: 15, overflow: "hidden" }} className="main-app">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CgClose
                style={{ fontSize: 30 }}
                onClick={() => setOpen(!open)}
              />
              <Link href="/" onClick={_onCloseCb}>
                <MainNextImage
                  isrc="/LOG.png"
                  style={{ borderRadius: "50%", width: 50, height: 50 }}
                />
              </Link>
            </div>
          </div>
          <MenuList isMobile _onCloseCb={_onCloseCb} />
        </MobileMenu>
      )}
    </ViewContainer>
  );
};

export default React.memo(AppHeader);

const MenuList = ({
  _onCloseCb,
  isMobile,
}: {
  _onCloseCb: () => void;
  isMobile?: boolean;
}) => {
  const { pathname } = useRouter();

  return (
    <ul>
      {menus.map(
        ({ label, path }: { label: string; path: string }, idx: number) => {
          const isProjects = path === routerUrl.PROJECT;
          return (
            <MenuItem key={idx}>
              <Link
                href={
                  isProjects
                    ? {
                        pathname: path,
                        query: { tag: "all" },
                      }
                    : path
                }
              >
                <div
                  onClick={_onCloseCb}
                  className={`menu-item ${pathname === path ? "active" : ""}`}
                  style={{
                    padding: isMobile ? "0.5rem 1rem" : "0.35rem 1rem",
                  }}
                >
                  <span className="capitalize">{label}</span>
                </div>
              </Link>
            </MenuItem>
          );
        }
      )}
      <MenuItem>
        <Link legacyBehavior href="https://awesome-web3.com/">
          <a target="_blank" rel="noopener noreferrer">
            <div
              className="menu-item"
              style={{
                padding: isMobile ? "0.5rem 1rem" : "0.35rem 1rem",
              }}
            >
              <span className="capitalize">For Builders</span>
            </div>
          </a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link legacyBehavior href="https://twitter.com/UniverseOnBase">
          <a target="_blank" rel="noopener noreferrer">
            <div
              className={`menu-item`}
              style={{
                padding: isMobile ? "0.5rem 1rem" : "0.35rem 1rem",
              }}
            >
              <span className="capitalize flex gap-2 items-center">
                <BsTwitter />
                Twitter
              </span>
            </div>
          </a>
        </Link>
      </MenuItem>
    </ul>
  );
};

const MenuItem = styled.div`
  .menu-item {
    padding: 0.35rem 1rem;
    background: transparent;
    border-radius: 0.6rem;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0px 4px 32px rgba(27, 82, 237, 0.15);
      backdrop-filter: blur(2px);
    }
  }
  .active {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 32px rgba(27, 82, 237, 0.15);
    backdrop-filter: blur(2px);
  }
  &:hover {
    a {
      color: inherit;
    }
  }
`;
