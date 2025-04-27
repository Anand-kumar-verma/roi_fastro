import Market from "../component/Market";
import Dashbaord from "../dashboard/Dashboard";
import About from "../component/About";
import Activation from "../main/Payment/Activation";
import Contact from "../component/Contact";
import AssociateSignUp from "../main/Signup";
import ViewProfile from "../main/ViewProfile";
import EditPassword from "../main/EditPassword";
import RoiIncome from "../Income/RoiIncome";
import Withdrawal from "../main/Payment/Withdrawal";
import LevelIncome from "../Income/LevelIncome";
import DirectIncome from "../Income/DirectIncome";
import MatchingIncome from "../Income/MatchingIncome";
import BoosterIncome from "../Income/Booster";
import WeeklyIncome from "../Income/Weekly";
import WithdrawalHistory from "../main/Payment/Withdrawalhistory";
import TopUP from "../main/TopupDetails";
import Teamdata from "../main/Teamdata";
import ActivatoinLink from "../main/Payment/ActivatoinLink";
import WithdrawalLink from "../main/Payment/WithdrawalLink";
import CompoundHistory from "../Income/CompoundHistory";
import Jackpot from "../Income/Jackpot";
import AwardReward from "../Income/AwardReward";
export const routes = [
  {
    path: "/dashboard",
    component: <Dashbaord />,
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
];
