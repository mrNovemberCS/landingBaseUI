import { Skeleton } from "antd";
import Image from "next/image";
import React from "react";

interface IMainNextImage {
  isrc: string;
  iclass?: string;
  isjustlogo?: boolean;
  style?: React.CSSProperties;
}

export const MainNextImage = (props: IMainNextImage) => {
  const { isrc, isjustlogo = false, iclass, style } = props;

  if (!!isrc)
    return (
      <Image
        src={isjustlogo ? "/LOG.png" : isrc}
        alt="thumb"
        width={125}
        height={125}
        priority
        quality={100}
        placeholder="blur"
        blurDataURL="/LOG.png"
        className={iclass}
        style={{ width: 125, height: 125, ...style }}
        {...props}
      />
    );
  return (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        backgroundColor: "#fafafa",
        backdropFilter: "10px",
        overflow: "hidden",
        ...props.style,
      }}
    >
      <Skeleton active />
    </div>
  );
};
export const JustLogo = () => {
  return (
    <Image
      src={"/LOG.png"}
      alt="thumb"
      width={85}
      height={85}
      priority
      quality={100}
      placeholder="blur"
      blurDataURL="/LOG.png"
      style={{ borderRadius: "100%" }}
    />
  );
};
