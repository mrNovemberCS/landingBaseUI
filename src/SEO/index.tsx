import { WEB_BASE_URL_API } from "@/utils";
import { NextSeo } from "next-seo";

interface IHeadSeoContent {
  title: string;
  description: string;
  imageUrl: string;
  keywords?: string;
  siteUrl?: string;
}

export const defaultContent = {
  title: "Base Universe | BuildOnBase",
  description:
    "Base Universe provides an up-to-date list of DApps and projects built on Base ecosystem with detailed information. Explore the latest and most trending projects from DeFi, NFT, Infrastructure, GameFi, DAOs & more with Base Universe today!",
  titleDetail: "Home",
  siteUrl: WEB_BASE_URL_API,
};
export const DEFAULT_OG_IMAGE =
  "https://api.baseuniverse.space/api/public/logo/meta-2_20230522160713.jpg";

const HeadSeoContent = (props: IHeadSeoContent) => {
  const { title, description, imageUrl } = props;
  const seoConfig = {
    title,
    description,
    openGraph: {
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
  };

  return <NextSeo {...seoConfig} />;
};

export default HeadSeoContent;
