import { useForm } from 'react-hook-form';
import InputField from '../form/components/InputField';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onSignUpClick: () => void;
}

export default function LoginForm({ onSubmit, onSignUpClick }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmitForm = async (data: LoginFormData) => {
    await onSubmit(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
      <InputField
        label="Email"
        type="email"
        name="email"
        register={register}
        error={errors.email?.message}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        register={register}
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
} 