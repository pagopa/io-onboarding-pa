import React, { FC, MouseEvent } from "react";
import { useCookies } from "react-cookie";
import { RouteComponentProps, withRouter } from "react-router";
import { Button, Col, Media, Row } from "reactstrap";

/**
 * props for LoginHomeButton component
 */
interface IHomeLoginButtonProps extends RouteComponentProps {
  buttonText: string;
  img: string;
  imgHeight: number;
  link: string;
  offset?: string;
  text: string;
}

/**
 * Component defining a login element used in Home component(image, button and descriptive text)
 */
export const HomeLoginButton = withRouter<
  IHomeLoginButtonProps,
  FC<IHomeLoginButtonProps>
>((props: IHomeLoginButtonProps) => {
  const [cookies] = useCookies(["sessionToken"]);
  /**
   * Navigate to link provided in props
   */
  const navigateTo = (link: string) => (_: MouseEvent) => {
    // if token is already present, user already logged in and token did not expire yet -> user can skip login
    if (cookies.sessionToken) {
      props.history.push("/dashboard");
    } else {
      props.history.push(link);
    }
  };

  return (
    <Col sm={{ size: 3, offset: props.offset }}>
      <Row>
        <Col>
          <Media
            object={true}
            src={props.img}
            alt="NewCo Logo"
            height={props.imgHeight}
          />
        </Col>
      </Row>
      <Row className="bg-dark bg-transparent pt-4 mt-4">
        <Col>
          <Button
            color="primary"
            className="w-75"
            onClick={navigateTo(props.link)}
          >
            {props.buttonText}
          </Button>
        </Col>
      </Row>
      <Row className="bg-dark bg-transparent pt-3 mt-2">
        <Col>
          <p className="small text-white pl-4 pr-4">{props.text}</p>
        </Col>
      </Row>
    </Col>
  );
});
