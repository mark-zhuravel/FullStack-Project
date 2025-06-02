import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import InputField from "./components/InputField";
import ParticipantsInput from "./components/ParticipantsInput";
import CheckboxAgreement from "./components/CheckboxAgreement";

const bookingSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 буквы"),
  phone: z.string().regex(/\+?\d{10,15}/, "Введите корректный номер телефона"),
  participants: z.number().min(1, "Минимум 1 участник").max(10, "Максимум 10 участников"),
  agreement: z.boolean().refine((val) => val, "Вы должны согласиться с условиями"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onClose: () => void;
}

const BookingForm = ({ onClose }: BookingFormProps) => {
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

  const onSubmit = (data: BookingFormValues) => {
    console.log("Форма отправлена:", data);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
            label="Ваше Имя"
            register={register("name")}
            error={errors.name?.message}
          />
          <InputField
            label="Контактный телефон"
            register={register("phone")}
            error={errors.phone?.message}
          />
          <ParticipantsInput
            register={register("participants", { valueAsNumber: true })}
            error={errors.participants?.message}
          />

          <button
            type="submit"
            className={`py-[15px] rounded-[47.32px] w-[45.6%] mx-auto font-extrabold uppercase ${isValid ? "bg-[#F2890F] text-white cursor-pointer" : "bg-[#B8B8B8] cursor-not-allowed"
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