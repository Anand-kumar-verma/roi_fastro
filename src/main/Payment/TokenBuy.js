import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import Loader from "../../Shared/Loader";
import {
  apiConnectorGetWithoutToken,
  apiConnectorPostWithdouToken,
} from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { deCryptData, enCryptData } from "../../utils/Secret";
import { use } from "react";
const tokenABI = [
  // balanceOf function ABI
  "function balanceOf(address owner) view returns (uint256)",
  // transfer function ABI
  "function transfer(address to, uint256 amount) returns (bool)",
];
const distributorABI = [
  "function distribute(address to, uint256 amount) external",
];
function TokenBuy() {
  const client = useQueryClient();
  const [walletAddress, setWalletAddress] = useState("");
  const [no_of_Tokne, setno_of_Tokne] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [receiptStatus, setReceiptStatus] = useState("");
  const [bnb, setBnb] = useState("");
  const [gasprice, setGasPrice] = useState("");
  const [loding, setLoding] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location?.search);
  const IdParam = params?.get("token");
  const base64String = IdParam?.trim();
  //  atob(IdParam);

  const {
    data: user,
    refetch,
    isError,
    error,
  } = useQuery(
    ["get_user_wallet"],
    () =>
      apiConnectorPostWithdouToken(
        endpoint?.get_user_wallet_by_cust_id,
        { lgn_cust_id: fk.values.user_id },
        base64String
      ),
    {
      enabled: false, // 👈 disables automatic call
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = user?.data?.result || [];

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
      user_id: "",
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

        // if (profile?.[0]?.lgn_wallet_add?.toLowerCase() !== userAccount?.toLowerCase()) {
        //     setLoding(false);
        //     alert("Select Your correct wallet address.")
        //     window.location.reload()
        //     return

        // }

        setWalletAddress(userAccount);
        // Create a provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the native token balance (BNB)
        const nativeBalance = await provider.getBalance(userAccount);
        setBnb(ethers.utils.formatEther(nativeBalance));
        // Create a contract instance for the ZP token
        // console.log(address?.token_contract_add);
        const tokenContract = new ethers.Contract(
          "0x55d398326f99059fF775485246999027B3197955",
          tokenABI,
          provider
        );
        // Get the balance of the ZP token for the user account
        const tokenBalance = await tokenContract.balanceOf(userAccount);
        setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 18));
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
  if (!res?.lgn_wallet_add) return toast("Please add Receiving Address");
  if (!user?.data?.success) return toast(user?.data?.message);
  if (!walletAddress) return toast("Please connect your wallet.");
  if (Number(fk.values.inr_value) > no_of_Tokne)
    return toast("Your wallet amount is low.");

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
    const dummyData = await PayinZpDummy();
    if (!dummyData?.success || !dummyData?.last_id || Number(dummyData?.last_id) < 1) {
      setLoding(false);
      return toast(dummyData?.message || "Transaction init failed");
    }

    const last_id = Number(dummyData?.last_id);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tokenAmount = ethers.utils.parseUnits(
      String(Number(fk.values.inr_value)?.toFixed(6)),
      18
    );

    const usdtTokenAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT BEP-20
    const distributorAddress = "0x34EEAe8338A19f29e217cF8331954A18f34176C2";

    const usdtABI = [
      "function approve(address spender, uint256 amount) public returns (bool)",
      "function allowance(address owner, address spender) public view returns (uint256)",
      "function balanceOf(address account) public view returns (uint256)",
    ];

    const distributorABI = [
      "function distribute(address to, uint256 amount) external",
    ];

    const usdtContract = new ethers.Contract(usdtTokenAddress, usdtABI, signer);
    const distributorContract = new ethers.Contract(distributorAddress, distributorABI, signer);

    // ✅ Check token balance
    const tokenBalance = await usdtContract.balanceOf(await signer.getAddress());
    if (tokenBalance.lt(tokenAmount)) {
      setLoding(false);
      return toast("Insufficient USDT balance.");
    }

    // ✅ Check and approve if required
    const allowance = await usdtContract.allowance(await signer.getAddress(), distributorAddress);
    if (allowance.lt(tokenAmount)) {
      const approveTx = await usdtContract.approve(distributorAddress, tokenAmount);
      await approveTx.wait();
    }

    // ✅ Estimate gas (fallback if error)
    let gasLimit;
    try {
      const estimateGas = await distributorContract.estimateGas.distribute(
        res?.lgn_wallet_add,
        tokenAmount
      );
      const gasPrice = await provider.getGasPrice();
      const totalGasCost = estimateGas.mul(gasPrice);
      setGasPrice(ethers.utils.formatEther(totalGasCost));

      const bnbBalance = await provider.getBalance(await signer.getAddress());
      if (bnbBalance.lt(totalGasCost)) {
        setLoding(false);
        return toast(`Insufficient BNB for gas. Need ${ethers.utils.formatEther(totalGasCost)} BNB.`);
      }

      gasLimit = estimateGas;
    } catch (e) {
      gasLimit = ethers.BigNumber.from("200000"); // fallback
    }

    // ✅ Call distribute function
    const tx = await distributorContract.distribute(res?.lgn_wallet_add, tokenAmount, {
      gasLimit,
    });
    const receipt = await tx.wait();

    setTransactionHash(tx.hash);
    setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");

    if (receipt.status === 1) {
      toast.success("Transaction successful");
      await PayinZp(ethers.utils.formatEther(gasLimit), tx.hash, 2, last_id);
    } else {
      toast.error("Transaction failed");
      await PayinZp(ethers.utils.formatEther(gasLimit), tx.hash, 3, last_id);
    }

  } catch (error) {
    console.error(error);
    toast.error("Token transaction failed");
  }

  setLoding(false);
}


  async function PayinZp(gasPrice, tr_hash, status, id) {
    setLoding(true);

    const reqbody = {
      seller_id: res?.lgn_jnr_id,
      req_amount: Number(fk.values.inr_value),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: tr_hash,
      u_trans_status: status,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: gasPrice,
      pkg_id: fk.values.pack_id,
      last_id: id,
    };
    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.fst_buy_order,
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
      seller_receiver_wallet: res?.lgn_wallet_add,
      seller_id: res?.lgn_jnr_id,
      req_amount: Number(fk.values.inr_value),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: "xxxxxxxxxx",
      u_trans_status: 1,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: "",
      pkg_id: fk.values.pack_id,
    };

    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.paying_dummy_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
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
          </div>
          <p className="font-bold text-gold-color">Enter Seller Id:</p>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <TextField
                className="!bg-white"
                id="user_id"
                name="user_id"
                value={fk.values.user_id}
                onChange={fk.handleChange}
              />
              {!user?.data?.success ? (
                <span className="!text-[10px] !text-rose-500">
                  {user?.data?.message}
                </span>
              ) : (
                <span className="!text-[10px] !text-green-500">
                  {res?.lgn_wallet_add}
                </span>
              )}
            </div>
            <Button
              variant="contained"
              onClick={() => fk.values.user_id && refetch()}
            >
              Fetch
            </Button>
          </div>
          <p className="font-bold text-gold-color">
            Enter USD: (FST Price: {Number(address?.token_price)?.toFixed(2)})
          </p>
          <TextField
            className="!bg-white"
            id="inr_value"
            name="inr_value"
            value={fk.values.inr_value}
            onChange={fk.handleChange}
          />
          <p className="font-bold text-gold-color">Token Count:</p>
          <TextField
            className="!bg-white"
            value={Number(
              Number(fk.values.inr_value) * Number(address?.token_price) * 0.9
            )?.toFixed(2)}
            onChange={fk.handleChange}
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
export default TokenBuy;
