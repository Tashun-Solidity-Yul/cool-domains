const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domain_Stage2');
    const domainContract = await domainContractFactory.deploy("tash");
    await domainContract.deployed();

    // let txn = await domainContract.register("Tashun",  {value: hre.ethers.utils.parseEther('0.1') , gasLimit: 30000});
    // await txn.wait();
    // txn = await domainContract.setRecord("Tashun", "My Info is available at here",{gasLimit: 30000});
    // await txn.wait();

    const address = await domainContract.getAddress("info");
    console.log("Owner of domain banana:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
    console.log("Contract Address:",domainContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();