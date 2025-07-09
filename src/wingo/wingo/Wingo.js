import { Cancel, CopyAll, Refresh, TabletMac } from "@mui/icons-material";
import VolumeUpIcon from "@mui/icons-material/VolumeUpOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Box,
  Button,
  Container,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { apiConnectorGet } from "../../utils/APIConnector";
import { endpoint, frontend } from "../../utils/APIRoutes";
import balance from "../assets/images/balance.png";
import refresh from "../assets/images/refresh.png";
import time from "../assets/images/time.png";
import { wallet_real_balanceFn } from "../redux/slices/counterSlice";
import { rupees } from "../services/urls";
import CustomCircularProgress from "../shared/loder/CustomCircularProgress";
import theme from "../utils/theme";
import Wingo10Min from "./component/Wingo10Min";
import Wingo1Min from "./component/Wingo1Min";
import Wingo3Min from "./component/Wingo3Min";
import Wingo5Min from "./component/Wingo5Min";
import PromotionData from "./PromotionData";
import WinLossPopup from "./WinLossPopup";
import Diversity1Icon from '@mui/icons-material/Diversity1';
function Wingo() {
  const navigate = useNavigate();
  const [value, setValue] = useState(3);
  const [opendialogbox, setOpenDialogBox] = useState(false);
  const isAppliedbet = localStorage.getItem("betApplied");
  const dummycounter = useSelector((state) => state.aviator.dummycounter);
  const wallet_amount_data = useSelector(
    (state) => state.aviator.wallet_real_balance
  );
  const client = useQueryClient();
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    setTimeout(() => {
      if (isAppliedbet?.split("_")?.[1] === String(true)) {
        setOpenDialogBox(true);
        setTimeout(() => {
          setOpenDialogBox(false);
          localStorage.setItem("betApplied", false);
        }, 5000);
      }
    }, 1000);
  }, [dummycounter]);

  const { isLoading, data: wallet_amount } = useQuery(
    ["wallet_amount"],
    () => apiConnectorGet(endpoint?.game_profile),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const profile = wallet_amount?.data?.result?.[0] || {};

  React.useEffect(() => {
    dispatch(
      wallet_real_balanceFn(Number(profile?.jnr_wingo_game_wallet) || 0)
    );
  }, [profile?.jnr_wingo_game_wallet]);

  function refreshFunctionForRotation() {
    client.refetchQueries("wallet_amount");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0];

    const element = document.getElementById("refresh_button");
    if (!item) {
      element.classList.add("rotate_refresh_image");
    }
    setTimeout(() => {
      element.classList.remove("rotate_refresh_image");
    }, 2000);
  }
  useEffect(() => {
    const element = document.getElementById("refresh_button");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0];
    if (item) {
      element.classList.remove("rotate_refresh_image");
    }
  }, []);

  const handleCopy = (url) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.error("Failed to copy link.");
        });
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          toast.success("Link copied to clipboard!");
        } else {
          toast.error("Copy failed. Please try manually.");
        }
      } catch (err) {
        console.error("Fallback copy failed: ", err);
        toast.error("Clipboard not supported in this browser.");
      }

      document.body.removeChild(textArea);
    }
  };
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // or "center" for vertical center
        minHeight: "100vh",
        backgroundColor: "#000", // optional, for consistent look
        paddingTop: 2,
        paddingBottom: 8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#000", // optional
        }}
      >
        <Box
          sx={{
            padding: 1,
            background: "black",
            px: 2,
          }}
        >
          <CustomCircularProgress isLoading={isLoading} />
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              className="!rounded-full"
              onClick={() => {
                handleCopy(
                  frontend + "/wingo-payin?token=" + localStorage.getItem("uid")
                );
                // toast.success("Copy to clipboard", { id: 1 });
              }}
            >
              Deposit
            </Button>
            <Refresh
              onClick={() =>
                navigate("/topup_detail", {
                  state: {
                    type: "wingo",
                  },
                })
              }
            />
            <Button
              variant="contained"
              className="!rounded-full !bg-gold-color !text-text-color !font-bold"
              onClick={() =>
                Number(profile?.jnr_wingo_game_wallet || 0) > 0
                  ? navigate("/withdrawal-link", {
                      state: {
                        type: "wingo",
                      },
                    })
                  : toast("Your Amount is low.", { id: 1 })
              }
            >
              Withdrawal
            </Button>
            <Refresh
              onClick={() =>
                navigate("/withdrawalhistory", {
                  state: {
                    type: "wingo",
                  },
                })
              }
            />
            <Diversity1Icon
              onClick={() => setOpenDialogBox("promotion")}
            />
             
          </Stack>
          <Stack direction="row" className="!items-center !gap">
            <div className="!flex !justify-between !w-full !items-center">
              <span className="!text-xs">https://fastro.info/wingo-payin</span>
              <span>
                {" "}
                {localStorage.getItem("uid") && (
                  <CopyAll
                    onClick={() => {
                      handleCopy(
                        frontend +
                          "/wingo-payin?token=" +
                          localStorage.getItem("uid")
                      );
                      // toast.success("Copy to clipboard", { id: 1 });
                    }}
                    className="text-gold-color !text-xs"
                  />
                )}
              </span>
            </div>
            {/* <NavLink onClick={() => setmusicicon(!musicicon)}>
                {musicicon === true ? (
                  <Box component="img" src={music} width={25}></Box>
                ) : (
                  <Box component="img" src={musicoff} width={25}></Box>
                )}
              </NavLink> */}
          </Stack>
        </Box>
        <Box
          sx={{
            padding: 1,
            background: "#111022",
            px: 2,
          }}
        >
          <Box
            sx={{
              background: "white",
              padding: 2,
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography
                variant="body1"
                color="initial"
                fontSize="15px"
                fontWeight={600}
              >
                {rupees} {wallet_amount_data}{" "}
              </Typography>
              <div className="mx-1 rotate_refresh_image" id="refresh_button">
                <img
                  src={refresh}
                  width={25}
                  ml={2}
                  onClick={() => {
                    refreshFunctionForRotation();
                  }}
                />
              </div>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Box component="img" src={balance} width={25} mr={2}></Box>
              <Typography
                variant="body1"
                color="initial"
                fontSize="13px"
                fontWeight={400}
              >
                Wallet balance{" "}
              </Typography>
            </Stack>
          </Box>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              px: 1,
              py: 1,
              background: "#FFFBE8",
              borderRadius: "10PX",
              mt: 2,
              mb: 2,
            }}
          >
            <VolumeUpIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontWeight: 500,
                fontSize: "10px",
                mr: 1,
                textAlign: "center",
                color: theme.palette.primary.main,
              }}
            >
              1.All recharge methods only available in RECHARGE menu on OFFICIAL
            </Typography>
            <Typography className="!bg-black !text-white !text-xs rounded-2xl px-2 py-1 !flex justify-center">
              <WhatshotIcon fontSize="small" /> Details
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "95%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "auto",
            background: "#111022",
            borderRadius: "10PX",
            mt: 2,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <NavLink
              className={value === 3 ? " wingonavactive wingonav" : " wingonav"}
              onClick={() => handleChange(3)}
            >
              <Box component="img" src={time} width={40}></Box>
              <Typography variant="body1" color="initial">
                Win Go
              </Typography>
              <Typography variant="body1" color="initial">
                30 Sec
              </Typography>
            </NavLink>
          </Box>
          <Box sx={{ width: "50%" }}>
            <NavLink
              className={value === 1 ? " wingonavactive wingonav" : " wingonav"}
              onClick={() => handleChange(1)}
            >
              <Box component="img" src={time} width={40}></Box>
              <Typography variant="body1" color="initial">
                Win Go
              </Typography>
              <Typography variant="body1" color="initial">
                1 Min
              </Typography>
            </NavLink>
          </Box>
        </Box>
        {value === 1 && <Wingo1Min />}
        {value === 2 && <Wingo3Min />}
        {value === 3 && <Wingo5Min />}
        {value === 4 && <Wingo10Min />}
        {opendialogbox && (
          <Dialog
            open={opendialogbox}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            {opendialogbox === "promotion" ? (
              <PromotionData />
            ) : (
              <WinLossPopup gid={isAppliedbet?.split("_")?.[0]} />
            )}
            <p className="!text-center !text-white">
              <Cancel onClick={() => setOpenDialogBox(false)} />
            </p>
          </Dialog>
        )}
      </Box>
    </Container>
  );
}

export default Wingo;
