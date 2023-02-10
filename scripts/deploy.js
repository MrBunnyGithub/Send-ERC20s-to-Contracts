const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc20",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "drop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("GoofyGoober");
  const token = await Token.deploy();

  console.log("Token address:", token.address);

  const BUCKET_CA = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
  const AMOUNT = ethers.utils.parseUnits('50', 'ether'); // total amount to spend

  console.log("Approving bucket for spending...");
  tx = await token.approve(BUCKET_CA,AMOUNT);
  await tx.wait();
  console.log("Transaction:",tx.hash);

  console.log("Invoking Drop Function...");
  const bucketContract = new ethers.Contract(BUCKET_CA, abi, deployer)
  tx  = await bucketContract.drop(token.address,AMOUNT);
  await tx.wait();
  console.log("Transaction:",tx.hash);

  console.log("Completed.");
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});