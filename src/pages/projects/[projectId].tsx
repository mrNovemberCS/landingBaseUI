import HeadSeoContent, { defaultContent } from "@/SEO";
import ProjectDetailView from "@/components/projectDetail";
import { useFetchAPI } from "@/hooks/useFetchApi";
import { BASE_URL_API, pathAPI } from "@/utils";
import { Empty, Skeleton } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ProjectData {
  // Define the shape of your product data here
  short_description: string;
  name: string;
  logo: string;
}

function ProjectDetail() {
  const { query } = useRouter();
  const projectId = useMemo(() => {
    return query?.projectId || "";
  }, [query]);

  const [projectData, setProjectData] = useState<ProjectData>();

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { fetchApi } = useFetchAPI();

  const getDetail = useCallback(
    async (_slug_name: string | any) => {
      if (!_slug_name) {
        return;
      }
      const result = await fetchApi({
        endpoint: `${pathAPI.PROJECTS}/${_slug_name}`,
      });
      if (result?.status) {
        setProjectData(result?.data);
        setLoading(false);
      } else {
        setLoading(false);
        setHasError(true);
      }
    },
    [fetchApi]
  );

  useEffect(() => {
    getDetail(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <>
      <HeadSeoContent
        title={`${projectData?.name} - ${defaultContent.title}`}
        description={
          projectData?.short_description || defaultContent.description
        }
        imageUrl={`${BASE_URL_API}${projectData?.logo}`}
      />
      {hasError ? (
        <Empty
          prefixCls="Oops!"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
            flexDirection: "column",
          }}
        />
      ) : (
        <ProjectDetailView data={projectData} />
      )}
    </>
  );
}

export default ProjectDetail;

// export const getServerSideProps: any = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { projectId } = context.query;
//   if (!projectId) {
//     return {
//       props: {
//         projectId: "",
//         projectData: null,
//       },
//     };
//   }

//   // Call your API to fetch the product data using the projectId parameter
//   const response = await fetch(
//     `${BASE_URL_API}${pathAPI.PROJECTS}/${projectId}`
//   );
//   const projectData: ProjectData = await response.json();

//   // Pass the product data as props to the component
//   return {
//     props: {
//       projectId,
//       projectData,
//       // Add other props here as needed
//     },
//   };
// };
