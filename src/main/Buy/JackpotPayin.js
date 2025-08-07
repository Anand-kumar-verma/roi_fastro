import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Loader from "../../Shared/Loader";
import {
  apiConnectorGetWithoutToken,
  apiConnectorPostWithdouToken,
} from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { deCryptData, enCryptData } from "../../utils/Secret";
const tokenABI = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];
function JackpotPayin() {
  const [walletAddress, setWalletAddress] = useState("");
  const [no_of_Tokne, setno_of_Tokne] = useState("");
  const [no_of_TokneFST, setno_of_TokneFST] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [receiptStatus, setReceiptStatus] = useState("");
  const [bnb, setBnb] = useState("");
  const [gasprice, setGasPrice] = useState("");
  const [loding, setLoding] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location?.search);
  const IdParam = params?.get("token");
  const base64String = IdParam?.trim();
  const { data: general_address } = useQuery(
    ["contract_address_api"],
    () =>
      apiConnectorGetWithoutToken(
        endpoint?.general_contact_address_api,
        {},
        base64String
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const address = deCryptData(general_address?.data?.result)?.[0] || [];
  const fk = useFormik({
    initialValues: {
      inr_value: "",
      req_amount: 0,
    },
  });
  async function requestAccount() {
    setLoding(true);
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // Chain ID for Binance Smart Chain Mainnet
        });
        const userAccount = accounts[0];
        setWalletAddress(userAccount);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const nativeBalance = await provider.getBalance(userAccount);
        setBnb(ethers.utils.formatEther(nativeBalance));
        const tokenContract = new ethers.Contract(
          "0x55d398326f99059fF775485246999027B3197955",
          tokenABI,
          provider
        );
        const tokenContractFST = new ethers.Contract(
          "0x8eCB084E633FC36F16e873A13CD9ae504F6c30b0",
          tokenABI,
          provider
        );
        const tokenBalance = await tokenContract.balanceOf(userAccount);
        setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 18));
        const tokenBalanceFST = await tokenContractFST.balanceOf(userAccount);
        setno_of_TokneFST(ethers.utils.formatUnits(tokenBalanceFST, 8));
      } catch (error) {
        console.log(error);
        toast("Error connecting...", error);
      }
    } else {
      toast("MetaMask not detected.");
    }
    setLoding(false);
  }

  async function sendTokenTransaction() {
    if (!address?.jackpot_receiving_add)
      return toast("Please add Receiving Address");

    if (!walletAddress) return toast("Please Connect your wallet.");

    if (Number(fk.values.req_amount) > no_of_Tokne)
      return toast("Your USDT Wallet is low.");

    if (
      Number(
        Number(fk.values.req_amount || 0) * Number(address?.token_price || 0)
      ) > no_of_TokneFST
    )
      return toast("Your FST Wallet is low.");

    if (!address?.token_contract_add) {
      return toast("FST token contract address is missing.");
    }
    if (!address?.token_price) {
      return toast("FST Price is missing.");
    }

    setLoding(true);

    if (!window.ethereum) {
      toast("MetaMask not detected");
      setLoding(false);
      return;
    }

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // BSC Mainnet
    });

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const usdtDecimals = 18;
      const fstDecimals = 8;

      const usdAmount = String(Number(fk.values.req_amount)?.toFixed(2));
      const fstAmount = String(
        Number(
          Number(fk.values.req_amount || 0) * Number(address?.token_price || 0)
        )?.toFixed(2)
      );

      const dummyData = await PayinZpDummy();
      if (dummyData?.success == false) {
        setLoding(false);
        return toast(dummyData?.message);
      }
      const last_id = dummyData?.last_id;

      const usdtAmount = ethers.utils.parseUnits(usdAmount, usdtDecimals);
      const tokenAmount = ethers.utils.parseUnits(fstAmount, fstDecimals);

      const usdtContract = new ethers.Contract(
        "0x55d398326f99059fF775485246999027B3197955", // USDT
        tokenABI,
        signer
      );

      const fstContract = new ethers.Contract(
        address?.token_contract_add,
        tokenABI,
        signer
      );

      const mainContract = new ethers.Contract(
        "0xAEee0541bA40D6481Bca2986c5C4675A724AeA2f", // Your contract
        ["function transferAndBurn(uint256,uint256) external"],
        signer
      );

      const usdtBalance = await usdtContract.balanceOf(userAddress);
      if (usdtBalance.lt(usdtAmount)) {
        setLoding(false);
        return toast("Insufficient USDT balance.");
      }

      const fstBalance = await fstContract.balanceOf(userAddress);
      if (fstBalance.lt(tokenAmount)) {
        setLoding(false);
        return toast("Insufficient FST balance.");
      }

      // Approvals
      const usdtAllowance = await usdtContract.allowance(
        userAddress,
        mainContract.address
      );
      if (usdtAllowance.lt(usdtAmount)) {
        const approveTx = await usdtContract.approve(
          mainContract.address,
          usdtAmount
        );
        await approveTx.wait();
      }

      const fstAllowance = await fstContract.allowance(
        userAddress,
        mainContract.address
      );
      if (fstAllowance.lt(tokenAmount)) {
        const approveTx = await fstContract.approve(
          mainContract.address,
          tokenAmount
        );
        await approveTx.wait();
      }

      // ✅ Estimate gas only after approvals
      const gasEstimate = await mainContract.estimateGas.transferAndBurn(
        usdtAmount,
        tokenAmount
      );
      const gasPrice = await provider.getGasPrice();
      const gasCost = gasEstimate.mul(gasPrice);
      const bnbBalance = await provider.getBalance(userAddress);

      if (bnbBalance.lt(gasCost)) {
        setLoding(false);
        return toast(
          `Not enough BNB for gas. Need ~${ethers.utils.formatEther(
            gasCost
          )} BNB`
        );
      }

      const tx = await mainContract.transferAndBurn(usdtAmount, tokenAmount);
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        toast("Transaction successful!");
      } else {
        toast("Transaction failed!");
      }

      setTransactionHash(tx.hash);
      setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");

      await PayinZp(
        ethers.utils.formatEther(gasCost),
        tx.hash,
        receipt.status === 1 ? 2 : 3,
        last_id
      );
    } catch (error) {
      console.error(error);
      toast("Transaction failed: " + (error.reason || error.message));
    }

    setLoding(false);
  }

  async function PayinZp(gasPrice, tr_hash, status, id) {
    setLoding(true);

    const reqbody = {
      req_amount: Number(fk.values.req_amount),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: tr_hash,
      u_trans_status: status,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: gasPrice,
      pkg_id: fk.values.pack_id,
      last_id: id,
      table_id: 1,
      tr_type: 1,
    };
    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.jackpot_paying,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      toast(res?.data?.message);
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  async function PayinZpDummy() {
    const reqbody = {
      req_amount: Number(fk.values.req_amount),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: "xxxxxxxxxx",
      u_trans_status: 1,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: "",
      deposit_type: "Jackpot",
    };

    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.paying_dummy_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      console.log(res.data);
      return res?.data || {};
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Loader isLoading={loding} />

      <div
        className="flex h-screen overflow-y-scroll flex-col justify-center items-center bg-custom-gradient p-3"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <Box className="!cursor-pointer bg-custom-gradient  lg:!mt-10 !flex !flex-col !justify-center gap-2 lg:w-[30%] w-full p-2 border border-gold-color rounded-lg shadow-2xl">
          <div className="flex justify-center gap-[10%] items-center mt-1 p-2  w-full border border-gold-color rounded focus:ring-blue-500 focus:border-blue-500">
            <AccountBalanceIcon className="!text-gold-color !text-[80px]" />
          </div>
          <button
            className="!bg-gradient-to-tr  from-gold-color to-text-color rounded-full hover:bg-white hover:text-black  p-2 !text-background"
            onClick={requestAccount}
          >
            Connect Your Wallet
          </button>
          <div className="m-3 bg-glassy p-4">
            <div className="flex flex-wrap justify-start items-center">
              <span className="!font-bold text-gold-color">Address : </span>{" "}
              <span className="!text-sm">
                {walletAddress?.substring(0, 10)}...
                {walletAddress?.substring(
                  walletAddress?.length - 10,
                  walletAddress?.length
                )}
              </span>
            </div>
           <div className="flex flex-wrap justify-start items-center">
              <span className="!font-bold text-gold-color">User ID : </span>{" "}
              <span className="!text-sm text-gold-color">{" "}{base64String}</span>
            </div>
            <p className="!font-bold mt-2 text-gold-color">Wallet Balance</p>
            <div className="flex flex-wrap justify-start items-center">
              <p className="!font-semibold text-gold-color">BNB : </p>{" "}
              <p className="!text-green-500">{bnb}</p>
            </div>
            <div className="flex flex-wrap  justify-between">
              <p className="!font-semibold flex text-gold-color">
                USDT(BEP20):{" "}
                <p className="!text-green-500">
                  {Number(no_of_Tokne || 0)?.toFixed(4)}
                </p>
              </p>
            </div>
            <div className="flex flex-wrap  justify-between">
              <p className="!font-semibold flex text-gold-color">
                FST:{" "}
                <p className="!text-green-500">
                  {Number(no_of_TokneFST || 0)?.toFixed(4)}
                </p>
              </p>
            </div>
          </div>
          <p className="font-bold text-gold-color">No of ticket</p>
          <TextField
            className="!bg-white"
            id="req_amount"
            name="req_amount"
            value={fk.values.req_amount}
            onChange={fk.handleChange}
          />
          <p className=" font-bold text-gold-color">FST Count:</p>
          <TextField
            className="!bg-white"
            id="req_amount"
            name="req_amount"
            value={
              Number(fk.values.req_amount || 0) *
              Number(address?.token_price || 0)
            }
            // onChange={fk.handleChange}
          />

          <button
            className="!bg-gold-color rounded-full hover:bg-white hover:text-black  p-2 !text-background"
            onClick={sendTokenTransaction}
          >
            Confirm
          </button>
          <div className="m-3 bg-glassy p-4">
            <div className=" flex flex-wrap justify-start items-center">
              <p className="text-gold-color">Transaction Hash : </p>{" "}
              <p className="!text-[9px] whitespace-break-spaces text-gold-color">
                {transactionHash}
              </p>
            </div>
            <div className="flex flex-wrap justify-start items-center !gap-4">
              <p className="text-gold-color">Gas Price : </p>{" "}
              <p className="!font-bold text-gold-color">{gasprice}</p>
            </div>
            <div className="flex flex-wrap justify-start items-center !gap-4">
              <p className="text-gold-color">Transaction Status : </p>{" "}
              <p className="!font-bold text-gold-color">{receiptStatus}</p>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
export default JackpotPayin;
