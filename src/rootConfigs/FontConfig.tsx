import { routerUrl } from "@/utils";
import { IChildren } from "@/utils/interfaces";

import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";

const poppin = Poppins({
  subsets: ["devanagari"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export const FontConfigProvider = (props: IChildren) => {
  const { pathname } = useRouter();

  const isAdminRoute = useMemo(() => {
    return pathname === routerUrl.ADMIN ? true : false;
  }, [pathname]);

  return (
    <MainApp className={`${!isAdminRoute && "main-app"}  ${poppin.className}`}>
      {props.children}
    </MainApp>
  );
};

const MainApp = styled.main`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  min-height: 100vh;
  /* overflow: hidden;
  position: relative;
  color: white;
  &::after {
    content: "";
    background-image: url("BASE-BG.png");
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    position: fixed;
    inset: 0;
    z-index: -1;
  } */
`;
