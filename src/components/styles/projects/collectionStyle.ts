import { FormItemWrapper } from "@/components/common/AntComp";
import styled from "styled-components";

export const LabelForm = styled.div<{ color?: string }>`
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.color ? props.color : "inherit")};
  .input-avatar {
    width: 100%;
    height: 100px;
    position: absolute;
    inset: 0px;
    border-radius: 100%;
    opacity: 0;
    z-index: 3;
    cursor: pointer;
    max-width: 220px;
  }
  .overlay {
    position: absolute;
    transform: scale(0);
    background: rgba(0, 0, 0, 0.3);
    width: 100px;
    height: 100px;
    border-radius: 100%;
    z-index: 2;
    position: absolute;
    transition: all 0.1s ease-in-out;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FormUIWrapper = styled.div`
  margin-top: 4rem;
`;

export const AvatarWrapper = styled(FormItemWrapper)`
  overflow: hidden;
  position: relative;
`;

export const ProjectItem = styled.div`
  /* background: #fff;
  border: 0.05rem solid #eee;
  box-shadow: 0 0.05rem 0.05rem rgba(34, 34, 34, 0.05),
    0 0.2rem 0.8rem rgba(34, 34, 34, 0.075);
  border-radius: 0.8rem;
  color: #222;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 8.5rem;
  padding: 1rem;
  position: relative;
  overflow: hidden; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 32px rgba(27, 82, 237, 0.15);
  backdrop-filter: blur(2px);
  border-radius: 1em;
  box-shadow: 0 0.2rem 1.6rem rgba(34, 34, 34, 0.15);
  width: 100%;
  padding: 1rem;
  height: 100%;
  position: relative;
  color: white;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.1rem 0.2rem rgba(34, 34, 34, 0.05),
      0 0.4rem 1.6rem rgba(34, 34, 34, 0.15);
    text-decoration: none;
    transform: translateY(-0.1rem);
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    background: linear-gradient(
        180deg,
        #eeeeee 0%,
        rgba(238, 238, 238, 0) 84.2%
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    border-radius: inherit;
    z-index: -1;
  }
  .title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0;
  }
  .subTitle {
    font-size: 0.75rem;
    white-space: nowrap;
    color: #888;
  }
  .flex-top-header {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  .img-icon {
    box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.1);
    border-radius: 100%;
    width: 35px;
    height: 35px;
    background: rgba(34, 34, 34, 0.15);
  }
  .social-list {
    display: flex;
    gap: 5px;
    align-items: center;
    margin-top: 2rem;
    svg {
      fill: #fff;
      opacity: 0.6;
    }
  }
`;
