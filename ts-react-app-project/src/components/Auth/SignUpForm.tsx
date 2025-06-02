import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../form/components/InputField";

const signUpSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 буквы"),
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  onLoginClick: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onLoginClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmitForm = (data: SignUpFormValues) => {
    onSubmit(data.name, data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
      <InputField
        label="Ваше Имя"
        register={register("name")}
        error={errors.name?.message}
      />
      <InputField
        label="Email"
        register={register("email")}
        error={errors.email?.message}
      />
      <InputField
        label="Пароль"
        type="password"
        register={register("password")}
        error={errors.password?.message}
      />

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className={`py-[15px] rounded-[47.32px] w-[45.6%] mx-auto font-extrabold uppercase ${
            isValid 
              ? "bg-[#F2890F] text-white cursor-pointer hover:bg-[#d67a0d] transition-colors" 
              : "bg-[#B8B8B8] cursor-not-allowed"
          }`}
          disabled={!isValid}
        >
          Регистрация
        </button>

        <button
          type="button"
          onClick={onLoginClick}
          className="text-[#F2890F] text-sm hover:text-[#d67a0d] transition-colors text-center cursor-pointer"
        >
          Уже есть аккаунт? Войти
        </button>
      </div>
    </form>
  );
}; 