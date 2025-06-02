interface CheckboxAgreementProps {
  register: any;
  setValue: any;
  trigger: any;
  error?: string;
}

const CheckboxAgreement = ({ register, setValue, trigger, error }: CheckboxAgreementProps) => (
  <div className="mb-[50px]">
    <div className="flex items-start gap-2 ml-[34px] mr-[34px]">
      <input
        type="checkbox"
        {...register("agreement")}
        onChange={(e) => {
          setValue("agreement", e.target.checked);
          trigger("agreement");
        }}
        className="min-w-[18px] h-[18px] cursor-pointer mt-[1px] appearance-none rounded-[3px] bg-[#F2890F] opacity-[0.4] checked:opacity-[1] focus:outline-none"
      />
      <span className="text-sm text-[#E6E6E6] font-medium leading-[144%]">
        Я согласен с {" "}
        <a href="#" className="border-b">правилами обработки персональных данных</a>&nbsp;
        и пользовательским соглашением
      </span>
    </div>
    {error && <p className="text-red-400 text-sm ml-[58px] mt-1">{error}</p>}
  </div>
);

export default CheckboxAgreement;