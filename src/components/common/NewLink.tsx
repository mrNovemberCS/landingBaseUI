import Link from "next/link";
import React from "react";

interface INewlinkProps {
  link: string;
  text: string;
}

const NewLink = (props: INewlinkProps) => {
  const { link, text } = props;
  return (
    <Link legacyBehavior href={link}>
      <a target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    </Link>
  );
};

export default NewLink;
