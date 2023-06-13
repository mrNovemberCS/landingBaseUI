import {
  AiFillLinkedin,
  AiOutlineCompass,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsDiscord, BsMedium, BsTelegram } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaFileContract } from "react-icons/fa";

export const TurnSocialIcon = (props: any) => {
  const { socialList } = props;
  const icons = getMatchingKeys(socialList, socialIconList);

  return (
    <>
      {icons.map((icon: ObjectParam, idx: number) => {
        return <span key={idx}>{socialIconList[icon.key]}</span>;
      })}
    </>
  );
};

type ObjectA = {
  [key: string]: any;
};

type ObjectB = {
  [key: string]: any;
};
export type ObjectParam = { key: string; value: any };

export function getMatchingKeys(
  A: ObjectA,
  B: ObjectB = socialIconList
): ObjectParam[] {
  const matchingKeyValues: ObjectParam[] = [];

  for (const key in A) {
    if (B.hasOwnProperty(key) && A[key]) {
      matchingKeyValues.push({ key, value: A[key] });
    }
  }

  return matchingKeyValues;
}

export const socialIconList: { [key: string]: React.ReactElement } = {
  website: <AiOutlineCompass />,
  twitter: <AiOutlineTwitter />,
  facebook: <AiOutlineFacebook />,
  medium: <BsMedium />,
  telegram: <BsTelegram />,
  github: <AiOutlineGithub />,
  dAppUrl: <FaFileContract />,
  whitePaper_Docs: <CgFileDocument />,
  discord: <BsDiscord />,
};
