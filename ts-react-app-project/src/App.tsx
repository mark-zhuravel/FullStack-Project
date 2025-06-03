import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import QuestDetails from "./pages/QuestDetails";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import OrdersPage from "./pages/OrdersPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { questService } from "./services/questService";
import { Quest } from "./types/quest.types";

function App() {
  const location = useLocation();
  const [questsData, setQuestsData] = useState<Quest[]>([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await questService.getAllQuests();
        setQuestsData(data);
      } catch (err) {
        console.error("Error fetching quests:", err);
      }
    };
    fetchQuests();
  }, []);

  const getQuestBackground = () => {
    const id = location.pathname.split("/")[2];
    const quest = questsData.find((q) => q.id === id);
    return quest ? quest.imageUrl : null;
  };

  const getContactsBackground = () => {
    return localStorage.getItem("lastQuestImage");
  };

  const getBackgroundStyle = () => {
    if (location.pathname === "/") return {};

    if (location.pathname.startsWith("/quests/")) {
      const backgroundImage = getQuestBackground();
      if (backgroundImage) {
        return {
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      }
    }

    if (location.pathname === "/contacts") {
      const backgroundImage = getContactsBackground();
      if (backgroundImage) {
        return {
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      }
    }

    return {};
  };

  const isQuestPage = location.pathname.startsWith("/quests/");
  const isContactsPage = location.pathname === "/contacts";

  return (
    <div className="relative min-h-screen" style={getBackgroundStyle()}>
      {isQuestPage && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at top left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
          }}
        ></div>
      )}

      {isContactsPage && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at top left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
            backdropFilter: "blur(45px)",
          }}
        ></div>
      )}

      <div className="relative z-10">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quests/:id" element={<QuestDetails />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;