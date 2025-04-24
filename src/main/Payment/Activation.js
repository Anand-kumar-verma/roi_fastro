import { Box, MenuItem, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Loader from "../../Shared/Loader";
import {
  apiConnectorGetWithoutToken,
  apiConnectorPostWithdouToken
} from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { enCryptData } from "../../utils/Secret";
const tokenABI = [
  // balanceOf function ABI
  "function balanceOf(address owner) view returns (uint256)",
  // transfer function ABI
  "function transfer(address to, uint256 amount) returns (bool)",
];
function Activation() {
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
  const base64String = atob(IdParam);
  const fk = useFormik({
    initialValues: {
      inr_value: "",
      pack_id: "SelectPackage",
    },
  });
  async function requestAccount() {
    if (!curr_data)
      return toast("Please refresh your page. Polka Rate not found");

    setLoding(true);
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // Chain ID for Binance Smart Chain Mainnet
        });
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
        const tokenContract = new ethers.Contract(
          address?.token_contract_add,
          tokenABI,
          provider
        );
        // Get the balance of the ZP token for the user account
        const tokenBalance = await tokenContract.balanceOf(userAccount);
        setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 18));
      } catch (error) {
        toast("Error connecting...", error);
      }
    } else {
      toast("MetaMask not detected.");
    }
    setLoding(false);
  }

  async function sendTokenTransaction() {
    if (!curr_data)
      return toast("Please refresh your page. Polka Rate not found");
    if (!address?.receiving_key) return toast("Please add Receiving Address");
    if (!address?.token_contract_add)
      return toast("Please add your contract Address");
    if (!walletAddress) return toast("Please Connect your wallet.");
    if(Number(
      Number(
        res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
          ?.pack_amount
      ) / Number(curr_data)
    )>no_of_Tokne)
    return toast("Your Wallet Amount is low.");
    setLoding(true);

    if (!window.ethereum) {
      toast("MetaMask not detected");
      setLoding(false);
      return;
    }

    if (fk.values.pack_id === "SelectPackage") {
      setLoding(false);
      return toast("Select Your Package.");
    }

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // Chain ID for Binance Smart Chain Mainnet
    });

    try {
      const dummyData = await PayinZpDummy();
      const last_id = dummyData?.last_id;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tokenAmount = ethers.utils.parseUnits(
        String(
          Number(
            Number(
              res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
                ?.pack_amount
            ) / Number(curr_data)
          )?.toFixed(6)
        ),
        18
      ); // Calculate the token amount to transfer

      // Create a contract instance for the token
      const tokenContract = new ethers.Contract(
        address?.token_contract_add,
        tokenABI,
        signer
      );
      const gasPrice = await provider.getGasPrice();
      const gasEstimate = await tokenContract.estimateGas.transfer(
        address?.receiving_key,
        tokenAmount
      );

      // Calculate total gas cost in BNB
      const totalGasCost = gasEstimate.mul(gasPrice);
      setGasPrice(ethers.utils.formatEther(totalGasCost));

      const bnbBalance = await provider.getBalance(await signer.getAddress());
      if (bnbBalance.lt(totalGasCost)) {
        setLoding(false);
        return toast(
          `Insufficient BNB for gas fees. You need at least ${ethers.utils.formatEther(
            totalGasCost
          )} BNB.`
        );
      }

      // Validate token balance
      const tokenBalance = await tokenContract.balanceOf(
        await signer.getAddress()
      );
      if (tokenBalance.lt(tokenAmount)) {
        setLoding(false);
        return toast("Insufficient token balance.");
      }

      // Send the token transfer transaction
      const transactionResponse = await tokenContract.transfer(
        address?.receiving_key,
        tokenAmount
      );
      const receipt = await transactionResponse.wait();

      setTransactionHash(transactionResponse.hash);
      setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");
      console.log(receipt);
      // Call PayinZp function with appropriate status and gas price
      if (receipt.status === 1) {
        PayinZp(
          ethers.utils.formatEther(totalGasCost),
          transactionResponse.hash,
          2,
          last_id // Pass last_id here
        );
      } else {
        PayinZp(
          ethers.utils.formatEther(totalGasCost),
          transactionResponse.hash,
          3,
          last_id // Pass last_id here
        );
      }
    } catch (error) {
      console.log(error);
      toast("Token transaction failed", error);
    }

    setLoding(false);
  }

  async function PayinZp(gasPrice, tr_hash, status, id) {
    setLoding(true);

    const reqbody = {
      req_amount:
        Number(
          res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
            ?.pack_amount
        ),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: tr_hash,
      u_trans_status: status,
      currentBNB: curr_data,
      currentZP: no_of_Tokne,
      gas_price: gasPrice,
      pkg_id: fk.values.pack_id,
      last_id: id,
    };
    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.paying_api,
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
      req_amount:
        Number(
          res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
            ?.pack_amount
        ),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: "xxxxxxxxxx",
      u_trans_status: 1,
      currentBNB: curr_data,
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

  const { data: user } = useQuery(
    ["package_api"],
    () =>
      apiConnectorGetWithoutToken(endpoint?.package_list_api, {}, base64String),
    {
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
  const address = general_address?.data?.result?.[0] || [];

  const { data: usd } = useQuery(
    ["curre_api"],
    () =>
      apiConnectorGetWithoutToken(
        `${endpoint?.market_api}?ids=polkadot&vs_currencies=usd`,
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

  const curr_data = usd?.data?.polkadot?.usd;
  return (
    <>
      <Loader isLoading={loding} />

      <div
        className="flex min-h-screen flex-col justify-center items-center bg-[#111022]"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <Box className="!cursor-pointer bg-[#111022]   p-1 lg:!mt-10 !flex !flex-col !justify-center gap-2 lg:w-[30%] w-full">
          <p className="p-5 font-bold text-xl text-center  text-black">
            Activation
          </p>
          <button
            className="!bg-blue-600 rounded-full hover:bg-white hover:text-black  p-2 !text-background"
            onClick={requestAccount}
          >
            Connect Your Wallet
          </button>
          <div className="m-3">
            <div className="flex flex-wrap justify-start">
              <span className="!font-bold">Address : </span>{" "}
              <span className="!text-sm">{walletAddress}</span>
            </div>
            <p className="!font-bold mt-2">Wallet Balance</p>
            <div className="flex flex-wrap justify-start">
              <p className="!font-semibold">BNB : </p> <p>{bnb}</p>
            </div>
            <div className="flex flex-wrap  justify-between">
              <p className="!font-semibold flex">
                DOT : <p>{no_of_Tokne}</p>
              </p>
              <p className="!font-semibold flex">
                Rate : <p>{curr_data}$</p>
              </p>
            </div>
            <div className="flex flex-wrap justify-start">
              <p className="!font-semibold">Pkg : </p>{" "}
              <p>
                {Number(
                  Number(
                    res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
                      ?.pack_amount
                  ) / Number(curr_data)
                )?.toFixed(6)} DOT
              </p>
            </div>
          </div>
          <p className="my-2 font-bold">Select Package Name</p>
          <TextField
            select
            id="pack_id"
            name="pack_id"
            value={fk.values.pack_id}
            onChange={fk.handleChange}
          >
            <MenuItem value="SelectPackage">Select Package</MenuItem>
            {res?.map((item) => (
              <MenuItem key={item?.pack_id} value={item?.pack_id}>
                {item?.pack_name}
              </MenuItem>
            ))}
          </TextField>

          <button
            className="!bg-blue-600 rounded-full hover:bg-white hover:text-black  p-2 !text-background"
            onClick={sendTokenTransaction}
          >
            Confirm
          </button>
          <div className="m-3">
            <div className=" flex flex-wrap justify-start">
              <p>Transaction Hash : </p>{" "}
              <p className="!text-[9px] whitespace-break-spaces">
                {transactionHash}
              </p>
            </div>
            <div className="flex flex-wrap justify-start !gap-4">
              <p>Gas Price : </p> <p className="!font-bold">{gasprice}</p>
            </div>
            <div className="flex flex-wrap justify-start !gap-4">
              <p>Transaction Status : </p>{" "}
              <p className="!font-bold">{receiptStatus}</p>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
export default Activation;
