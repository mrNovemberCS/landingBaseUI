import { FlexStyle, ViewContainer } from "@/components/common";
import { MainNextImage } from "@/components/common/Images";

import useCookie from "@/hooks/useCookies";
import useLocalStorage from "@/hooks/useLocalStorage";
import { routerUrl } from "@/utils";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { useCallback } from "react";

export interface IAppHeader {
  _onLogout: Function;
}

const AppHeader = (props: IAppHeader) => {
  const { _onLogout } = props;

  const [_, removeStore] = useLocalStorage("initData", "");
  const _onRemoveToken = useCallback(() => {
    removeStore("");
    _onLogout(false);
  }, [_onLogout, removeStore]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <span onClick={_onRemoveToken}>
            <span>Logout</span>
          </span>
        </span>
      ),
    },
  ];

  return (
    <ViewContainer
      style={{
        borderBottom: "1px solid rgba(229,231,235,0.6)",
      }}
    >
      <FlexStyle>
        <Link href={routerUrl.HOMEPAGE}>
          <FlexStyle style={{ justifyContent: "flex-start", gap: 10 }}>
            <MainNextImage
              isrc="/LOG.png"
              style={{ borderRadius: "50%", width: 55 }}
            />
            <span style={{ fontSize: 20, fontWeight: 500 }}>Base Universe</span>
          </FlexStyle>
        </Link>

        <div>
          <Dropdown
            overlayStyle={{ border: "none" }}
            menu={{ items }}
            placement="bottomLeft"
            arrow
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Administrator
            </span>
          </Dropdown>
        </div>
      </FlexStyle>
    </ViewContainer>
  );
};

export default AppHeader;
