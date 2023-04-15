import { Text, Box } from "@chakra-ui/react";

export type AddressBarProps = {
  status: boolean;
  text: string | undefined;
};

const boxStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50vw",
  height: "108px",
  top: "74px",
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  background: "#1E1E22",
  border: "0.42735px solid #303030",
  boxShadow: "0px 3.4188px 8.54701px 1.7094px rgba(0, 0, 0, 0.2)",
  borderRadius: "8.54701px",
};

const textStyle = {
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "17px",
  textAlign: "center",
  /* identical to box height */
  display: "flex",
  alignItems: "center",
};

const AddressBar = ({ status, text, ...props }: AddressBarProps) => {
  return (
    <Box sx={boxStyle}>
      <Text sx={textStyle} color={"blue.500"} fontSize={"10px"}>
        {status ? "CONNECTED" : "Not Connected"}
      </Text>

      <Text sx={textStyle} color={"#FFFFFF"} fontSize={"14px"}>
        {text}
      </Text>
    </Box>
  );
};

export default AddressBar;
