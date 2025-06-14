import FstList from "../Adminpages/Pages/INRPayment/FstList";
import AwardReward from "../Income/AwardReward";
import BoosterIncome from "../Income/Booster";
import CompoundHistory from "../Income/CompoundHistory";
import DirectIncome from "../Income/DirectIncome";
import Jackpot from "../Income/Jackpot";
import LevelIncome from "../Income/LevelIncome";
import RoiIncome from "../Income/RoiIncome";
import SupportTicketList from "../Income/SupportTicketList";
import TicketList from "../Income/TicketList";
import TicketListAdmin from "../Income/TicketListAdmin";
import WeeklyIncome from "../Income/Weekly";
import WinnerList from "../Income/WinnerList";
import About from "../component/About";
import Contact from "../component/Contact";
import Market from "../component/Market";
import Network from "../component/Network";
import Referral from "../component/Referral";
import TicketsQuery from "../component/TicketsQuery";
import Dashbaord from "../dashboard/Dashboard";
import GameProject from "../dashboard/GameProject";
import PriceStatics from "../dashboard/PriceStatics";
import Burning from "../main/Burning";
import BuyTicket from "../main/Buy/Buyticket";
import DepositFST from "../main/Buy/DepositFst";
import DepositUSDT from "../main/Buy/DepositUsdt";
import EditPassword from "../main/EditPassword";
import ActivatoinLink from "../main/Payment/ActivatoinLink";
import Withdrawal from "../main/Payment/Withdrawal";
import WithdrawalLink from "../main/Payment/WithdrawalLink";
import WithdrawalHistory from "../main/Payment/Withdrawalhistory";
import AssociateSignUp from "../main/Signup";
import Teamdata from "../main/Teamdata";
import TopUP from "../main/TopupDetails";
import ViewProfile from "../main/ViewProfile";
import Wingo from "../wingo/wingo/Wingo";
export const routes = [
  {
    path: "/dashboard",
    component: <Dashbaord />,
  },
  {
    path: "/ticket-list-admin",
    component: <TicketListAdmin />,
  },
  {
    path: "/support-list-user",
    component: <SupportTicketList />,
  },
  {
    path: "/ticket",
    component: <TicketsQuery />,
  },
  {
    path: "/game-project",
    component: <GameProject />,
  },
  {
    path: "/withdrawal-link",
    component: <Withdrawal />,
  },
  {
    path: "/markets",
    component: <Market />,
  },
  {
    path: "/about",
    component: <About />,
  },
  {
    path: "/activation",
    component: <ActivatoinLink />,
  },
  {
    path: "/buy",
    component: <BuyTicket />,
  },
  {
    path: "/award-reward",
    component: <AwardReward />,
  },
  {
    path: "/topup_detail",
    component: <TopUP />,
  },
  {
    path: "/fst_detail",
    component: <FstList />,
  },
  {
    path: "/view",
    component: <ViewProfile />,
  },
  {
    path: "/password",
    component: <EditPassword />,
  },
  {
    path: "/contact",
    component: <Contact />,
  },
  {
    path: "/sign",
    component: <AssociateSignUp />,
  },
  {
    path: "/roi_income",
    component: <RoiIncome />,
  },
  {
    path: "/price-statistics",
    component: <PriceStatics />,
  },
  {
    path: "/compound-history",
    component: <CompoundHistory />,
  },
  {
    path: "/level_income",
    component: <LevelIncome />,
  },
  {
    path: "/direct_income",
    component: <DirectIncome />,
  },
  {
    path: "/ticket-list",
    component: <TicketList />,
  },
  {
    path: "/winner-list",
    component: <WinnerList />,
  },
  {
    path: "/booster_income",
    component: <BoosterIncome />, // this is rocket income
  },
  {
    path: "/jackpot_income",
    component: <Jackpot />,
  },
  {
    path: "/weekly_income",
    component: <WeeklyIncome />,
  },
  {
    path: "/withdrawal",
    component: <WithdrawalLink />,
  },
  {
    path: "/withdrawalhistory",
    component: <WithdrawalHistory />,
  },
  {
    path: "/Teamdata",
    component: <Teamdata />,
  },
  {
    path: "/network",
    component: <Network />,
  },
  {
    path: "/referral",
    component: <Referral />,
  },
  {
    path: "/wingo",
    component: <Wingo />,
  },
  {
    path: "/burning",
    component: <Burning />,
  },
  {
    path: "/game-fst",
    component: <DepositFST />,
  },
  {
    path: "/game-usdt",
    component: <DepositUSDT />,
  },
];
