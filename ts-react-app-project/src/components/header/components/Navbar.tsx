import { NavLink, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: "КВЕСТЫ", path: "/" },
    { name: "НОВИЧКАМ", path: "/beginners" },
    { name: "ОТЗЫВЫ", path: "/reviews" },
    { name: "АКЦИИ", path: "/offers" },
    { name: "КОНТАКТЫ", path: "/contacts" }
  ];

  return (
    <nav>
      <ul className="flex gap-[47px] font-semibold text-sm">
        {navItems.map((item, index) => {
          const isQuestsActive = item.path === "/" && location.pathname.startsWith("/quests");
          const isActive = location.pathname === item.path || isQuestsActive;

          return (
            <li key={index}>
              <NavLink
                to={item.path}
                className={`transition-colors hover:font-bold cursor-pointer ${isActive ? "text-[#F2890F]" : "text-[#F0F0F0]"
                  }`}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;