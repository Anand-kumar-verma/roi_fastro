// export const domain = "https://roi-backend-1.onrender.com"; // old

export const domain = "https://roi-backend-e231.onrender.com";
export const domain_market = "https://api.coingecko.com";
// export const domain = "http://192.168.1.15:9009";
export const frontend = "https://fastro.info";
export const telegram_url = "https://t.me/fastro2025_bot/fastro?";
export const contractAddress = "0x8eCB084E633FC36F16e873A13CD9ae504F6c30b0";
export const endpoint = {
  telegram_id: `${domain}/api/v2/telegram-id`,
  claim_fst: `${domain}/api/v2/fst-claim`,
  registration_api: `${domain}/api/v2/user-registration`,
  login_api: `${domain}/api/v2/user-login`,
  very_fy_OTP: `${domain}/api/v2/verify-otp`,
  wallet_api: `${domain}/api/v2/check-wallet-address-availability`,
  package_list_api: `${domain}/api/v2/get-package-details`,
  paying_dummy_api: `${domain}/api/v2/activation-dummy-request`,
  paying_api: `${domain}/api/v2/activation-request`,
  profile_api: `${domain}/api/v2/get-profile-data`,
  compounding_wallet: `${domain}/api/v2/compound-wallet`,
  compounding_wallet_history: `${domain}/api/v2/compound-wallet-history`,
  general_contact_address_api: `${domain}/api/v2/get-api-general-data`,
  roi_income_api: `${domain}/api/v2/get-roi-income-details`,
  customer_api: `${domain}/api/v2/get-user-name-by-customer-id`,
  withdrawal_api: `${domain}/api/v2/withdrawal-req`,
  withdrawal_history_api: `${domain}/api/v2/get-withdrawal-details`,
  change_password_api: `${domain}/api/v2/change-password`,
  user_dashboard_api: `${domain}/api/v2/user-dashboard-data`,
  user_buy_package_details_api: `${domain}/api/v2/get-buy-package-details`,
  get_topup_api: `${domain}/api/v2/get-topup-details`,
  topup_api: `${domain}/api/v2/admin-topup-id`,
  market_api: `${domain_market}/api/v3/simple/price`,
  team_data_api: `${domain}/api/v2/get-team-data`,
  team_data_level_api: `${domain}/api/v2/get-team-data?`,
  wallet_user_data: `${domain}/api/v2/get-wallet-data-user`,
  update_profile_data: `${domain}/api/v2/update-profile`,
  update_popup_status: `${domain}/api/v2/udpate-popup-status`,
  level_business: `${domain}/api/v2/get-business-till-level`,
};
