const contractAddress = "0x445f25f51e5Eb4f6b3e61726b1c4eC6d3Aa88329";


const TestDomain = async () => {
    const domainContract = await hre.ethers.getContractAt("Domain_Stage2", contractAddress);
    // let txn = await domainContract.register("Tashun",  {value: hre.ethers.utils.parseEther('0.1')});
    // await txn.wait();
    let address = await domainContract.getAddress("Tashun");
    console.log(address);
    // const startEstimate = await domainContract.estimateGas.setRecord("Tashun", "My Info is available at here");
    // console.log(startEstimate)
    // txn = await domainContract.setRecord("Tashun", "My Info is available at here",{gasLimit: startEstimate});
    // await txn.wait();
    const record = await domainContract.getRecord("Tashun");
    console.log(record);

}
TestDomain();