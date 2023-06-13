import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";

interface IVerifyComp {
  item: {
    isPremium?: boolean;
    isVerify?: boolean;
    isWarning?: boolean;
  };
  style?: React.CSSProperties;
  warningStyle?: React.CSSProperties;
}

const VerifyComp = (props: IVerifyComp) => {
  const { item, style, warningStyle } = props;
  const { isPremium, isVerify, isWarning } = item;

  if (isWarning) {
    return (
      <Image
        alt="warning"
        src={`/WARNING.png`}
        style={{
          width: 18,
          height: 18,
          ...warningStyle,
        }}
        width={18}
        height={18}
      />
    );
  }
  if (isPremium)
    return (
      <Tooltip title="Verified by both Base Universe and Crypto Community">
        <Image
          alt="verify-premium"
          src={`/VERIFY.png`}
          style={{
            ...style,
          }}
          width={14}
          height={14}
        />
      </Tooltip>
    );
  return isVerify ? (
    <Tooltip title="Verified by Base Universe Team">
      <Image
        alt="verify"
        src={`/VERIFY_WHITE.png`}
        width={14}
        height={14}
        style={{
          ...style,
        }}
      />
    </Tooltip>
  ) : (
    <></>
  );
};

export default VerifyComp;
