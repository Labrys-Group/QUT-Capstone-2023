import { WalletContext } from "../context/walletContext";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Text, Box, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useContext } from "react";
import PrimaryButton from "./PrimaryButton";

type KeyGrantedProps = {
  accessGranted: boolean;
  clubName: string;
  image: string;
  tokenNumber?: number;
  remainingToken?: number;
  totalToken?: number;
  price?: number;
  mintFunction(): void;
  enterSiteFunction(): void;
};

const boxStyle = {
  flexDirection: "column",
  backgroundColor: "#1E1E22",
  padding: "12px",
  borderRadius: "10px",
  textAlign: "left",
  width: "274px",
  boxShadow: "0px 3.4188px 8.54701px 1.7094px rgba(0, 0, 0, 0.2)",
  border: "0.42735px solid #303030",
};

const KeyGranted = ({
  accessGranted,
  clubName,
  image,
  tokenNumber,
  remainingToken,
  totalToken,
  price,
  mintFunction,
  enterSiteFunction,
}: KeyGrantedProps) => {
  // @TODO: Work out remainingToken properly, currently hardcoded
  const displayRemaining = remainingToken + `/${totalToken}`;

  return (
    <Flex sx={boxStyle}>
      <Text className="blueTxtBold">{clubName}</Text>
      <Text className="headingSm">
        Member Key {accessGranted ? `#${tokenNumber}` : null}
      </Text>
      {accessGranted ? (
        <Image
          src={image}
          alt="Unlocked-image"
          boxSize="250px"
          objectFit="cover"
          margin="12px 0px"
        />
      ) : (
        <Box minHeight="250px" margin="12px 0px">
          <Image
            src="/lockCrop.png"
            alt="locked-image"
            boxSize="200px"
            objectFit="cover"
            margin="auto"
          />
          <Text className="txt" align="center">
            Key required for access
          </Text>
        </Box>
      )}

      <Text className="blueTxt" textAlign="center" padding="8px 0px">
        {accessGranted ? "Access granted" : displayRemaining + " Remaining"}
      </Text>
      {accessGranted ? (
        <PrimaryButton
          rightIcon={<ArrowForwardIcon />}
          onClick={enterSiteFunction}
        >
          Enter Site
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={mintFunction}>
          Purchase for Ξ{price}
        </PrimaryButton>
      )}
    </Flex>
  );
};

export default KeyGranted;

// Original code

// import { Text, Box } from "@chakra-ui/react";
// import { Image } from "@chakra-ui/react";
// import { Button, ButtonProps } from "@chakra-ui/react";

// export type PrimaryButtonProps = InheritedProps & {
//   text: string;
//   //onClick():void
// };

// const style = {
//   display: "flex",
//   textAlign: "center",
//   width: "100%",
//   backgroundColor: "#7190FF",
//   color: "whiteAlpha.900",
//   flexDirection: "row",
// };

// const PrimaryButton = ({ text, ...props }: PrimaryButtonProps) => {
//   return (
//     <Button
//       sx={style}
//       size="md"
//       //onclick={GrantAccess}
//       {...props}
//     >
//       {text}
//     </Button>
//   );
// };

// export type ItemTitleProps = {
//   status: boolean;
//   text: string | undefined;
// };

// const boxStyle = {
//   position: "absolute",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "left",
//   alignItems: "center",
//   width: "200px",
//   height: "370px",
//   top: "220px",
//   left: "5%",
//   right: "-700px",
//   marginLeft: "auto",
//   marginRight: "auto",
//   background: "#1E1E22",
//   border: "0.42735px solid #303030",
//   boxShadow: "0px 3.4188px 8.54701px 1.7094px rgba(0, 0, 0, 0.2)",
//   borderRadius: "8.54701px",
// };

// const textStyle = {
//   fontFamily: "Inter",
//   fontStyle: "normal",
//   fontWeight: "900",
//   lineHeight: "30px",
//   textAlign: "center",
//   /* identical to box height */
//   display: "flex",
//   alignItems: "center",
// };

// function GrantAccess() {
//   console.log("You clicked!");
//   // Change the image to another one
//   //<Image height='80%' src='/exyGranted.png' alt='Exy' />
//   if (KeyImage.src.match("/exyGranted.png")) {
//     KeyImage.src = "/lock.png";
//     KeyImage.height = "60%";
//     //Access label becomes red
//     AccessLabel.style.color = "#FFCCCB";
//     //Change the text inside labels
//     document.getElementById("KeyNumber").innerHTML = "Member Key";
//     document.getElementById("AccessLabel").innerHTML = "Access denied!";
//     document.getElementById("AccessButton").innerHTML = "Purchase for Ξ0.01";
//   } else {
//     KeyImage.src = "/exyGranted.png";
//     KeyImage.height = "80%";
//     //Access label becomes green
//     AccessLabel.style.color = "#90EE90";
//     document.getElementById("KeyNumber").innerHTML = "Member Key #420";
//     document.getElementById("AccessLabel").innerHTML = "Access granted!";
//     document.getElementById("AccessButton").innerHTML = "Enter Site →";
//   }
// }

// const KeyGranted = ({ status, text, ...props }: ItemTitleProps) => {
//   return (
//     <Box sx={boxStyle}>
//       <Text sx={textStyle} color={"#7190FF"} fontSize={"16px"}>
//         EXY UNITED
//       </Text>

//       <Text id="KeyNumber" sx={textStyle} color={"#FFFFFF"} fontSize={"18px"}>
//         Member Key
//       </Text>

//       <Box>
//         <Image
//           name="KeyImage"
//           height="60%"
//           src="/lock.png"
//           alt="Key Image"
//           //OLD TESTING on click change the image to another one
//           //onClick={() => {GrantAccess()}}
//         />

//         <Text
//           id="AccessLabel"
//           sx={textStyle}
//           color={"#FFCCCB"}
//           justifyContent={"Center"}
//           fontSize={"14px"}
//         >
//           Access denied!
//         </Text>
//         <PrimaryButton
//           id="AccessButton"
//           text="Purchase for Ξ0.01"
//           //On click, grant/deny access
//           onClick={() => {
//             GrantAccess();
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default KeyGranted;
