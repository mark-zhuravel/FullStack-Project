import { useEffect } from 'react';

interface DateTimeInputProps {
  label: string;
  error?: string;
  register: any;
  min: string;
  max: string;
}

const globalStyles = `
  <style>
    input[type="datetime-local"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      opacity: 0.5;
      cursor: pointer;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit {
      color: #E6E6E6;
      opacity: 0.64;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper {
      padding: 0;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit-text {
      color: #E6E6E6;
      opacity: 0.64;
      padding: 0 0.2em;
    }
    
    input[type="datetime-local"]::-webkit-datetime-edit-month-field,
    input[type="datetime-local"]::-webkit-datetime-edit-day-field,
    input[type="datetime-local"]::-webkit-datetime-edit-year-field,
    input[type="datetime-local"]::-webkit-datetime-edit-hour-field,
    input[type="datetime-local"]::-webkit-datetime-edit-minute-field {
      color: #E6E6E6;
      opacity: 0.64;
      font-variant-numeric: lining-nums proportional-nums;
    }
  </style>
`;

const DateTimeInput = ({ label, error, register, min, max }: DateTimeInputProps) => {
  useEffect(() => {
    const styleElement = document.createElement('div');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="ml-8 mr-12 mb-2">
      <label className="block mb-3 text-[15px] text-[#E6E6E6] font-medium leading-[150%]">
        {label}
      </label>
      <div className="relative">
        <input
          type="datetime-local"
          min={min}
          max={max}
          {...register}
          className="w-full h-[53px] border px-6 py-4 opacity-[0.64] text-[#E6E6E6] rounded-[3px] font-medium bg-transparent border-white/40"
          style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateTimeInput; 