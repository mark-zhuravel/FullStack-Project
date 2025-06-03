import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Импортируем типы из бэкенда (нужно будет настроить path aliases)
type OrderStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: number;
  price: number;
  maxPlayers: number;
  minPlayers: number;
  category: string;
  isActive: boolean;
}

interface Order {
  id: number;
  userId: string;
  questId: string;
  numberOfPlayers: number;
  dateTime: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  quest: Quest;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Не авторизован. Пожалуйста, войдите в систему.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Ошибка при получении заказов: ${response.status} ${response.statusText}. ${errorData}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err instanceof Error ? err.message : 'Не удалось загрузить заказы');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'pending':
        return 'text-[#F2890F]';
      case 'confirmed':
        return 'text-[#F2890F]';
      case 'cancelled':
        return 'text-red-400';
      case 'completed':
        return 'text-[#F2890F]';
      default:
        return '';
    }
  };

  const getStatusText = (status: OrderStatus): string => {
    switch (status) {
      case 'pending':
        return 'Ожидает подтверждения';
      case 'confirmed':
        return 'Подтвержден';
      case 'cancelled':
        return 'Отменен';
      case 'completed':
        return 'Завершен';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
    <div className="text-center py-20">
      <div className="text-[#F0F0F0] text-xl">Загрузка заказов...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-20">
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  );
  
  if (orders.length === 0) return (
    <div className="text-center py-20">
      <div className="text-[#F0F0F0] text-xl">У вас пока нет заказов</div>
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-[#F2890F] text-[#F0F0F0] py-[22px] px-10 rounded-[65px] font-extrabold uppercase tracking-wide transition hover:bg-[#d9780c] cursor-pointer"
      >
        Забронировать квест
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {orders.map((order) => (
        <div 
          key={order.id} 
          className="bg-[#1F1D1D] rounded-2xl p-6 flex flex-col gap-4 border border-[#2A2A2A] transition-all hover:border-[#F2890F] cursor-pointer"
        >
          <div>
            <h3 className="text-[#F0F0F0] text-2xl font-bold">{order.quest.title}</h3>
            <p className="text-[#9CA3AF] mt-2 line-clamp-2">{order.quest.description}</p>
          </div>
          
          <div className="space-y-3 text-[#F0F0F0]">
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Дата</span>
              <span className="font-medium" style={{ fontVariantNumeric: "lining-nums proportional-nums" }}>
                {formatDate(order.dateTime)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Игроков</span>
              <span className="font-medium" style={{ fontVariantNumeric: "lining-nums proportional-nums" }}>
                {order.numberOfPlayers}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Стоимость</span>
              <span className="font-medium" style={{ fontVariantNumeric: "lining-nums proportional-nums" }}>
                {order.quest.price} ₴
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Статус</span>
              <span className={`font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
          
          {order.status === 'pending' && (
            <button
              className="mt-4 w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 px-4 rounded-xl font-semibold transition-colors cursor-pointer"
              onClick={() => {/* TODO: Implement cancel logic */}}
            >
              Отменить заказ
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersList; 