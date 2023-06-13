import { IChildren } from "@/utils/interfaces";
import AppHeader from "@/components/header";
import AppFooter from "@/components/footer";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { routerUrl } from "@/utils";

import { FloatButton } from "antd";
import { ViewContainer } from "@/components/common";

export default function AppConfigHeader(props: IChildren) {
  const { pathname } = useRouter();

  const isAdminRoute = useMemo(() => {
    return pathname === routerUrl.ADMIN ? true : false;
  }, [pathname]);

  return (
    <>
      {isAdminRoute ? null : <AppHeader />}
      {isAdminRoute ? (
        <>{props.children}</>
      ) : (
        <ViewContainer style={{ flex: 1 }}>{props.children}</ViewContainer>
      )}
      {isAdminRoute ? null : <AppFooter />}
      <FloatButton.BackTop />
    </>
  );
}
