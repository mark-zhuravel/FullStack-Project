import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LongLine from "../assets/icons/LongLine";
import TimeIcon from "../assets/icons/TimeIcon";
import PersonIcon from "../assets/icons/PersonIcon";
import PuzzleIcon from "../assets/icons/PuzzleIcon";
import BookingForm from "../components/form/BookingForm";
import { questService } from "../services/questService";
import { QuestDisplay, convertToQuestDisplay } from "../types/quest.types";

const QuestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [quest, setQuest] = useState<QuestDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuest = async () => {
      if (!id) return;
      
      try {
        const data = await questService.getQuestById(id);
        setQuest(convertToQuestDisplay(data));
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить информацию о квесте");
        console.error("Error fetching quest:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuest();
  }, [id]);

  useEffect(() => {
    if (quest?.image) {
      localStorage.setItem("lastQuestImage", quest.image);
    }
  }, [quest]);

  if (loading) {
    return <div className="text-white text-center mt-12">Загрузка квеста...</div>;
  }

  if (error || !quest) {
    return (
      <div className="text-white text-xl font-medium text-center mt-[200px]">
        <p>Квест не найден 😔</p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-[#F2890F] text-[#F0F0F0] py-[22px] px-10 rounded-[65px] font-extrabold uppercase tracking-wide transition hover:bg-[#d9780c] cursor-pointer"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className="pl-[600px] pt-10 relative">
      <p className="text-[#F2890F] text-sm font-medium lowercase">{quest.category}</p>

      <h1 className="text-white text-[92px] font-black tracking-[-2.76px] w-[680px] leading-[95%] uppercase mt-4">
        {quest.title}
      </h1>

      <div className="mt-7">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TimeIcon className="w-6 h-6" />
            <p 
              className="text-[#E5E5E5] text-sm"
              style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
            >
              {quest.duration}
            </p>
          </div>

          <LongLine className="h-9" />

          <div className="flex items-center gap-2">
            <PersonIcon className="w-[19px] h-6" />
            <p 
              className="text-[#E5E5E5] text-sm"
              style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
            >
              {quest.players}
            </p>
          </div>

          <LongLine className="h-9" />

          <div className="flex items-center gap-2">
            <PuzzleIcon className="w-6 h-6" />
            <p className="text-[#E5E5E5] text-sm">{quest.difficulty}</p>
          </div>
        </div>

        <p className="w-[520px] text-[#E5E5E5] text-[15px] font-medium mt-5">{quest.description}</p>

        <button
          onClick={() => setBookingOpen(true)}
          className="mt-10 bg-[#F2890F] text-white px-12 py-[22px] rounded-[65px] font-extrabold cursor-pointer"
        >
          ЗАБРОНИРОВАТЬ
        </button>
      </div>

      {isBookingOpen && (
        <BookingForm 
          onClose={() => setBookingOpen(false)} 
          questId={quest.id}
          questPrice={quest.price}
        />
      )}
    </div>
  );
};

export default QuestDetails;