export const trendingCollection = [
  {
    label: "Ref Finance",
    src: "/REF.png",
  },
  {
    label: "aurora",
    src: "/AUR.png",
  },
  {
    label: "Trisolaris",
    src: "/TRI.png",
  },
  {
    label: "Octopus Network",
    src: "/OCT.png",
  },
  {
    label: "Paras",
    src: "/PAR.png",
  },
  {
    label: "Sweat Еconomy",
    src: "/SWE.png",
  },
  {
    label: "Learn NEAR Club",
    src: "/LEA.png",
  },
  {
    label: "Meta Pool",
    src: "/MET.png",
  },
  {
    label: "Spin",
    src: "/SPI.png",
  },
  {
    label: "LiNEAR Protocol",
    src: "/LIN.png",
  },
];

export const trendingCollection_2 = [
  {
    headIcon: "💸",
    headTitle: "DeFi",
    to: "/",
    child: [
      {
        label: "Ref Finance",
        des: "Multi-purpose DeFi platform built on NEAR Protocol.",
        icon: "/REF.png",
      },
      {
        label: "Trisolaris",
        des: "Bringing DeFi to the NEAR ecosystem.",
        icon: "/TRI.png",
      },
      {
        label: "Burrow",
        des: "Borrow, Supply. Thrive.",
        icon: "/BUR.png",
      },
      {
        label: "Meta Pool",
        des: "Liquid Staking Protocol built on NEAR.",
        icon: "/MET.png",
      },
    ],
  },
  {
    headIcon: "🖼",
    headTitle: "NFT",
    to: "/",
    child: [
      {
        label: "Paras",
        des: "NFT Marketplace for Digital Collectibles on NEAR.",
        icon: "/PAR.png",
      },
      {
        label: "Few and Far",
        des: "One-Stop Destination for NFTs on NEAR.",
        icon: "/FEW.png",
      },
      {
        label: "Mintbase",
        des: "Digital assets minted and backed by you.",
        icon: "/MIN.png",
      },
      {
        label: "Satori",
        des: "The Complete NFT Toolkit.",
        icon: "/SAT.png",
      },
    ],
  },
  {
    headIcon: "",
    headTitle: "",
    to: "/",
    child: [
      {
        label: "",
        des: "",
        icon: "",
      },
    ],
  },
  //   {
  //     headIcon: "",
  //     headTitle: "",
  //     to: "/",
  //     child: [
  //       {
  //         label: "",
  //         des: "",
  //         icon: "",
  //       },
  //     ],
  //   },
  //   {
  //     headIcon: "",
  //     headTitle: "",
  //     to: "/",
  //     child: [
  //       {
  //         label: "",
  //         des: "",
  //         icon: "",
  //       },
  //     ],
  //   },
  //   {
  //     headIcon: "",
  //     headTitle: "",
  //     to: "/",
  //     child: [
  //       {
  //         label: "",
  //         des: "",
  //         icon: "",
  //       },
  //     ],
  //   },
];

export const routerUrl = {
  HOMEPAGE: "/",
  PROJECT: "/projects",
  SUBMIT: "/projects-submit",
  ADMIN: "/weareadmin",
};
export const API_METHOD = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const pathAPI = {
  GROUPS: "groups",
  GENERAL_GROUPS: "groups/general_groups",
  PROJECTS: "projects",
  CATEGORIES: "categories",
  GENERAL_CATEGORY: "categories/general_categories",
  CATEGORY_PROJECT: "categories/projects",
  CATEGORY_SUMMARY: "categories/summary",
  LOGIN: "auth/login",
  TRENDING: "trending",
};

// env
// export const BASE_URL_API = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}api/`;
// export const WEB_BASE_URL_API = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}`;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL_API = `${BASE_URL}`;
export const WEB_BASE_URL_API =
  `${process.env.NEXT_PUBLIC_WEB_BASE_URL}` || "http://www.baseuniverse.space/";

export const menus = [
  {
    label: "projects",
    path: "/projects",
  },
  // {
  //   label: "ranking",
  //   path: "/ranking",
  // },
  // {
  //   label: "articles",
  //   path: "/articles",
  // },
  {
    label: "submit",
    path: "/projects-submit",
  },
];

export const defaultProjectDescription =
  "All projects building on Base ecosystem.";

export const trendingIDs = [
  "dackieswap",
  "dackie",
  "thirdweb",
  "masa",
  "base-name-service",
  "coinbase-wallet",
  "infura",
  "chainlink",
  "pyth-network",
  "openzeppelin",
];

export const sharelink = (name: string, id: string) =>
  `https://twitter.com/intent/tweet?url=${name}: ${WEB_BASE_URL_API}${pathAPI.PROJECTS}/${id}. \nJoin @UniverseOnBase to learn more @BuildOnBase`;

export const imgAccepList = [
  "image/jpeg",
  "image/JPEG",
  "image/jpg",
  "image/JPG",
  "image/png",
  "image/PNG",
  "image/gif",
  "image/GIF",
];

export const maxLengthUpload: number = 3;

export const baseDefaultUrl =
  "public/logo/base-symbol-white_20230605041242.png";
