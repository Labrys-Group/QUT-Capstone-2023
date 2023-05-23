import { WalletContext } from "../context/walletContext";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Text, Box, Flex, useToast } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";
import { Contract, utils } from "ethers";
import useClubDetails from "@/hooks/useClubDetails";

type KeyGrantedProps = {
  accessGranted: boolean;
  clubName: string;
  image_lock: string;
  image: string;
  tokenNumber?: number;
  remainingToken?: number;
  totalToken?: number;
  price?: string;
  handleMint(): void;
  title: string;
};

const boxStyle = {
  flexDirection: "column",
  backgroundColor: "#1E1E22",
  padding: "1em",
  borderRadius: "10px",
  textAlign: "left",
  width: { base: "65vw", md: "274px" },
  boxShadow: "0px 3.4188px 8.54701px 1.7094px rgba(0, 0, 0, 0.2)",
  border: "0.42735px solid #303030",
  minHeight: { base: "0", md: "250px" },
  margin: { base: "0", md: "12px 0px" },
};

const KeyGranted = ({
  accessGranted,
  clubName,
  image,
  image_lock,
  tokenNumber,
  remainingToken,
  totalToken,
  price,
  title,
  handleMint,
}: KeyGrantedProps) => {
  const displayRemaining = remainingToken + `/${totalToken}`;

  const clubName_noSpace = clubName.replace(/ /g, "_");

  // use hook
  const router = useRouter();

  // const {contractAddress, abi} = useClubDetails(router.pathname)
  //const { erc721, signer, accountAddress, balance } = useContext(WalletContext);

  const handleClick = () => {
    //hardcoded for exy page
    router.push(`/${clubName}`);
  };
  return (
    <Flex id={clubName_noSpace + "_Box"} sx={boxStyle}>
      <Text className="blueTxtBold">{title}</Text>
      <Text className="headingSm">
        Member Key {accessGranted ? `#${tokenNumber}` : null}
      </Text>
      {accessGranted ? (
        <Image
          id={clubName + "_unlockImage"}
          src={image}
          alt="Unlocked-image"
          boxSize="250px"
          objectFit="cover"
          margin="12px 0px"
        />
      ) : (
        <Box
        // minHeight={{ base: "0", md: "250px" }}
        // margin={{ base: "0", md: "12px 0px" }}
        >
          <Image
            src={image_lock}
            alt="locked-image"
            boxSize="250px"
            objectFit="cover"
            margin="auto"
            id={clubName_noSpace + "_LockImage"}
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
          onClick={() => {
            handleClick();
            console.log(router);
          }}
        >
          Enter Site
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={handleMint}>
          Purchase for Ξ0.01
          {/* {price} */}
        </PrimaryButton>
      )}
    </Flex>
  );
};

export default KeyGranted;
