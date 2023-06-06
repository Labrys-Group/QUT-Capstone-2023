import { useRouter } from "next/router";
import { WalletContext } from "@/context/walletContext";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext, Provider } from "react";
import { useAccount } from "wagmi";
import LoadingPage from "@/components/LoadingPage";
import PageComponent from "@/components/PageComponent";
import { Contract, utils } from "ethers";

function Item() {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [keyGrantedLoading, setKeyGrantedLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("default");
  const [remainingToken, setRemainingToken] = useState<number | undefined>();
  const [tokenId, setTokenID] = useState<number | undefined>();
  const [access, setAccess] = useState<boolean>(false);

  const [title, setTitle] = useState<string | undefined>("");
  const [clubIndex, setClubIndex] = useState<number | undefined>();
  const [clubName, setClubName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [contractAddress, setContractAddress] = useState<string | undefined>(
    ""
  );
  const [abi, setAbi] = useState<string | undefined>("");
  const [price, setPrice] = useState<string | undefined>("");

  const [right, setRight] = useState<string | undefined>("");
  const [left, setLeft] = useState<string | undefined>("");
  const { data: session } = useSession();

  const router = useRouter();
  const { signer } = useContext(WalletContext);

  const clubs = session?.clubs;

  // get query from router
  const itemName = router.query.item;

  function addUser() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      type: "member",
      content: [
        {
          id: address,
          username: "default",
        },
      ],
    });

    var requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://qut-capstone-2023.vercel.app/api/useDatabase",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    const getUserDB = async () => {
      const res = await fetch("../api/useDatabase?type=member");
      const data = await res.json();
      // check whether user has set username, yes then show username, no then show address
      const matchingUser = data?.find((obj: any) => obj.id === address);
      const username = matchingUser ? matchingUser.username : null;
      if (!matchingUser) {
        // if matchingUser is null, mean it is first time log in, add user to db
        addUser();
      } else {
        setUsername(username);
      }
    };

    getUserDB();
  }, [address]);

  // verify session
  useEffect(() => {
    const securePage = async () => {
      if (!session) {
        router.push("/");
      } else {
        setKeyGrantedLoading(true); // Start loading here
        setLoading(false);
      }
    };
    securePage();
  }, [session, setLoading, itemName]);

  // set all club details
  useEffect(() => {
    if (itemName !== undefined && clubs !== undefined && clubs.length !== 0) {
      const index: number = clubs.findIndex((obj) => obj.name === itemName);
      setClubIndex(index);
      setTitle(clubs[index].title);
      setDescription(clubs[index].description);
      setClubName(clubs[index].name);
      setPrice(clubs[index].price);
      setContractAddress(clubs[index].address);
      setAbi(clubs[index].abi);
    }
  }, [
    itemName,
    clubs,
    setClubIndex,
    setTitle,
    setDescription,
    setClubName,
    setPrice,
    setContractAddress,
    setAbi,
  ]);

  //call /api/getBalance to get the balance of contracts
  async function getTokenRemaining() {
    try {
      if (
        clubIndex !== undefined &&
        clubs !== undefined &&
        contractAddress !== undefined
      ) {
        const contract = contractAddress;
        const abi = clubs[clubIndex].abi;
        const res = await fetch("../api/getBalance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contract, abi }),
        });
        const data = await res.json();
        setRemainingToken(200 - data.totalSupply);
      }
    } finally {
      setKeyGrantedLoading(false);
    }
  }

  // get relevant keyGranted information
  useEffect(() => {
    if (
      session !== undefined &&
      session !== null &&
      contractAddress !== undefined
    ) {
      if (session.owns.ownedNfts.length == 0) {
        getTokenRemaining();
        setAccess(false);
      }
      for (const item of session.owns.ownedNfts) {
        if (
          contractAddress.toLowerCase() == item.contract.address.toLowerCase()
        ) {
          const newStr = item.id.tokenId.replace(/[0x]+/g, "");
          try {
            setTokenID(newStr);
            setAccess(true);
          } finally {
            setKeyGrantedLoading(false);
          }
          return;
        } else {
          getTokenRemaining();
          setAccess(false);
        }
      }
    }
  }, [session, contractAddress, setAccess, setTokenID]);

  // page navigation
  useEffect(() => {
    if (clubIndex !== undefined && clubs !== undefined && clubs.length !== 0) {
      judge();
    }
  }, [clubIndex, clubs, judge]);

  //this function is for side arrow's router
  function judge() {
    if (clubIndex !== undefined && clubs !== undefined) {
      if (clubIndex == clubs.length - 1) {
        setRight(clubs[0].name);
        setLeft(clubs[clubIndex - 1].name);
        return;
      }
      if (clubIndex == 0) {
        setLeft(clubs[clubs.length - 1].name);
        setRight(clubs[clubIndex + 1].name);
        return;
      }
      setRight(clubs[clubIndex + 1].name);
      setLeft(clubs[clubIndex - 1].name);
    }
  }

  const toast = useToast();

  //mint the NFTs and show the toast
  const handleMint = async () => {
    try {
      if (
        contractAddress !== undefined &&
        abi !== undefined &&
        signer !== undefined
      ) {
        toast({
          title: "Loading",
          description: "Trying to mint access token",
          status: "loading",
        });
        const contract = new Contract(contractAddress, abi, signer);
        const transaction = await contract.mint({
          value: utils.parseEther("0.000000000000001"),
        });
        toast({
          title: "Success",
          description: `View transaction at ${transaction.hash}`,
          status: "success",
        });
        setAccess(true);
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: `${e.message}`,
        status: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box>
        <LoadingPage />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text>500</Text>
      </Box>
    );
  }

  return (
    <PageComponent
      image={
        clubName == "exy"
          ? "/" + clubName + "Granted.gif"
          : "/" + clubName + "Granted.png"
      }
      title={title ?? ""}
      description={description ?? ""}
      address={username == "default" ? address : username}
      image_lock="/lockCrop.png"
      backgroundClassName={clubName + "Img"}
      gotoLeft={left ?? ""}
      gotoRight={right ?? ""}
      access={access}
      clubName={clubName ?? ""}
      price={price ?? ""}
      tokenId={tokenId}
      displayRemainingToken={remainingToken ?? 0}
      handleMint={() => handleMint()}
      keyGrantedLoading={keyGrantedLoading}
    />
  );
}

export default Item;
