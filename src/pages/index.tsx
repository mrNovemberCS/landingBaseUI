import HeadSeoContent, { DEFAULT_OG_IMAGE, defaultContent } from "@/SEO";
import HomePage from "@/components/homepage/trending";
import type { GetStaticProps } from "next";

export default function OpeningPage() {
  return (
    <>
      <HeadSeoContent
        title={`${defaultContent.titleDetail} | ${defaultContent.title}`}
        description={defaultContent.description}
        imageUrl={DEFAULT_OG_IMAGE}
      />
      <HomePage />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  console.log("server-render testing");

  return { props: {} };
};
