import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { API_BASE_URL } from "../../config/api";
import CloseIcon from "../../assets/icons/CloseIcon";
import InputField from "./components/InputField";
import ParticipantsInput from "./components/ParticipantsInput";
import CheckboxAgreement from "./components/CheckboxAgreement";
import DateTimeInput from "./components/DateTimeInput";

// Добавляем стили для input[type="datetime-local"]
const globalStyles = `
  <style>
    input[type="datetime-local"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      opacity: 0.5;
      cursor: pointer;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit {
      color: #F0F0F0;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper {
      padding: 0;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit-text {
      color: #F0F0F0;
      padding: 0 0.2em;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit-month-field,
    input[type="datetime-local"]::-webkit-datetime-edit-day-field,
    input[type="datetime-local"]::-webkit-datetime-edit-year-field,
    input[type="datetime-local"]::-webkit-datetime-edit-hour-field,
    input[type="datetime-local"]::-webkit-datetime-edit-minute-field {
      color: #F0F0F0;
    }
    
    input[type="datetime-local"]:focus {
      outline: none;
      border-color: #F2890F;
    }
  </style>
`;

const bookingSchema = z.object({
  phone: z.string().regex(/\+?\d{10,15}/, "Введите корректный номер телефона"),
  participants: z.number().min(1, "Минимум 1 участник").max(10, "Максимум 10 участников"),
  dateTime: z.string().refine((val) => {
    const date = new Date(val);
    const now = new Date();
    return date > now;
  }, "Дата и время должны быть в будущем"),
  agreement: z.boolean().refine((val) => val, "Вы должны согласиться с условиями"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onClose: () => void;
  questId: string;
  questPrice: number;
}

const BookingForm = ({ onClose, questId, questPrice }: BookingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Необходимо авторизоваться');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          questId,
          numberOfPlayers: Number(data.participants),
          dateTime: new Date(data.dateTime).toISOString(),
          price: questPrice * Number(data.participants)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при создании заказа');
      }

      alert('Заказ успешно создан!');
      onClose();
    } catch (error) {
      alert('Произошла ошибка: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  useEffect(() => {
    // Добавляем стили в head при монтировании компонента
    const styleElement = document.createElement('div');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Удаляем стили при размонтировании
      document.head.removeChild(styleElement);
    };
  }, [onClose]);

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-[#3D3333]/[0.96] flex items-center justify-center z-50">
      <div className="bg-gradient-to-t from-[#141414] to-[#1F1D1D] rounded-[3px] shadow-lg w-[480px] relative text-white">
        <button
          onClick={onClose}
          className="absolute top-10 right-[33px] cursor-pointer"
        >
          <CloseIcon />
        </button>
        <h2 className="text-[32px] font-extrabold mb-8 leading-[120%] mt-8 ml-8">
          Оставить заявку
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputField
            label="Контактный телефон"
            name="phone"
            register={register}
            error={errors.phone?.message}
          />
          <ParticipantsInput
            register={register("participants", { valueAsNumber: true })}
            error={errors.participants?.message}
          />
          
          <DateTimeInput
            label="Дата и время"
            register={register("dateTime")}
            error={errors.dateTime?.message}
            min={minDate}
            max={maxDate}
          />

          <button
            type="submit"
            className={`py-[15px] rounded-[47.32px] w-[45.6%] mx-auto font-extrabold uppercase ${
              isValid ? "bg-[#F2890F] text-white cursor-pointer hover:bg-[#d9780c] transition-colors" 
                     : "bg-[#B8B8B8] cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Отправить заявку
          </button>

          <CheckboxAgreement
            register={register}
            setValue={setValue}
            trigger={trigger}
            error={errors.agreement?.message}
          />
        </form>
      </div>
    </div>
  );
};

export default BookingForm;