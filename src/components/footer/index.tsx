import { WEB_BASE_URL_API, pathAPI, routerUrl } from "@/utils";
import Link from "next/link";
import styled from "styled-components";
import { ViewContainer } from "../common";
import { ColWrapper, RowWrapper } from "../common/AntComp";
import { JustLogo } from "../common/Images";
import NewLink from "../common/NewLink";

const footerMock = {
  WAT_BASE_ID: "base",
  WAT_BASE_UNIVERSE_ID: "base-universe",
  twLink: "https://twitter.com/UniverseOnBase",
  link3: "https://link3.to/baseuniverse",
};

const AppFooter = () => {
  return (
    <FooterWrapper>
      <ViewContainer>
        <Link href={routerUrl.SUBMIT}>
          <div className="submit-project">Submit your project</div>
        </Link>
        <p className="content">
          <span>DISCLAIMER</span> : Please note that the information presented
          herein has been provided by third parties and is made available solely
          for general information purposes. Base Universe cannot guarantee the
          accuracy of this information, and it should not be considered as
          professional or financial advice of any kind.
        </p>
        <div className="link-content">
          <RowWrapper gutter={[16, 16]}>
            <ColWrapper span={8}>
              <div className="link-text left-text">
                <NewLink
                  link={`${WEB_BASE_URL_API}${pathAPI.PROJECTS}/${footerMock.WAT_BASE_ID}`}
                  text="What is Base?"
                />
              </div>
              <div className="link-text left-text">
                <NewLink
                  link={`${WEB_BASE_URL_API}${pathAPI.PROJECTS}/${footerMock.WAT_BASE_UNIVERSE_ID}`}
                  text="What is Base Universe?"
                />
              </div>
            </ColWrapper>
            <ColWrapper span={8}>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link href={routerUrl.HOMEPAGE}>
                  <JustLogo />
                </Link>
              </div>
            </ColWrapper>
            <ColWrapper span={8}>
              <div className="link-text">
                <NewLink link={footerMock.twLink} text="Twitter" />
              </div>
              <div className="link-text">
                <NewLink link={footerMock.link3} text="Link3" />
              </div>
            </ColWrapper>
          </RowWrapper>
        </div>
        <h3>Powered by Base Universe</h3>
      </ViewContainer>
    </FooterWrapper>
  );
};

export default AppFooter;

const FooterWrapper = styled.section`
  position: relative;
  text-align: center;
  padding: 24px 0;
  border-top: 1.5px solid rgba(255, 255, 255, 0.1);
  .submit-project {
    margin: 1rem 0 2rem 0;
    font-size: 1.6rem;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    font-weight: 500;
    /* border-top: 2px solid #fff;
    border-bottom: 2px solid #fff; */
    &::before,
    &::after {
      border: 0 solid transparent;
      transition: all 0.3s;
      content: "";
      height: 0;
      position: absolute;
      width: 25px;
    }
    &::before {
      border-top: 2px solid #fff;
      right: 0;
      top: -6px;
    }
    &::after {
      border-bottom: 2px solid #fff;
      bottom: -6px;
      left: 0;
    }
    &:hover {
      &::before,
      &::after {
        width: 100%;
      }
    }
  }
  h3 {
    font-size: 1rem;
  }
  .content {
    font-weight: 300;
    margin-bottom: 24px;
    span {
      font-weight: 600;
    }
  }
  .link-text {
    margin: 15px 0;
    font-size: 16px;
  }
  .left-text {
    text-align: left;
  }
  .link-content {
    margin: 24px 0;
  }
`;
