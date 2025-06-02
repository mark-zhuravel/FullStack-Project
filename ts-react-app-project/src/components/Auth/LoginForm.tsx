import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../form/components/InputField";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onSignUpClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSignUpClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmitForm = (data: LoginFormValues) => {
    onSubmit(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
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
          Войти
        </button>

        <button
          type="button"
          onClick={onSignUpClick}
          className="text-[#F2890F] text-sm hover:text-[#d67a0d] transition-colors text-center cursor-pointer"
        >
          Нет аккаунта? Зарегистрироваться
        </button>
      </div>
    </form>
  );
}; 