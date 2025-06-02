import React from "react";
import { useState, JSX } from "react";
import { quests } from "../data/quests";
import QuestCard from "./QuestCard";
import AdventureIcon from "../assets/icons/AdventureIcon";
import HorrorIcon from "../assets/icons/HorrorIcon";
import MysticIcon from "../assets/icons/MysticismIcon";
import DetectiveIcon from "../assets/icons/DetectiveIcon";
import SciFiIcon from "../assets/icons/SciFiIcon";
import AllQuestsIcon from "../assets/icons/AllQuestsIcon";
import LongLine from "../assets/icons/LongLine";

const categoryIcons: Record<string, JSX.Element> = {
  "Все квесты": <AllQuestsIcon />,
  "Приключение": <AdventureIcon />,
  "Ужасы": <HorrorIcon />,
  "Мистика": <MysticIcon />,
  "Детектив": <DetectiveIcon />,
  "Sci-Fi": <SciFiIcon />,
};

const QuestList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все квесты");

  const uniqueCategories = ["Все квесты", ...new Set(quests.map((q) => q.category))];

  const filteredQuests = selectedCategory === "Все квесты"
    ? quests
    : quests.filter((q) => q.category === selectedCategory);

  return (
    <div>
      <div className="flex items-center mb-8 gap-x-10 mt-12">
        {uniqueCategories.map((category, index) => (
          <div key={category} className="flex items-center gap-x-10">
            <button
              className={`flex items-center gap-3 rounded transition text-[#E5E5E5] font-bold cursor-pointer
                ${selectedCategory === category
                  ? ""
                  : "opacity-60 hover:opacity-100"}
              `}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryIcons[category]} 
              <span className={`leading-[140%] tracking-[-0.28px] text-sm ${selectedCategory === category
                ? "border-b-2 border-[#F2890F]"
                : ""}`}>{category}</span>
            </button>

            {index < uniqueCategories.length - 1 && (
              <LongLine />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-8 pb-8">
        {filteredQuests.length > 0 ? (
          filteredQuests.map((quest) => <QuestCard key={quest.id} quest={quest} />)
        ) : (
          <p className="text-gray-500 col-span-3 text-center">Нет доступных квестов</p>
        )}
      </div>
    </div>
  );
};

export default QuestList;