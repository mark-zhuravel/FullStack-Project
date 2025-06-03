import React from 'react';
import OrdersList from '../components/OrdersList/OrdersList';

const OrdersPage: React.FC = () => {
  return (
    <div className="w-[79.09%] mx-auto">
      <p className="text-[#F2890F] text-sm font-medium">Мои заказы</p>
      <h1 className="text-[64px] text-white font-extrabold leading-[110%] mt-[5px] mb-8">История бронирований</h1>
      <OrdersList />
    </div>
  );
};

export default OrdersPage; 