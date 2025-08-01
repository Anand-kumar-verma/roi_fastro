export const domain_ovi_node = "https://api.zupeeter.com";

export const rupees = "$";
export const zubgback = "#F48901";

export const domain = "https://roi-backend-e231.onrender.com";

export const baseUrl = "https://admin.zupeeter.com/public";
export const front_end_domain = "https://zupeeter.com";
export const usdt_base_url = "https://zupeegame.info";
export const download_app_url = "https://zupeeter.com/ZUPEETER.pdf";

export const endpoint = {
  newlogin: `${baseUrl}/api/newlogin`,
  register_candidate_mobile: `${baseUrl}/api/register_candidate`,
  register_candidate_email: `${baseUrl}/api/register_candidate_new`,
  game_history: `${baseUrl}/api/color_result`,
  bet_placed: `${baseUrl}/api/betnew_color`,
  my_history: `${baseUrl}/api/one_min_myhistory`,
  get_balance: `${baseUrl}/api/get_balance`,
  total_withdrawal_bet: `${baseUrl}/api/total_withdrawal_bet`,
  my_team_level: `${baseUrl}/api/my_team`,
  my_team_level_report_indevidual: `${baseUrl}/api/member_report`,
  bank: `${baseUrl}/api/bank`,
  update_bank_details: `${baseUrl}/api/update_bank_details_new`,
  update_upi_details: `${baseUrl}/api/update_upi_details`,
  fund_transfer_history: `${baseUrl}/api/view_fund_transfer`,
  fund_recieve: `${baseUrl}/api/view_fund_receive`,
  get_user_intro_name: `${baseUrl}/api/get_intro_name`,
  insert_fund_transfer: `${baseUrl}/api/insert_fund_transfer`,
  view_salary_income: `${baseUrl}/api/view_salary_income`,
  get_token_price: `${baseUrl}/api/token_price`,
  get_token_price_in_dooler: `${baseUrl}/api/get_price_ico`,
  update_password: `${baseUrl}/api/update_password`,
  pin_password: `${baseUrl}/api/update_pin_password`,
  view_ico_purchaseing: `${baseUrl}/api/view_ico_purchaseing`,
  insert_ico_purchase: `${baseUrl}/api/insert_ico_purchase`,
  view_withdrwal_new_inr: `${baseUrl}/api/view_withdrwal_new_inr`,
  win_list_top: `${baseUrl}/api/win_list_top`,
  wallet_deposit_history: `${baseUrl}/api/wallet_deposit`,
  wallet_deposit: `${baseUrl}/api/wallet_deposit_insert`,
  wallet_withdrawl: `${baseUrl}/api/insert_withdrawal_request_inr_new`,
  withdrawl_status: `${baseUrl}/api/status`,
  // payment
  payin_response: `${baseUrl}/api/payin_response`,
  payin_response_akash: `${baseUrl}/api/payin_response_new`,
  payin_response_ico_token_akash: `${baseUrl}/api/payin_response_upi_token`,

  indian_insert_deposite: `${baseUrl}/api/indian_insert_deposite`,
  // trx apis

  // trx_bet_placed: `${baseUrl}/api/Trx_bet`, //////////// done in node js
  trx_my_history: `${baseUrl}/api/trx_one_min_myhistory`, /// done  in node js
  // trx_my_history_new: `${baseUrl}/api/trx_one_min_myhistory_new`, /// done  in node js

  registration_bonus: `${baseUrl}/api/view_direct_referral_income`,
  view_bank_details: `${baseUrl}/api/view_bank_details_new`,
  view_upi_details: `${baseUrl}/api/view_upi_details`,
  token_launch: `${baseUrl}/api/token_launch`,
  info_promotion: `${baseUrl}/api/get_info`,
  team_info: `${baseUrl}/api/team_count`,
  team_report: `${baseUrl}/api/TeamReport`,
  profile_function: `${baseUrl}/api/profile`,
  team_data: `${baseUrl}/api/get_all`,
  view_paying_api: `${baseUrl}/api/view_paying_api`,
  update_profile_pic: `${baseUrl}/api/update_profile_pic`,
  win_list_last: `${baseUrl}/api/win_list_last`,

  payin_status: `${baseUrl}/api/payin_api`,
  swnl_pay_in_api: `${baseUrl}/api/insert_fund_request_vapayout`,

//k3api
   k3_bet_placed_node:`${domain}/api/v1/bid-placed-node`,
   k3_my_history: `${domain}/api/v1/k3-my-history`,
   k3_game_history: `${domain}/api/v1/trx_result-node`,
   k3_top_one: `${domain}/api/v1//trx_result-node-top-one`,
  
   /////////////// laravel

  // trx_bet_placed_node: `${baseUrl}/api/Trx_bet`,
  // trx_game_history: `${baseUrl}/api/trx_result`, //////// done in node js
  // trx_my_history_new: `${baseUrl}/api/trx_one_min_myhistory_new`, /// done  in node js

  // ovi panel api's
  trx_bet_placed_node:`${domain_ovi_node}/bid-placed-node`,
  trx_game_history: `${domain_ovi_node}/trx_result-node`, //////// done in node js
  trx_my_history_new: `${domain_ovi_node}/trx-my-history-node`, /// done  in node js



  //////// testing only
  // trx_testing: `${domain_ovi_node}/trx_result-node-test`,
};
