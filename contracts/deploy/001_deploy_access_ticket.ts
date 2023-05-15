import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { privateEncrypt } from "crypto";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const clubs = [
    {
      name: "exy",
      description:
        "An exclusive online community dedicated to fans of EXY, leader of the K-pop girl group COSMIC GIRLS (also known as WJSN). This community is a gathering place for fans who admire EXY's talents, personality, and unique style. As a member of the EXY Community, you will have access to exclusive content, such as behind-the-scenes footage, photos, and interviews. You will also be able to connect with other fans from all over the world who share your love for EXY and COSMIC GIRLS.",
      symbol: "EXY",
      title: "EXY United",
      price: "0.000000000000001",
    },
    {
      name: "climbing",
      description:
        "Our state-of-the-art facility offers some of the most intense and exciting climbing experiences you'll find anywhere. And as a member of our club, you'll get exclusive access to training programs, gear reviews, and interviews with some of the top climbers in the world.",
      symbol: "climbing",
      title: "Steve Climbing Gym",
      price: "0.000000000000001",
    },
    {
      name: "tableTennis",
      description:
        "Welcome to the Table Tennis Club, where we are passionate about the sport of ping pong! As a member of our exclusive club, you'll have access to a wealth of exclusive content, including training videos, match highlights, and interviews with some of the top players in the game.",
      symbol: "tableTennis",
      title: "Table Tennis",
      price: "0.000000000000001",
    },
  ];

  const {
    deployments,
    deployments: { deploy },
    getNamedAccounts,
  } = hre;

  const { deployer } = await getNamedAccounts();

  for (let i = 0; i < clubs.length; i++) {
    await deploy("AccessTicket", {
      from: deployer,
      args: [clubs[i].name, clubs[i].symbol],
      log: true,
    });

    const contractInfo = await deployments.get("AccessTicket");

    await addContract(
      (i + 1).toString(),
      clubs[i].name,
      contractInfo.abi,
      contractInfo.address,
      clubs[i].description,
      clubs[i].title,
      clubs[i].price
    );
  }
};

async function addContract(
  id: string,
  name: string,
  abi: Object,
  address: string,
  description: string,
  title: string,
  price: string
) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    type: "club",
    content: [
      {
        id: id,
        name: name,
        abi: abi,
        address: address,
        description: description,
        title: title,
        price: price,
      },
    ],
  });

  var requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:3000/api/useDatabase", requestOptions)
    .then((response: Response) => response.text())
    .then((result: string) => console.log(result))
    .catch((error: any) => console.log("error", error));
}
export default func;
