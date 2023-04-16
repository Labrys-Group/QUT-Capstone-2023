import { EditIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
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

export type AddressBarProps = {
  status: boolean;
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

const AddressBar = ({ status, username }: AddressBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Accordian */}
      <Accordion allowToggle sx={accordianStyle}>
        <AccordionItem sx={accordionItemStyle}>
          <AccordionButton>
            <Box flex="1">
              <Text className="blueTxt">
                {status ? "CONNECTED" : "Not Connected"}
              </Text>
            </Box>
          </AccordionButton>
          <AccordionPanel>
            <Box flex="1" textAlign="center">
              <Text
                className="headingMd"
                color={"#FFFFFF"}
                padding="0px 0px 10px 0px"
              >
                {username}
              </Text>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<EditIcon />}
                onClick={onOpen}
                rounded="full"
                color="#7190FF"
                _hover={{ bg: "#435dba", textColor: "#FFFFFF" }}
              >
                Set Username
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#1E1E22" padding={2}>
          <ModalHeader className="headingMd" textAlign="center">
            Enter username
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={14}>
            <Input variant="flushed" placeholder="ex. Exy Sample" />
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              type="submit"
              size="sm"
              variant="outline"
              leftIcon={<EditIcon />}
              rounded="full"
              color="#7190FF"
              _hover={{ bg: "#435dba", textColor: "#FFFFFF" }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressBar;
