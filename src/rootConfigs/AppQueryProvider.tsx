import { MainNextImage } from "@/components/common/Images";
import { IChildren } from "@/utils/interfaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const queryClient = new QueryClient();

const AppProvider = (props: IChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    const delay = setTimeout(() => {
      setIsLoading(false);
      window.document.body.style.overflow = "auto";
    }, 800);

    return () => clearTimeout(delay);
  }, []);

  return isLoading ? (
    <div className="skeleton-css">
      <LoadinOverlay className="skeleton-css-overlay">
        <div>
          <div
            style={{
              width: 75,
              height: 75,
              margin: "0 auto",
            }}
          >
            <MainNextImage
              iclass="rotate-animation"
              isrc="/favicon_2.ico"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "100%",
              }}
            />
          </div>
          <BranchName>base universe</BranchName>
        </div>
      </LoadinOverlay>
    </div>
  ) : (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "blue",
          },
        }}
      >
        {props.children}
      </ConfigProvider>
    </QueryClientProvider>
  );
  // return (
  //   <Spin
  //     style={{ maxHeight: "100vh", backgroundColor: "white", zIndex: 100000 }}
  //     spinning={isLoading}
  //     indicator={
  //       <LoadinOverlay>
  //         <div
  //           style={{
  //             width: 75,
  //             height: 75,
  //           }}
  //         >
  //           <MainNextImage
  //             iclass="rotate-animation"
  //             isrc="/favicon_2.ico"
  //             style={{
  //               width: "100%",
  //               height: "100%",
  //               borderRadius: "100%",
  //             }}
  //           />
  //         </div>
  //       </LoadinOverlay>
  //     }
  //   >
  //     <QueryClientProvider client={queryClient}>
  //       <ConfigProvider
  //         theme={{
  //           token: {
  //             colorPrimary: "blue",
  //           },
  //         }}
  //       >
  //         {props.children}
  //       </ConfigProvider>
  //     </QueryClientProvider>
  //   </Spin>
  // );
};

export default AppProvider;

const BranchName = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
  color: black;
`;

export const AbsolutePositionWrapper = styled.div`
  height: calc(100vh);
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 1000;
`;

const LoadinOverlay = styled.div`
  .rotate-animation {
    animation: ${() => css`
      ${rotate360} 1s linear infinite;
    `};
  }
`;

const rotate360 = keyframes`
  0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;
