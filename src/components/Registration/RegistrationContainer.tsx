import React, { ComponentProps } from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";

import { RegistrationStepButtons } from "./RegistrationStepButtons/RegistrationStepButtons";
import { RegistrationStepOne } from "./RegistrationStepOne/RegistrationStepOne";
import { RegistrationStepThree } from "./RegistrationStepThree/RegistrationStepThree";
import { RegistrationStepTwo } from "./RegistrationStepTwo/RegistrationStepTwo";

export const RegistrationContainer = withRouter(props => {
  const initialSelectedInstitution: ComponentProps<
    typeof RegistrationStepOne
  >["selectedInstitution"] = {
    fiscalCode: "",
    ipaCode: "",
    legalRepresentative: {
      familyName: "",
      firstName: "",
      fiscalCode: "",
      phoneNumber: ""
    },
    name: "",
    pecs: [],
    scope: null,
    selectedPecIndex: null
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [institutions, setInstitutions] = useState([]);

  const [selectedInstitution, setSelectedInstitution] = useState({
    ...initialSelectedInstitution
  });

  const handleIntitutionSearch = (searchString: string) => {
    const url =
      window._env_.IO_ONBOARDING_PA_API_HOST +
      ":" +
      window._env_.IO_ONBOARDING_PA_API_PORT +
      `/public-administrations?search=${searchString}`;
    fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + "123"
        // 'Content-Type': 'application/json'
      },
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
        setInstitutions(responseData);
      });
  };

  const handleInstitutionSelected = (
    event: ReadonlyArray<
      ComponentProps<typeof RegistrationStepOne>["selectedInstitution"]
    >
  ) => {
    console.log("Calling handleInstitutionSelected");
    console.log(event);
    const newInstitution =
      event.length === 0
        ? {
            fiscalCode: "",
            ipaCode: "",
            legalRepresentative: {
              familyName: "",
              firstName: "",
              fiscalCode: "",
              phoneNumber: ""
            },
            name: "",
            pecs: [],
            scope: null,
            selectedPecIndex: null
          }
        : event[0];
    setSelectedInstitution(newInstitution);
  };

  const handlePecCheckboxChange = (selectedPecIndex: number) => {
    setSelectedInstitution(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedInstitution"]
      ) => {
        return { ...prevState, selectedPecIndex };
      }
    );
  };

  const handleScopeCheckboxChange = (selectedScope: string) => {
    setSelectedInstitution(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedInstitution"]
      ) => {
        return { ...prevState, scope: selectedScope };
      }
    );
  };

  const registrationBody = (step => {
    switch (step) {
      case "1":
        return (
          <RegistrationStepOne
            onPecCheckboxChange={handlePecCheckboxChange}
            onScopeCheckboxChange={handleScopeCheckboxChange}
            institutions={institutions}
            onInstitutionSearch={handleIntitutionSearch}
            onInstitutionSelected={handleInstitutionSelected}
            selectedInstitution={selectedInstitution}
          />
        );
      case "2":
        return <RegistrationStepTwo />;
      case "3":
        return <RegistrationStepThree />;
    }
  })(props.match.params.signUpStep);

  const toggleConfirmationModal = () => {
    setShowConfirmModal((prevState: boolean) => !prevState);
  };

  return (
    <div className="RegistrationContainer">
      <Container fluid>
        <Row>
          <Col sm="2">
            <RegistrationStepButtons
              openConfirmModal={toggleConfirmationModal}
            />
          </Col>
          <Col sm="8">{registrationBody}</Col>
          <Col sm="2">
            <Row>
              <Col>
                <p className=" pr-3 pt-5">Guida all'utilizzo</p>
                <p className="small pr-3">
                  Le informazioni legate al tuo ente vengono derivate dal
                  database di Indice PA. Nel caso alcune informazioni non siano
                  corrette o siano state cambiate di recente, richiedine la
                  modifica direttamente su Indice PA.
                </p>
                <p className="small pr-2">
                  Controlla le informazioni del tuo ente qui:
                  www.indicepa.gov.it
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={showConfirmModal} toggle={toggleConfirmationModal}>
        <ModalHeader toggle={toggleConfirmationModal}>
          Annulla ricerca ente
        </ModalHeader>
        <ModalBody className="pt-4">
          <p>Sei sicuro di voler uscire dalla ricerca ente?</p>
          <p>
            Verrai rediretto alla tua dashboard personale e potrai iniziare di
            nuovo la ricerca ente quando lo riterrai più opportuno.
          </p>
        </ModalBody>
        <ModalFooter>
          <Row className="w-100 pt-4">
            <Col sm="6" className="text-left">
              <Button
                outline
                color="secondary"
                onClick={toggleConfirmationModal}
              >
                Annulla
              </Button>
            </Col>
            <Col sm="6" className="text-right">
              <Button
                color="primary"
                className="btn btn-primary"
                onClick={() => props.history.push("/dashboard/")}
              >
                Conferma
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  );
});