import { EditIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Image,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const btnStyle = {
  display: "flex",
  textAlign: "center",
  backgroundColor: "#7190FF",
  color: "whiteAlpha.900",
  flexDirection: "row",
};

export type AddressBarProps = {
  username: string | undefined;
};

const accordianStyle = {
  position: "absolute",
  width: "50vw",
  top: "74px",
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  /* background */
  background: "#1E1E22",
  border: "0.42735px solid #303030",
  boxShadow: "0px 3.4188px 8.54701px 1.7094px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
};

const accordionItemStyle = {
  border: "none",
  justifyContent: "center",
};

const LoadingModal = ({ status, username }: LoadingBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function setShow(arg0: boolean): import("react").ReactNode {
    modalheader.innerHTML = "<br>Dᴏɴᴇ.";
    loaderimage.src = "tick.jpg";
  } 

  return (
    <>
      <Button sx={btnStyle} onClick={onOpen}>Purchase for Ξ0.01</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered
      closeOnOverlayClick={false} // add this to prevent outside click to prevent modal close 
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader id="modalheader" fontSize="30px" align="center" background="black">Mɪɴᴛɪɴɢ Yᴏᴜʀ Exᴄʟᴜsɪᴠᴇ Cᴏᴍᴍᴜɴɪᴛʏ Tᴏᴋᴇɴ...</ModalHeader>
          <ModalBody background="black" align="center">
            <Image 
            id="loaderimage" 
            src="loadingorb.gif"
            alt="Loading Orb"
            />
          </ModalBody>
          <ModalFooter background="black">
            <Button id="exitbutton" background="black" onClick={setShow}></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
};

export default LoadingModal;