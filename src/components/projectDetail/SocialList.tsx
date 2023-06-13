import Link from "next/link";
import { FlexCategory } from ".";
import {
  ObjectParam,
  getMatchingKeys,
  socialIconList,
} from "../common/SocialIcon";
import { ISocialsnSharePrpops } from "./SocialsnShare";

const SocialList = (props: ISocialsnSharePrpops) => {
  const { data } = props;

  const icons = getMatchingKeys(data, socialIconList);

  return (
    <FlexCategory style={{ gap: 15, justifyContent: "flex-end" }}>
      {icons.map((icon: ObjectParam, idx: number) => {
        return (
          <Link key={idx} legacyBehavior href={icon?.value}>
            <a target="_blank" rel="noopener noreferrer">
              {socialIconList[icon.key]}
            </a>
          </Link>
        );
      })}
    </FlexCategory>
  );
};

export default SocialList;
