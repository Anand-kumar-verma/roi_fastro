import React from 'react';
import { useQuery } from 'react-query';
import { History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiConnectorGet } from '../../utils/APIConnector';
import { endpoint } from '../../utils/APIRoutes';
import { rupees } from '../../wingo/services/urls';

function Header() {

  const navigate = useNavigate()
   const { data: wallet_amount } = useQuery(
      ['wallet_amount_amount'],
      () => apiConnectorGet(endpoint.get_balance),
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        retryOnMount: false,
        refetchOnWindowFocus: false,
      }
    );
    const wallet_amount_data = wallet_amount?.data?.data || 0;
  return (
    <header className="bg-blue-900 p-4 flex justify-between items-center text-white shadow-md">
      <div className="flex items-center space-x-4">
        <button className="px-3 py-1 rounded-full bg-blue-700 hover:bg-blue-600 text-sm">MINES</button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold"> {rupees}
                      {(
                        Number(
                          Number(wallet_amount_data?.winning || 0) +
                          Number(wallet_amount_data?.wallet || 0)
                        ) || 0
                      )?.toFixed(2)}{' '}</span>
         <button className="p-1 rounded-full hover:bg-blue-700"
         onClick={()=>navigate('/mines_history')}>
          <History/>
        </button> 
      </div>
    </header>
  );
}

export default Header;