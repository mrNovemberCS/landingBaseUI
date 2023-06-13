import useLocalStorage from "@/hooks/useLocalStorage";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AppHeader from "./Header";
import AdminLogin from "./login";
import TabsManager from "./login/AdminManagerLayout";

const AdminRoot = () => {
  const [hasToken] = useLocalStorage("initData", "");

  const [isLoggin, setIsLoggin] = useState(hasToken ? true : false);

  const _onListen = useCallback((status: boolean) => setIsLoggin(status), []);

  useEffect(() => {
    setIsLoggin(hasToken ? true : false);
  }, [hasToken]);

  return (
    <>
      {isLoggin ? (
        <div>
          <AppHeader _onLogout={_onListen} />
          <AdminWrapper>
            <TabsManager />
          </AdminWrapper>
        </div>
      ) : (
        <CenterLogin>
          <AdminLogin _onSuccess={_onListen} />
        </CenterLogin>
      )}
    </>
  );
};

export default AdminRoot;

const AdminWrapper = styled.div`
  padding: 5rem 1rem 1rem 1rem;
`;

const CenterLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh);
`;
