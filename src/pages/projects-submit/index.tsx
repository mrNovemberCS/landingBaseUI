import HeadSeoContent, { DEFAULT_OG_IMAGE } from "@/SEO";
import { ViewContainer } from "@/components/common";
import { H1 } from "@/components/common/SemanticTag";
import ProjectForm from "@/components/projects/ProjectForm";
import { turnSubmitData } from "@/components/projects/SubmitFunction";
import { useAppContext } from "@/contexts";
import { useFetchAPI } from "@/hooks/useFetchApi";
import { API_METHOD, imgAccepList, maxLengthUpload, pathAPI } from "@/utils";
import { Form } from "antd";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { GetStaticProps } from "next";
import { useCallback, useState } from "react";

const SubmitProject = () => {
  const [form] = Form.useForm();
  const { fetchApi } = useFetchAPI();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { onNotification } = useAppContext();

  const [fileList, setFileList] = useState<UploadFile[]>([]) as any;

  const onSubmitForm = async (values: any) => {
    try {
      if (values?.file?.fileList[0]?.originFileObj) {
        setLoadingSubmit(true);
        const dataSubmit = turnSubmitData(values);
        const { status } = await fetchApi({
          method: API_METHOD.POST,
          endpoint: pathAPI.PROJECTS,
          sendData: dataSubmit,
        });
        if (status) {
          form.resetFields();
          setFileList([]);
          onNotification({
            des: "Successfully!",
          });
        }
        setLoadingSubmit(false);
      } else {
        form.setFields([
          {
            name: "file",
            errors: ["Please insert logo"],
          },
        ]);
      }
    } catch (error) {
      console.log({ error });
      setLoadingSubmit(false);
    }
  };

  const onResetContent = useCallback(() => {
    form.resetFields();
    setFileList([]);
  }, [form]);

  const handleChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: {
    fileList: any;
  }) => {
    if (newFileList?.length) {
      for (let i = 0; i < newFileList.length; i++) {
        const element = newFileList[i];
        const isAllow = imgAccepList.includes(element.type);
        const fileSizeInMB = element.size / 1024 / 1024;
        if (!isAllow) {
          return;
        } else if (fileSizeInMB > maxLengthUpload) {
          return;
        }
        setFileList(newFileList);
      }
      return;
    }
    setFileList([]);
  };

  const titleHead = "Submit Your Project";
  const description = `Base Universe's objective is to assist the Base community in
  navigating and understanding the swiftly evolving ecosystem with
  enhanced ease and clarity.`;
  return (
    <>
      <HeadSeoContent
        title={titleHead}
        description={description}
        imageUrl={DEFAULT_OG_IMAGE}
      />
      <ViewContainer>
        <div style={{ textAlign: "center", margin: "4rem 0 2rem 0" }}>
          <H1>{titleHead}</H1>
          <p
            style={{
              maxWidth: 600,
              width: "100%",
              margin: "2rem auto 0 auto",
            }}
          >
            {description}
          </p>
        </div>
        <ProjectForm
          isClient
          form={form}
          fileList={fileList}
          onSubmitForm={onSubmitForm}
          handleChange={handleChange}
          loadingSubmit={loadingSubmit}
          onResetContent={onResetContent}
        />
      </ViewContainer>
    </>
  );
};

export default SubmitProject;

export async function getStaticProps(context: GetStaticProps) {
  return {
    props: {},
  };
}
