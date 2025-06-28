// import Signup from "../Adminpages/Authentication/Signup";
// import BankList from "../Adminpages/Pages/Bank/Banklist";
// import Changepassword from "../Adminpages/Pages/changepassword/Changepassword";
// import ColorPrediction1Min from "../Adminpages/Pages/colorprediction/ColorPrediction1Min";
// import ColorPrediction2Min from "../Adminpages/Pages/colorprediction/ColorPrediction2Min";
// import ColorPrediction3Min from "../Adminpages/Pages/colorprediction/ColorPrediction3Min";
// import AddCompany from "../Adminpages/Pages/companypromoter/AddCompany";
// import AddCoupon from "../Adminpages/Pages/Coupon/addcoupon";
// import Coupon from "../Adminpages/Pages/Coupon/coupon";
// import DirectCoupon from "../Adminpages/Pages/Coupon/directCoupon";
import Dashboard from "../Adminpages/Pages/dashboard/Dashboard";
import BoosterBonus from "../Adminpages/Pages/genealogy/BoosterBonus";
import MatchingBonus from "../Adminpages/Pages/genealogy/BoosterBonus";
import DirectBonus from "../Adminpages/Pages/genealogy/DirectBonus";
// import DayBookReport from "../Adminpages/Pages/DayBookReport/daybookreport";
// import DebitFund from "../Adminpages/Pages/fund/Debitfund";
// import DebitFundHistory from "../Adminpages/Pages/fund/DebitFundhistory";
// import Fund from "../Adminpages/Pages/fund/Fund";
// import FundHistory from "../Adminpages/Pages/fund/FundHistory";
import P2pHistory from "../Adminpages/Pages/fund/P2pHistory";
// import ApprovedRequest from "../Adminpages/Pages/gamewithdrawlrequest/ApprovedRequest";
// import GameWithdrawlRequest from "../Adminpages/Pages/gamewithdrawlrequest/GameWithdrawlRequest";
// import PendingRequest from "../Adminpages/Pages/gamewithdrawlrequest/PendingRequest";
// import RejectRequest from "../Adminpages/Pages/gamewithdrawlrequest/RejectRequest";
// import CashbackBonus from "../Adminpages/Pages/genealogy/CashbackBonus";
// import CompanyPromoterBonus from "../Adminpages/Pages/genealogy/CompanyPromoter";
// import DownLine from "../Adminpages/Pages/genealogy/DownLine";
// import GiftBonus from "../Adminpages/Pages/genealogy/GiftBonus";
import LevelBonus from "../Adminpages/Pages/genealogy/LevelBonus";
import ROIBonus from "../Adminpages/Pages/genealogy/ROIBonus";
import WeeklyBonus from "../Adminpages/Pages/genealogy/WeeklyBonus";
// import SalaryBonus from "../Adminpages/Pages/genealogy/SailaryBonus";
// import SelfDepositBonus from "../Adminpages/Pages/genealogy/SelfDepositBonus";
// import TeamReferral from "../Adminpages/Pages/genealogy/TeamRefferral";
// import VipBonus from "../Adminpages/Pages/genealogy/VipBonus";
// import WeeklyBonus from "../Adminpages/Pages/genealogy/WeeklyBonus";
// import WelcomeBonus from "../Adminpages/Pages/genealogy/Welcomebonus";
// import INRPaying from "../Adminpages/Pages/INRPayment/INRPaying";
import INRPayout from "../Adminpages/Pages/INRPayment/INRPayout";
import UserDetail from "../Adminpages/Pages/Team/User";
import TopUp from "../Adminpages/Pages/Topup";
import TopUpDetail from "../Adminpages/Pages/TopUP/TopUpDetail";
// import INRApprove from "../Adminpages/Pages/INRPaymentManually/INRApprove";
// import INRPending from "../Adminpages/Pages/INRPaymentManually/INRPending";
// import INRReject from "../Adminpages/Pages/INRPaymentManually/INRReject";
// // import INRSuccess from "../Adminpages/Pages/INRPaymentManually/INRSuccess";
// import Master from "../Adminpages/Pages/Master/MAster";
import UserPermission from "../Adminpages/Pages/Permission/Userpermission";
import FstList from "../Adminpages/Pages/INRPayment/FstList";
import BurningEvent from "../Adminpages/Pages/burning/BurningEvent";
import TeamIncome from "../Adminpages/Pages/TopUP/TeamIncome";
// import LogInApproval from "../Adminpages/Pages/player/LogInApproval";
// import Player from "../Adminpages/Pages/player/Player";
// import AviatorReport from "../Adminpages/Pages/Report/AvaitorReport";
// import TrxReport from "../Adminpages/Pages/Report/TrxReport";
// import WingoReport from "../Adminpages/Pages/Report/WingoReport";
// import RouletteResult from "../Adminpages/Pages/Roulette/Roulette";
// import DesawarResult from "../Adminpages/Pages/sattamatka/Desawar";
// import FaridabadResult from "../Adminpages/Pages/sattamatka/Faridabad";
// import GaliResult from "../Adminpages/Pages/sattamatka/Gali";
// import GhaziabadResult from "../Adminpages/Pages/sattamatka/Ghaziabad";
// import SetBonus from "../Adminpages/Pages/SetBonus/SetBonus";
// import DownlineTeam from "../Adminpages/Pages/Team/DownlineTeam";
import DownlineTeams from "../Adminpages/Pages/Team/DownlineTeams";
import TicketListAdmin from "../Income/TicketListAdmin";
// import UplineTeam from "../Adminpages/Pages/Team/UplineTeam";
// import ZpToken from "../Adminpages/Pages/Zptoken/ZpToken";
// import ZpTokenPayout from "../Adminpages/Pages/Zptoken/ZpTokenPayout";

export const adminroutes = [
  {
    id: 2,
    path: "/admindashboard",
    component: <Dashboard />,
    navItem: "Dashboard",
  },
  {
    id: 276,
    path: "/ticket-list-admin",
    component: <TicketListAdmin />,
    navItem: "Jak Ticket",
  },
  {
    id: 123456,
    path: "/downlineteam",
    component: <DownlineTeams />,
    navItem: "Team",
  },
  {
    id: 49,
    path: "/fst_detail",
    navItem: "FST Detail",
    component: <FstList />,
  },
  {
    id: 123,
    path: "/team-income",
    navItem: "Team Income",
    component: <TeamIncome />,
  },
  // {
  //   id: 1,
  //   path: "/signUp",
  //   component: <Signup />,
  //   navItem: "Registration",
  // },
  // {
  //   id: 3,
  //   path: "/player",
  //   component: <Player />,
  //   navItem: "Player",
  // },

  // {
  //   id: 5,
  //   path: "/game-withdrawl-request",
  //   component: <GameWithdrawlRequest />,
  //   navItem: "Game Withdrawl Request",
  // },

  // {
  //   id: 7,
  //   path: "/genealogy/downline",
  //   component: <DownLine />,
  //   navItem: "Downline",
  // },
  // {
  //   id: 10,
  //   path: "/coupon",
  //   component: <Coupon />,
  //   navItem: "coupon",
  // },
  // {
  //   id: 11,
  //   path: "/addcoupon",
  //   component: <AddCoupon/>,
  //   navItem: "coupon",
  // },
  // {
  //   id: 6,
  //   path: "/addcouponuser",
  //   component: <DirectCoupon />,
  //   navItem: "CouponToUser",
  // },
  // {
  //   id: 66,
  //   path: "/company_promoter",
  //   component: <AddCompany />,
  //   navItem: "Company Promoter",
  // },
  // {
  //   id: 9,
  //   path: "/fund",
  //   component: <Fund/>,
  //   navItem: "Credit Fund",
  // },
  {
    id: 9,
    path: "/support-list",
    component: <P2pHistory />,
    navItem: "Support History",
  },
  // {
  //   id: 11,
  //   path: "/change-password",
  //   component: <Changepassword/>,
  //   navItem: "Change Password",
  // },
  // {
  //   id: 12,
  //   path: "/game-withdrawl-request/approved-request",
  //   component: <ApprovedRequest/>,
  //   navItem: "Approved Request",
  // },
  // {
  //   id: 13,
  //   path: "/game-withdrawl-request/reject-request",
  //   component: <RejectRequest/>,
  //   navItem: "Reject Request",
  // },
  // {
  //   id: 15,
  //   path: "/selfdepositBonus",
  //   component: <SelfDepositBonus/>,
  //   navItem: "First Deposit Bonus",
  // },
  // {
  //   id: 116,
  //   path: "/welcomebonus",
  //   component: <WelcomeBonus/>,
  //   navItem: "Registration Bonus",
  // },
  // {
  //   id: 1115,
  //   path: "/companypromoter",
  //   component: <CompanyPromoterBonus/>,
  //   navItem: "Company Promoter Bonus",
  // },
  // {
  //   id: 15,
  //   path: "/teamreferal",
  //   component: <TeamReferral/>,
  //   navItem: "Team Recharge Bonus",
  // },
  // {
  //   id: 16,
  //   path: "/cashbackBonus",
  //   component: <CashbackBonus/>,
  //   navItem: "CashBack Bonus",
  // },
  {
    id: 17,
    path: "/giftBonus",
    component: <DirectBonus />,
    navItem: "Direct Bonus",
  },
  {
    id: 41,
    path: "/salarybonus",
    component: <BoosterBonus />,
    navItem: "Award Reward",
  },
  {
    id: 42,
    path: "/weeklybonus",
    component: <WeeklyBonus />,
    navItem: "Weekly Recovery",
  },
  {
    id: 42,
    path: "/vipbonus",
    component: <ROIBonus />,
    navItem: "ROI Bonus",
  },
  {
    id: 19,
    path: "/levelBonus",
    component: <LevelBonus />,
    navItem: "Team Trading Bonus",
  },
  {
    id: 19,
    path: "/matching",
    component: <MatchingBonus />,
    navItem: "Award Reward",
  },
  // {
  //   id: 20,
  //   path: "/game-withdrawl-request/pending-request",
  //   component: <PendingRequest/>,
  //   navItem: "Gateway Pending Request",
  // },
  // {
  //   id: 23,
  //   path: "/color-prediction-1-min",
  //   component: <ColorPrediction1Min/>,
  //   navItem: "Color Prediction 1 Min",
  // },
  // {
  //   id: 24,
  //   path: "/color-prediction-2-min",
  //   component: <ColorPrediction2Min/>,
  //   navItem: "Color Prediction 2 Min",
  // },
  // {
  //   id: 25,
  //   path: "/color-prediction-3-min",
  //   component: <ColorPrediction3Min/>,
  //   navItem: "Color Prediction 3 Min",
  // },
  // {
  //   id: 26,
  //   path: "/fund/transfer-fund-history",
  //   component: <FundHistory/>,
  //   navItem: "Credit Fund Transfer History",
  // },
  // {
  //   id: 27,
  //   path: "/aviator_report",
  //   component: <AviatorReport/>,
  //   navItem: "Aviator Report",
  // },
  // {
  //   id: 28,
  //   path: "/wingo_report",
  //   component: <WingoReport/>,
  //   navItem: "Wingo Report",
  // },
  // {
  //   id: 29,
  //   path: "/trx_report",
  //   component: <TrxReport/>,
  //   navItem: "Trx Report",
  // },
  {
    id: 30,
    path: "/user_permission",
    component: <UserPermission />,
    navItem: "User Permission",
  },
  // {
  //   id: 31,
  //   path: "/daybook_report",
  //   component: <DayBookReport/>,
  //   navItem: "Day Book Report",
  // },
  // {
  //   id: 32,
  //   path: "/upline_team",
  //   component: <UplineTeam/>,
  //   navItem: "UpLine Team",
  // },
  // {
  //   id: 33,
  //   path: "/down_team",
  //   component: <DownlineTeam/>,
  //   navItem: "DownLine Team",
  // },
  // {
  //   id: 34,
  //   path: "/set_bonus",
  //   component: <SetBonus/>,
  //   navItem: "Set ZP Amount ",
  // },
  // {
  //   id: 35,
  //   path: "/loginApproval",
  //   component: <LogInApproval/>,
  //   navItem: "LogIn Approval",
  // },
  // {
  //   id: 36,
  //   path: "/zp_token",
  //   component: <ZpToken/>,
  //   navItem: "Paying",
  // },
  // {
  //   id: 36,
  //   path: "/zp_token_payout",
  //   component: <ZpTokenPayout/>,
  //   navItem: "Payout",
  // },
  // {
  //   id: 37,
  //   path: "/roulette_result",
  //   component: <RouletteResult/>,
  //   navItem: "Roulette",
  // },
  // {
  //   id: 38,
  //   path: "/satta_desawar",
  //   component: <DesawarResult/>,
  //   navItem: "Desawar",
  // },
  // {
  //   id: 39,
  //   path: "/satta_gali",
  //   component: <GaliResult/>,
  //   navItem: "Gali",
  // },
  // {
  //   id: 40,
  //   path: "/satta_faridabad",
  //   component: <FaridabadResult/>,
  //   navItem: "Faridabad",
  // },
  // {
  //   id: 41,
  //   path: "/satta_ghaziyabad",
  //   component: <GhaziabadResult/>,
  //   navItem: "Ghaziabad",
  // },
  // {
  //   id: 42,
  //   path: "/inr_Paying",
  //   component: <INRPaying/>,
  //   navItem: "INR Paying",
  // },
  {
    id: 43,
    path: "/inr_Payout",
    component: <INRPayout />,
    navItem: "Payout",
  },
  {
    id: 43,
    path: "/top_up",
    component: <TopUpDetail />,
    navItem: "TopUp Detail",
  },
  {
    id: 43,
    path: "/user_detail",
    component: <UserDetail />,
    navItem: "User Detail",
  },

  {
    id: 422,
    path: "/burningevent",
    component: <BurningEvent />,
    navItem: "Burning  Event",
  },
  // {
  //   id: 422,
  //   path: "/inr_Success",
  //   component: <INRSuccess/>,
  //   navItem: "INR Success",
  // },
  // {
  //   id: 4423,
  //   path: "/bankdata",
  //   component: <BankList/>,
  //   navItem: "Bank",
  // },

  // {
  //   id: 422,
  //   path: "/inr_Approve",
  //   component: <INRApprove/>,
  //   navItem: "INR Approve",
  // },
  // {
  //   id: 424,
  //   path: "/inr_Reject",
  //   component: <INRReject/>,
  //   navItem: "INR Reject",
  // },
  {
    id: 44,
    path: "/topup",
    component: <TopUp />,
    navItem: "Top Up",
  },

  // {
  //   id: 45,
  //   path: "/fund/debited-transfer-fund-history",
  //   component: <DebitFundHistory/>,
  //   navItem: "Debit Fund Transfer History",
  // },
];

// UpdatePermissions
