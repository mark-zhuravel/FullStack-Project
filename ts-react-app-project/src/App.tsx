import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestDetails from "./pages/QuestDetails";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { quests } from "./data/quests";

function App() {
  const location = useLocation();

  const getQuestBackground = () => {
    const id = location.pathname.split("/")[2];
    const quest = quests.find((q) => q.id === Number(id));
    return quest ? quest.image : null;
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;