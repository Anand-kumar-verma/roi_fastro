// export const domain = "https://roi-backend-1.onrender.com"; // old

export const domain = "https://roi-backend-e231.onrender.com";
export const domain_market = "https://api.coingecko.com";
// export const domain = "http://192.168.245.149:9009";
export const frontend = "https://dotpyworld.com";

export const endpoint = {
  telegram_id: `${domain}/api/v1/telegram-id`,
  registration_api: `${domain}/api/v1/user-registration`,
  login_api: `${domain}/api/v1/user-login`,
  wallet_api: `${domain}/api/v1/check-wallet-address-availability`,
  package_list_api: `${domain}/api/v1/get-package-details`,
  paying_dummy_api: `${domain}/api/v1/activation-dummy-request`,
  paying_api: `${domain}/api/v1/activation-request`,
  profile_api: `${domain}/api/v1/get-profile-data`,
  compounding_wallet: `${domain}/api/v1/compound-wallet`,
  compounding_wallet_history: `${domain}/api/v1/compound-wallet-history`,
  general_contact_address_api: `${domain}/api/v1/get-api-general-data`,
  roi_income_api: `${domain}/api/v1/get-roi-income-details`,
  customer_api: `${domain}/api/v1/get-user-name-by-customer-id`,
  withdrawal_api: `${domain}/api/v1/withdrawal-req`,
  withdrawal_history_api: `${domain}/api/v1/get-withdrawal-details`,
  change_password_api: `${domain}/api/v1/change-password`,
  user_dashboard_api: `${domain}/api/v1/user-dashboard-data`,
  user_buy_package_details_api: `${domain}/api/v1/get-buy-package-details`,
  get_topup_api: `${domain}/api/v1/get-topup-details`,
  topup_api: `${domain}/api/v1/admin-topup-id`,
  market_api: `${domain_market}/api/v3/simple/price`,
  team_data_api: `${domain}/api/v1/get-team-data`,
  team_data_level_api: `${domain}/api/v1/get-team-data?`,
  wallet_user_data: `${domain}/api/v1/get-wallet-data-user`,
  update_profile_data: `${domain}/api/v1/update-profile`,
};
