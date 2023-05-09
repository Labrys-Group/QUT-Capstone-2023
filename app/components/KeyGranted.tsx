import { WalletContext } from "../context/walletContext";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Text, Box, Flex, useToast } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";
import { utils } from "ethers";

type KeyGrantedProps = {
  accessGranted: boolean;
  clubName: string;
  image: string;
  tokenNumber?: number;
  remainingToken?: number;
  totalToken?: number;
  price?: number;
};

const boxStyle = {
  flexDirection: "column",
  backgroundColor: "#1E1E22",
  padding: "1em",
  borderRadius: "10px",
  textAlign: "left",
  maxWidth: { base: "65vw", md: "274px" },
  boxShadow: "0px 3.4188px 8.54701px 1.7094px rgba(0, 0, 0, 0.2)",
  border: "0.42735px solid #303030",
  minHeight: { base: "0", md: "250px" },
  margin: { base: "0", md: "12px 0px" },
};

const KeyGranted = ({
  accessGranted,
  clubName,
  image,
  tokenNumber,
  remainingToken,
  totalToken,
  price,
}: KeyGrantedProps) => {
  const displayRemaining = remainingToken + `/${totalToken}`;

  // use hook
  const router = useRouter();
  const toast = useToast();
  const { erc721, signer, accountAddress, balance } = useContext(WalletContext);

  const handleMint = async () => {
    console.log("click on mint function");
    console.log("signer", signer);
    console.log("account address", accountAddress);
    console.log("balance", balance);

    if (erc721 === undefined) {
    } else {
      try {
        toast({
          title: "Loading",
          description: "Trying to mint access token",
          status: "loading",
        });
        const transaction = await erc721.mint({
          value: utils.parseEther("0.000000000000001"),
        });
        toast({
          title: "Success",
          description: `View transaction at ${transaction.hash}`,
          status: "success",
        });
      } catch (e: any) {
        toast({
          title: "Error",
          description: `${e.error.message}`,
          status: "error",
        });
      }
    }
  };

  const handleClick = () => {
    //hardcoded for exy page
    router.push("/exy");
  };
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
        <Box
        // minHeight={{ base: "0", md: "250px" }}
        // margin={{ base: "0", md: "12px 0px" }}
        >
          <Image
            src="/lockCrop.png"
            alt="locked-image"
            boxSize="250px"
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
          onClick={() => {
            handleClick();
            console.log(router);
          }}
        >
          Enter Site
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={handleMint}>
          Purchase for Ξ{price}
        </PrimaryButton>
      )}
    </Flex>
  );
};

export default KeyGranted;
