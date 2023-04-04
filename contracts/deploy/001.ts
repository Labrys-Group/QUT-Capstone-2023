import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  console.log('hopefully this runs');

  const {deployments: {deploy}} = hre; 

  // TODO reseach 
//   await deploy("MyNFT", {
//     args: [], // what goes in constructor
//   }); 
};
export default func;