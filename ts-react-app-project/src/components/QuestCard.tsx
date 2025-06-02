import { FC } from "react";
import { QuestProps } from "../data/quests";
import { useNavigate } from "react-router-dom";
import PersonIcon from "../assets/icons/PersonIcon";
import PuzzleIcon from "../assets/icons/PuzzleIcon";
import ShortLine from "../assets/icons/ShortLine";

const QuestCard: FC<{ quest: QuestProps }> = ({ quest }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/quests/${quest.id}`);
  };

  return (
    <div
      className="text-white h-[232px] relative cursor-pointer"
      style={{
        backgroundImage: `url("${quest.image}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onClick={handleCardClick}
    >
      <h3 className="mt-[148px] text-2xl font-bold leading-[120%] ml-5 relative z-10">
        {quest.title}
      </h3>
      <div className="flex items-center gap-[10px] mt-4 ml-5 relative z-10">
        <div className="flex gap-2 items-center">
          <PersonIcon />
          <p className="text-[#E5E5E5] opacity-[0.8]"
             style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
          >
            {quest.players}
          </p>
        </div>
        <ShortLine />
        <div className="flex gap-2 items-center">
          <PuzzleIcon />
          <p className="text-[#E5E5E5] opacity-[0.8]">{quest.difficulty}</p>
        </div>
      </div>
      <div
        className="absolute bottom-0 w-full h-[160px] z-0"
        style={{
          background: "linear-gradient(0deg, rgba(28, 27, 27, 0.90) 5.23%, rgba(46, 46, 46, 0.00) 98.38%)",
        }}
      />
    </div>
  );
};

export default QuestCard;