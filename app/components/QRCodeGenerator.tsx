// components/QRCodeGenerator.js
import React from "react";
import QRCode from "qrcode.react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
} from "@chakra-ui/react";
import crypto from "crypto";

export type QRCodeGeneratorProps = {
  uniqueId: string;
};

function generateUniqueShortString(longString: string) {
  // Generate a hash of the input string
  let hash = crypto.createHash("sha256");
  hash.update(longString);
  let hashedString = hash.digest("base64");

  // Truncate the hashed string to 6 characters
  let shortString = hashedString.substring(0, 6);

  return shortString;
}

const QRCodeGenerator = ({ uniqueId }: QRCodeGeneratorProps) => {
  const uniqueBarcode = generateUniqueShortString(uniqueId);
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="md">STEVE CLIMBING GYM</Heading>
              <Text>MEMBERSHIP</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justify="space-between" direction={"row"}>
          <Box maxW="45%">
            <Text fontSize="md" as="b">
              BARCODE
            </Text>

            <Text fontSize="sm">{uniqueBarcode}</Text>
          </Box>

          <Box maxW="45%">
            <Text fontSize="md" as="b">
              Home Gym
            </Text>
            <Text fontSize="sm">West End</Text>
          </Box>
        </Flex>
        <QRCode value={uniqueId} size={290} level={"H"} includeMargin={true} />
      </CardBody>

      <CardFooter justify="center">
        <Text textAlign={"center"} fontSize={"sm"}>
          Powered by Steve Climbing Gym 2023
        </Text>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
