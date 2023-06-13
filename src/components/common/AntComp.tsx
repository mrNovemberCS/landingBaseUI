import { ProjectStatus } from "@/utils/enums";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  ButtonProps,
  Modal,
  Checkbox,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";

type ButtonWrapperProps = ButtonProps & {
  border?: number;
  variant?: "primary" | "sos" | "secondary" | "thirdary" | "quaternary";
  ghost?: boolean;
};

export const mainAppColor = {
  bgPrimaryColor: "#272931",
  bgSecondaryColor: "#393C47",
  bgThirdColor: "#22252c",
  textPrimaryColor: "#1da57a",
  textSecondaryColor: "#bbbec5",
  textWhiteColor: "#ffffff",
  borderPrimaryColor: "#34363d",
  cardPrimaryColor: "#3a3c48",
  newBgPrimary: "rgb(22 29 37)",
  // extends
  white: "#fff",
  black: "#000",
  black1: "rgba(0, 0, 0, 0.85)",
  red: "#d0011b",
  red1: "#ce0a24",
  red2: "#d0011b",
  lightgray: "#dddddd",
  lightgray3: "#f7f7f7",
  darkgray: "#202021",
  newgray: "#bdc3c7",
  gray: "#4a4a4a", // text color
  gray2: "#f4f5f7",
  gray3: "#8e8e8e", // text color
  gray4: "#e7e9ec",
  gray9: "#858585",
  gray11: "#9b9b9b",
  blue: "#189eff",
  blue2: "#007bff",
  orange: "#f57224",
  pink: "#ff22bb",
  sky: "#00ccff",
  orangehighlight: "#f39c12",
  hightLightYellow: "#fff8dc",
};

export interface ICardProps {
  appColor?: string;
  paddingbody?: string;
  textPrimaryColor?: string;
}

export const FormWrapper = styled(Form)``;
export const FormItemWrapper = styled(Form.Item)``;
export const FormListWrapper = styled(Form.List)``;

export const ColWrapper = styled(Col)``;
export const RowWrapper = styled(Row)``;
export const CardWrapper = styled(Card)`
  box-shadow: unset !important;
  .ant-card-head {
    padding: 0 24px 0 0px;
    font-size: 24px;
    &::after {
      display: none;
    }
    .ant-card-head-title {
      padding: 5px 0;
    }
  }

  .ant-card-body {
    padding: ${(props: ICardProps) =>
      props.paddingbody ? props.paddingbody : "24px"};
  }
`;

export const ModalWrapper = styled(Modal)`
  /* .ant-modal-content,
  .ant-modal-header {
    background-color: ${mainAppColor.bgSecondaryColor};
    color: white;
  }
  .ant-modal-header {
    border-bottom: 1px solid ${mainAppColor.borderPrimaryColor};
    .ant-modal-title {
      color: white;
    }
  }
  button.ant-modal-close {
    color: white;
  } */
`;

export const InputWrapper = styled(Input)`
  border-radius: 8px;
  /* background-color: transparent;
  color: white; */
  /* border: none; */
  width: 100%;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(255, 255, 255, 0.3);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, 0.3);
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const SelectWrapper = styled(Select)``;

export const ButtonWrapper = styled(Button)<ButtonWrapperProps>`
  border-radius: ${(props) => (props.border ? props.border + "px" : "20px")};
  /* max-width: 150px; */
  height: 35px;
  text-transform: capitalize;
  font-weight: 500;
  ${(props) => {
    let cBorder = "none",
      cBackgroundColor = mainAppColor.lightgray,
      cColor = mainAppColor.white;
    if (!props.disabled) {
      switch (props.variant) {
        case "primary":
          cBorder = `none`;
          cBackgroundColor = `${mainAppColor.textPrimaryColor}`;
          cColor = mainAppColor.textWhiteColor;
          break;
        case "sos":
          if (props.ghost) {
            cBorder = `solid 1px ${mainAppColor.red}`;
            cBackgroundColor = `${mainAppColor.white}`;
            cColor = mainAppColor.red;
          } else {
            cBackgroundColor = mainAppColor.red;
          }
          break;
        case "secondary":
          if (props.ghost) {
            cBorder = `solid 1px ${mainAppColor.blue}`;
            cBackgroundColor = `${mainAppColor.white}`;
            cColor = mainAppColor.blue;
          } else {
            cBackgroundColor = mainAppColor.blue;
          }
          break;
        case "thirdary":
          if (props.ghost) {
            cBorder = `solid 1px ${mainAppColor.bgSecondaryColor}`;
            cBackgroundColor = `${mainAppColor.white}`;
            cColor = mainAppColor.bgSecondaryColor;
          } else {
            cBackgroundColor = mainAppColor.bgSecondaryColor;
          }
          break;
        case "quaternary":
          if (props.ghost) {
            cBorder = `solid 1px ${mainAppColor.orange}`;
            cBackgroundColor = `${mainAppColor.orange}`;
            cColor = mainAppColor.white;
          } else {
            cBackgroundColor = mainAppColor.orange;
          }
          break;

        default:
          return null;
      }
    }
    return css`
      && {
        background-color: ${cBackgroundColor};
        color: ${cColor};
        border: ${cBorder};
        &:hover {
          border: ${cBorder};
          background-color: ${cBackgroundColor};
          color: ${cColor};
        }
      }
    `;
  }};
`;

interface ICheckBoxProps {
  checkItem?: any;
  cb?: Function;
}

export const CheckBoxComp = (props: ICheckBoxProps) => {
  const { checkItem, cb } = props;

  const [isChecked, setIsChecked] = useState(false);

  const _onChangeStatus = useCallback(() => {
    setIsChecked((prev: boolean) => !prev);
    cb?.();
  }, [cb]);

  useEffect(() => {
    setIsChecked(checkItem?.status === ProjectStatus.APPROVED ? true : false);
  }, [checkItem]);

  return <Checkbox checked={isChecked} onChange={_onChangeStatus} />;
};
