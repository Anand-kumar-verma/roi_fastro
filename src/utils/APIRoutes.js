export const domain = "https://roi-backend-e231.onrender.com";
export const domain_market = "https://api.coingecko.com";
// export const domain = "http://10.60.152.149:9010";
export const frontend = "https://fastro.info";
export const telegram_url = "https://t.me/fastro2025_bot/fastro?";
export const contractAddress = "0x8eCB084E633FC36F16e873A13CD9ae504F6c30b0";
export const endpoint = {
  get_if_hash_availbale: `${domain}/api/v2/get-if-hash-available`,
  telegram_id: `${domain}/api/v2/telegram-id`,
  ticket_raised: `${domain}/api/v2/create-tickets`,
  claim_fst: `${domain}/api/v2/fst-claim`,
  registration_api: `${domain}/api/v2/user-registration`,
  login_api: `${domain}/api/v2/user-login`,
  very_fy_OTP: `${domain}/api/v2/verify-otp`,
  very_fy_OTP_wingo: `${domain}/api/v2/verify-otp-wingo`,
  game_ledger: `${domain}/api/v2/get-game-ledger-by-admin`,

  wallet_api: `${domain}/api/v2/check-wallet-address-availability`,
  package_list_api: `${domain}/api/v2/get-package-details`,
  get_user_wallet_by_cust_id: `${domain}/api/v2/get-user-wallet-by-cu-id`,
  paying_dummy_api: `${domain}/api/v2/activation-dummy-request`,
  paying_api: `${domain}/api/v2/activation-request`,
  fst_buy_order: `${domain}/api/v2/fst-buy-order-req`,
  profile_api: `${domain}/api/v2/get-profile-data`,
  compounding_wallet: `${domain}/api/v2/compound-wallet`,
  compounding_wallet_history: `${domain}/api/v2/compound-wallet-history`,
  general_contact_address_api: `${domain}/api/v2/get-api-general-data`,
  roi_income_api: `${domain}/api/v2/get-roi-income-details`,
  my_fst_orders: `${domain}/api/v2/get-my-fst-orders`,
  support_tiket_list_user: `${domain}/api/v2/support-ticket-list-admin`,
  customer_api: `${domain}/api/v2/get-user-name-by-customer-id`,
  withdrawal_api: `${domain}/api/v2/withdrawal-req`,
  withdrawal_history_api: `${domain}/api/v2/get-withdrawal-details`,
  change_password_api: `${domain}/api/v2/change-password`,
  user_dashboard_api: `${domain}/api/v2/user-dashboard-data`,
  user_buy_package_details_api: `${domain}/api/v2/get-buy-package-details`,
  get_topup_api: `${domain}/api/v2/get-topup-details`,
  get_topup_api_wingo: `${domain}/api/v2/get-topup-details-wingo`,
  topup_api: `${domain}/api/v2/admin-topup-id`,
  topup_api_pending: `${domain}/api/v2/admin-pending-topup-id`,
  market_api: `${domain_market}/api/v3/simple/price`,
  team_data_api: `${domain}/api/v2/get-team-data`,
  team_data_level_api: `${domain}/api/v2/get-team-data?`,
  wallet_user_data: `${domain}/api/v2/get-wallet-data-user`,
  update_profile_data: `${domain}/api/v2/update-profile`,
  update_popup_status: `${domain}/api/v2/udpate-popup-status`,
  level_business: `${domain}/api/v2/get-business-till-level`,
  add_burning_count: `${domain}/api/v2/add-burning-count`,
  get_burning_count: `${domain}/api/v2/burning-event-count`,
  //wingo
  bet_placed: `${domain}/api/v2/bet`,
  game_history: `${domain}/api/v2/colour_result`,
  my_history: `${domain}/api/v2/getbet-game-results`,
  game_profile: `${domain}/api/v2/game-profile`,
  //ticket
  ticket_list: `${domain}/api/v2/jack-pot-ticket-list`,
  jackpot_result: `${domain}/api/v2/jack-pot-result`,
  top_winner: `${domain}/api/v2/get-top-winners`,
  //buy-ticket
  eligible_paying: `${domain}/api/v2/eligible-for-paying`,
  game_paying: `${domain}/api/v2/game-paying-request`,
  jackpot_paying: `${domain}/api/v2/jackpot-paying-request`,
  fst_count: `${domain}/api/v2/get-fst-count-for-jackpot-pay`,

  //mines
   mines_record: `${domain}/api/v2/mines-grid-records`,
  mines_bet: `${domain}/api/v2/mines-betting-cashsout`,
  mines_history: `${domain}/api/v2/mines-betting-history`,
};
