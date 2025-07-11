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
  // balanceOf function ABI
  "function balanceOf(address owner) view returns (uint256)",
  // transfer function ABI
  "function transfer(address to, uint256 amount) returns (bool)",
];
function DepositFST() {
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
  // atob(IdParam);

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
  const { data: ele } = useQuery(
    ["eleigible_api_1"],
    () =>
      apiConnectorPostWithdouToken(
        endpoint?.eligible_paying,
        { type: 2 },
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

  const data_eligible = ele?.data?.message;

  const { data: fst } = useQuery(
    ["fst_count"],
    () => apiConnectorGetWithoutToken(endpoint?.fst_count, {}, base64String),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const fst_data = fst?.data?.result?.[0]?.count || 0;

  const fk = useFormik({
    initialValues: {
      inr_value: "",
      pack_id: "SelectPackage",
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
          "0x8eCB084E633FC36F16e873A13CD9ae504F6c30b0",
          tokenABI,
          provider
        );
        // Get the balance of the ZP token for the user account
        const tokenBalance = await tokenContract.balanceOf(userAccount);
        setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 8));
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
    if (isNaN(data_eligible)) return toast(data_eligible, { id: `1` });
    if (Number(fst_data) === 0) return toast("There is no pending FST.");
    if (!address?.receiving_key) return toast("Please add Receiving Address");
    if (!"0x8eCB084E633FC36F16e873A13CD9ae504F6c30b0")
      return toast("Please add your contract Address");
    if (!walletAddress) return toast("Please Connect your wallet.");
    if (Number(fst_data) > no_of_Tokne)
      return toast("Your Wallet Amount is low.");
    setLoding(true);

    if (!window.ethereum) {
      toast("MetaMask not detected");
      setLoding(false);
      return;
    }

    // if (fk.values.pack_id === "SelectPackage") {
    //   setLoding(false);
    //   return toast("Select Your Package.");
    // }

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // Chain ID for Binance Smart Chain Mainnet
    });

    try {
      const dummyData = await PayinZpDummy();
      if (dummyData?.success == false) {
        setLoding(false);
        return toast(dummyData?.message);
      }
      const last_id = dummyData?.last_id;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tokenAmount = ethers.utils.parseUnits(
        String(Number(fst_data)?.toFixed(6)),
        8
      ); // Calculate the token amount to transfer

      // Create a contract instance for the token
      const tokenContract = new ethers.Contract(
        "0x8eCB084E633FC36F16e873A13CD9ae504F6c30b0",
        tokenABI,
        signer
      );
      const gasPrice = await provider.getGasPrice();
      const gasEstimate = await tokenContract.estimateGas.transfer(
        "0x0000000000000000000000000000000000000000",
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
        "0x0000000000000000000000000000000000000000",
        tokenAmount
      );
      const receipt = await transactionResponse.wait();

      setTransactionHash(transactionResponse.hash);
      setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");
      // console.log(receipt);
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
      req_amount: Number(fst_data),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: tr_hash,
      u_trans_status: status,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: gasPrice,
      pkg_id: fk.values.pack_id,
      last_id: id,
      table_id: Number(data_eligible),
      tr_type: 2,
    };
    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.game_paying,
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
      req_amount: Number(fst_data),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: "xxxxxxxxxx",
      u_trans_status: 1,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: "",
      pkg_id: fk.values.pack_id,
      deposit_type:"Mlm"
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
                FST(BEP20):{" "}
                <p className="!text-green-500">
                  {Number(no_of_Tokne || 0)?.toFixed(4)}
                </p>
              </p>
            </div>
          </div>
          <p className="my-2 font-bold text-gold-color">Amount</p>
          <TextField
            className="!bg-white"
            id="req_amount"
            name="req_aount"
            value={fst_data}
            onChange={fk.handleChange}
            sx={{
              "& .MuiSelect-select": {
                color: "#60A5FA",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#60A5FA",
                },
                "&:hover fieldset": {
                  borderColor: "#60A5FA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#60A5FA",
                },
              },
            }}
          ></TextField>

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
export default DepositFST;
