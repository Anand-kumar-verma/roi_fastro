import FstList from "../Adminpages/Pages/INRPayment/FstList";
import AwardReward from "../Income/AwardReward";
import BoosterIncome from "../Income/Booster";
import CompoundHistory from "../Income/CompoundHistory";
import DirectIncome from "../Income/DirectIncome";
import Jackpot from "../Income/Jackpot";
import LevelIncome from "../Income/LevelIncome";
import MatchingIncome from "../Income/MatchingIncome";
import RoiIncome from "../Income/RoiIncome";
import WeeklyIncome from "../Income/Weekly";
import About from "../component/About";
import Contact from "../component/Contact";
import Market from "../component/Market";
import Network from "../component/Network";
import Referral from "../component/Referral";
import Dashbaord from "../dashboard/Dashboard";
import GameProject from "../dashboard/GameProject";
import PriceStatics from "../dashboard/PriceStatics";
import EditPassword from "../main/EditPassword";
import ActivatoinLink from "../main/Payment/ActivatoinLink";
import Withdrawal from "../main/Payment/Withdrawal";
import WithdrawalLink from "../main/Payment/WithdrawalLink";
import WithdrawalHistory from "../main/Payment/Withdrawalhistory";
import AssociateSignUp from "../main/Signup";
import Teamdata from "../main/Teamdata";
import TopUP from "../main/TopupDetails";
import ViewProfile from "../main/ViewProfile";
export const routes = [
  {
    path: "/dashboard",
    component: <Dashbaord />,
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
    path: "/matching_income",
    component: <MatchingIncome />,
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
];
