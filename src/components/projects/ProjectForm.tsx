import React, { useState } from "react";
import styled from "styled-components";
import {
  Checkbox,
  Divider,
  FormInstance,
  Modal,
  Popconfirm,
  Upload,
  message,
} from "antd";
import { FormUIWrapper, LabelForm } from "../styles/projects/collectionStyle";

import {
  ButtonWrapper,
  CheckBoxComp,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
  SelectWrapper,
} from "@/components/common/AntComp";
import CategoriesBox from "./CategoriesBox";
import { useWindowDimensions } from "@/hooks/useWindowDimension";
import { IChildren } from "@/utils/interfaces";
import { turnSelectOption } from "@/utils/common";
import { useAppContext } from "@/contexts";
import { imgAccepList, maxLengthUpload } from "@/utils";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { MainNextImage } from "../common/Images";
import { getBase64 } from "@/utils/common";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { FormChecboxStatus } from "@/utils/enums";

interface IProjectForm {
  form: FormInstance;
  onSubmitForm: (item: any) => void;
  onSubmitFail?: (item: any) => void;
  handleChange?: (item: any) => void;
  onResetContent?: (item: any) => void;
  fileList: Array<any>;
  loadingSubmit?: boolean;
  fromAdmin?: boolean;
  initValue?: any;
  isUpdate?: boolean;
  isClient?: boolean;
}

const ProjectForm = (props: IProjectForm) => {
  const {
    form,
    onSubmitForm,
    handleChange,
    fileList,
    onResetContent,
    loadingSubmit,
    initValue,
    fromAdmin,
    isUpdate,
    isClient,
    onSubmitFail,
  } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const isMobile = useWindowDimensions().width <= 768;

  const { setModalObject } = useAppContext();

  const wrappConStyle = isMobile
    ? { offset: 0, span: 12 }
    : { offset: fromAdmin ? 6 : 0, span: 12 };

  const TitleWrapper = (props: IChildren) =>
    fromAdmin ? (
      <LabelForm>{props.children}</LabelForm>
    ) : (
      <WrappLabelForm>{props.children}</WrappLabelForm>
    );

  const beforeUpload = (file: any) => {
    const isAllow = imgAccepList.includes(file.type);
    const fileSizeInMB = file.size / 1024 / 1024;
    if (fileSizeInMB > maxLengthUpload) {
      message.error(`File size exceeds the limit of ${maxLengthUpload}MB`);
    } else if (!isAllow) {
      message.error("File is not a supported file");
      return isAllow || Upload.LIST_IGNORE;
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const onChangeCheckbox = (type: string, value: boolean) => {
    switch (type) {
      case FormChecboxStatus.VERIFY:
        if (value) {
          form.setFieldValue("isWarning", false);
        }
        break;
      case FormChecboxStatus.PREMIUM:
        if (value) {
          form.setFieldValue("isVerify", true);
          form.setFieldValue("isWarning", false);
        }
        break;

      case FormChecboxStatus.WARNING:
        if (value) {
          form.setFieldValue("isVerify", false);
        }
        break;

      default:
        break;
    }
  };

  return (
    <FormUIWrapper
      style={
        !fromAdmin
          ? {
              marginTop: "4rem",
            }
          : {
              marginTop: "1rem",
              maxHeight: "700px",
              height: "100%",
              overflow: "auto",
            }
      }
    >
      <FormWrapper
        form={form}
        name="basic"
        labelCol={{ span: fromAdmin ? 8 : 5 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 760, margin: "0 auto" }}
        onFinish={onSubmitForm}
        onFinishFailed={onSubmitFail}
        initialValues={{
          ...initValue,
          categories: turnSelectOption(initValue?.categories),
        }}
      >
        <FormItemWrapper
          name="name"
          label={<TitleWrapper>project name</TitleWrapper>}
          rules={[
            {
              required: true,
              message: "Please input your project!",
            },
          ]}
        >
          <InputWrapper />
        </FormItemWrapper>
        <CategoriesBox isAdmin={fromAdmin} list={initValue?.categories} />
        <FormItemWrapper
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          label={<TitleWrapper>email</TitleWrapper>}
          required={true}
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          name="description"
          label={<TitleWrapper>Description</TitleWrapper>}
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <InputWrapper.TextArea style={{ height: 180 }} />
        </FormItemWrapper>
        <FormItemWrapper
          name="short_description"
          label={<TitleWrapper>short Description</TitleWrapper>}
          rules={[
            {
              required: true,
              message: "Please input short description!",
            },
          ]}
        >
          <InputWrapper.TextArea style={{ height: 100 }} />
        </FormItemWrapper>

        <FormItemWrapper
          style={{
            marginBottom: 0,
          }}
          label={<TitleWrapper>logo</TitleWrapper>}
          rules={[
            {
              required: isUpdate,
              message: "Please insert logo!",
            },
          ]}
          name="file"
        >
          <Upload
            listType="picture-circle"
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
          >
            <div>
              <div style={{ marginTop: 8, color: "white" }}>Choose Image</div>
            </div>
          </Upload>
        </FormItemWrapper>
        <FormItemWrapper>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <MainNextImage style={{ width: "100%" }} isrc={previewImage} />
          </Modal>
        </FormItemWrapper>

        {isClient ? (
          <></>
        ) : (
          <>
            <FormItemWrapper
              name="mainnet"
              label={<TitleWrapper>networks</TitleWrapper>}
            >
              <SelectWrapper
                options={[
                  { label: "None", value: "None" },
                  { label: "Mainnet", value: "Mainnet" },
                  { label: "Testnet", value: "Testnet" },
                ]}
              />
            </FormItemWrapper>
            <FormItemWrapper
              valuePropName="checked"
              name="isNativeBase"
              label={<TitleWrapper>native</TitleWrapper>}
            >
              <Checkbox />
            </FormItemWrapper>
            <FormItemWrapper
              valuePropName="checked"
              name="isVerify"
              label={<TitleWrapper>verification</TitleWrapper>}
            >
              <Checkbox
                onChange={(e: CheckboxChangeEvent) =>
                  onChangeCheckbox(FormChecboxStatus.VERIFY, e?.target?.checked)
                }
              />
            </FormItemWrapper>
            <FormItemWrapper
              valuePropName="checked"
              name="isWarning"
              label={<TitleWrapper>Warning</TitleWrapper>}
            >
              <Checkbox
                onChange={(e: CheckboxChangeEvent) =>
                  onChangeCheckbox(
                    FormChecboxStatus.WARNING,
                    e?.target?.checked
                  )
                }
              />
            </FormItemWrapper>
            <FormItemWrapper
              valuePropName="checked"
              name="isPremium"
              label={<TitleWrapper>Premium</TitleWrapper>}
            >
              <Checkbox
                onChange={(e: CheckboxChangeEvent) =>
                  onChangeCheckbox(
                    FormChecboxStatus.PREMIUM,
                    e?.target?.checked
                  )
                }
              />
            </FormItemWrapper>
          </>
        )}

        <FormItemWrapper wrapperCol={{ offset: 4, span: 16 }}>
          <Divider />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>documentation</TitleWrapper>}
          name="dAppUrl"
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>website</TitleWrapper>}
          name="website"
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>facebook</TitleWrapper>}
          name="facebook"
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>twitter</TitleWrapper>}
          name="twitter"
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>telegram</TitleWrapper>}
          name="telegram"
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>github</TitleWrapper>}
          name="github"
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>discord</TitleWrapper>}
          name="discord"
        >
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper
          label={<TitleWrapper>medium</TitleWrapper>}
          name="medium"
        >
          <InputWrapper />
        </FormItemWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          <FormItemWrapper wrapperCol={{ ...wrappConStyle }}>
            {fromAdmin ? (
              <ButtonOverWrite
                onClick={() =>
                  setModalObject({
                    state: false,
                    modalContent: null,
                  })
                }
                style={{ color: fromAdmin ? "black" : "white" }}
              >
                cancel
              </ButtonOverWrite>
            ) : (
              <PopOverStyle
                style={{
                  color: "black",
                }}
                title="Are you sure to clear content?"
                onConfirm={onResetContent}
              >
                <ButtonWrapper style={{ color: "white" }}>
                  Clear Content
                </ButtonWrapper>
              </PopOverStyle>
            )}
          </FormItemWrapper>
          <FormItemWrapper wrapperCol={{ ...wrappConStyle }}>
            <ButtonOverWrite
              htmlType="submit"
              loading={loadingSubmit}
              style={{
                color: fromAdmin ? "blue" : "white",
              }}
            >
              Submit Project
            </ButtonOverWrite>
          </FormItemWrapper>
        </div>
      </FormWrapper>
    </FormUIWrapper>
  );
};

export default ProjectForm;

const ButtonOverWrite = styled(ButtonWrapper)`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 32px rgba(27, 82, 237, 0.15);
  backdrop-filter: blur(2px);
  color: white;
`;
const PopOverStyle = styled(Popconfirm)``;

export const WrappLabelForm = styled(LabelForm)`
  color: white;
`;
