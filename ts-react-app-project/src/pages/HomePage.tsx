import QuestList from "../components/QuestList";

const HomePage: React.FC = () => {
  return (
    <div className="w-[79.09%] mx-auto">
      <p className="text-[#F2890F] text-sm font-medium">Квесты в Киеве</p>
      <h1 className="text-[64px] text-white font-extrabold leading-[110%] mt-[5px]">Выберите тематику</h1>
      <div className="mx-auto">
        <QuestList />
      </div>
    </div>
  );
};

export default HomePage;
