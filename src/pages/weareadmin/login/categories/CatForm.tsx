import { FlexStyle } from "@/components/common";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
} from "@/components/common/AntComp";
import { LabelForm } from "@/components/styles/projects/collectionStyle";
import { useAppContext } from "@/contexts";
import { useFetchAPI } from "@/hooks/useFetchApi";
import { API_METHOD, BASE_URL_API, pathAPI } from "@/utils";
import { Form, InputNumber, Upload } from "antd";
import { useCallback, useEffect, useState } from "react";

import type { UploadProps } from "antd/es/upload";

import type { UploadFile } from "antd/es/upload/interface";

interface ICategoryForm {
  hasEditInfos?: any;
  onCb?: Function;
}

const CategoryForm = (props: ICategoryForm) => {
  const { hasEditInfos, onCb } = props;
  const { fetchApi } = useFetchAPI();
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { handleCancelModal, onNotification } = useAppContext();

  const onFinish = useCallback(
    async (values: any) => {
      try {
        let formData = new FormData();
        formData.append("file", values?.file?.file?.originFileObj);
        formData.append("name", values?.name);
        formData.append("level", values?.level);
        formData.append("description", values?.description);
        const result = await fetchApi({
          method: hasEditInfos ? API_METHOD.PATCH : API_METHOD.POST,
          endpoint: hasEditInfos
            ? `${pathAPI.CATEGORIES}/${hasEditInfos?.id}`
            : pathAPI.CATEGORIES,
          sendData: formData,
        });

        if (result?.status) {
          onNotification({ des: "Successfully!" });
          handleCancelModal();
          onCb?.();
        }
      } catch (error) {}
    },
    [fetchApi, handleCancelModal, hasEditInfos, onCb, onNotification]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (hasEditInfos) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${BASE_URL_API}${hasEditInfos?.logo}`,
        },
      ]);
    }
  }, [hasEditInfos]);

  return (
    <FormWrapper
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        name: hasEditInfos?.name,
        level: hasEditInfos?.level,
        description: hasEditInfos?.description,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FormItemWrapper
        label={<LabelForm>name</LabelForm>}
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <InputWrapper />
      </FormItemWrapper>

      <FormItemWrapper
        label={<LabelForm>level</LabelForm>}
        name="level"
        rules={[{ required: true }]}
      >
        <InputNumber max={3} />
      </FormItemWrapper>
      <FormItemWrapper
        label={<LabelForm>file</LabelForm>}
        rules={[{ required: false }]}
        name="file"
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          fileList={fileList}
          onChange={handleChange}
        >
          <div>
            <div style={{ marginTop: 8 }}>Choose Image</div>
          </div>
        </Upload>
      </FormItemWrapper>
      <FormItemWrapper
        label={<LabelForm>description</LabelForm>}
        name="description"
        rules={[{ required: true, message: "Please input  the description" }]}
      >
        <InputWrapper.TextArea style={{ minHeight: 200 }} />
      </FormItemWrapper>
      <FormItemWrapper wrapperCol={{ offset: 8, span: 16 }}>
        <FlexStyle style={{ justifyContent: "center", gap: 25 }}>
          <ButtonWrapper onClick={handleCancelModal}>Cancel</ButtonWrapper>
          <ButtonWrapper variant="secondary" htmlType="submit">
            Submit
          </ButtonWrapper>
        </FlexStyle>
      </FormItemWrapper>
    </FormWrapper>
  );
};

export default CategoryForm;
