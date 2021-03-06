import "./Home.css";

import React, { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Col, Media, Row } from "reactstrap";

import ioLogoWhite from "../../assets/img/io-logo-white.svg";
import logoHomeDel from "../../assets/img/logo_home_del.svg";
import logoHomeDev from "../../assets/img/logo_home_dev.svg";
import logoHomeRep from "../../assets/img/logo_home_legal_rep.svg";
import logoTD from "../../assets/img/logo_td.png";
import { HomeLoginButton } from "./HomeLoginButton/HomeLoginButton";

/**
 * Landing page with three different login for developers, institution delegate and institution legal ref
 */
export const Home = () => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  /**
   * array containing three login elements props
   */
  const homeLoginButtonsDataArray: ReadonlyArray<ComponentProps<
    typeof HomeLoginButton
  >> = [
    {
      buttonText: t("common.user.roles.developer"),
      img: logoHomeDev,
      imgHeight: 100,
      link: "developer-login",
      offset: "home",
      text: t("home.loginButtons.description.developer")
    },
    {
      buttonText: t("common.user.roles.delegate"),
      img: logoHomeDel,
      imgHeight: 100,
      link: "spid-login",
      offset: undefined,
      text: t("home.loginButtons.description.delegate")
    },
    {
      buttonText: t("common.user.roles.legalRep"),
      img: logoHomeRep,
      imgHeight: 100,
      link: "legal-rep-login",
      offset: undefined,
      text: t("home.loginButtons.description.legalRep")
    }
  ];

  /**
   * create jsx for buttons
   */
  const homeLoginButtons = homeLoginButtonsDataArray.map(homeLoginButton => (
    <HomeLoginButton
      key={homeLoginButton.link}
      buttonText={homeLoginButton.buttonText}
      img={homeLoginButton.img}
      imgHeight={homeLoginButton.imgHeight}
      text={homeLoginButton.text}
      link={homeLoginButton.link}
      offset={homeLoginButton.offset}
    />
  ));

  return (
    <div className="Home h-100">
      <div className="container-fluid d-flex h-100 flex-column custom-background-container overflow-auto">
        <Row className="pt-4 pl-4">
          <Col sm="auto">
            <Media
              object={true}
              src={logoTD}
              alt="Team Digitale Logo"
              height="40"
            />
          </Col>
          <Col sm="auto" className="pl-5">
            <Media
              object={true}
              src="https://via.placeholder.com/189x40.png?text=NewCo_Logo"
              alt="NewCo Logo"
            />
          </Col>
        </Row>
        <Row className="pt-3 mt-4">
          <Col>
            <Media
              object={true}
              src={ioLogoWhite}
              alt="NewCo Logo"
              height="60"
            />
          </Col>
        </Row>
        <Row className="pt-4 mt-4">
          <Col>
            <h2 className="text-white mb-4 mt-3">{t("home.title")}</h2>
          </Col>
        </Row>
        <Row className="pt-2 pb-5">
          <Col>
            <p className="text-white">{t("home.profileSelect")}</p>
          </Col>
        </Row>
        <Row className="pt-2 mt-2 text-center">{homeLoginButtons}</Row>
      </div>
    </div>
  );
};
