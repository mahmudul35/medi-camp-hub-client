import { AnimatePresence, motion } from "framer-motion";
import {
  DollarSign,
  LayoutDashboard,
  Menu,
  NotebookPen,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../../assets/headerImg.png";

const SIDE_BAR = [
  {
    name: "Add A Camp",
    icon: NotebookPen,
    color: "#6366f1",
    href: "addCamp",
  },
  {
    name: "Organizer Profile.",
    icon: LayoutDashboard,
    color: "#8B5CF6",
    href: "/dashboard",
  },
  { name: "Manage Camps", icon: Users, color: "#EC4899", href: "/manageCamp" },
  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      {/* bg-gray-800 */}
      <div className="h-full    p-4 flex flex-col border-r ">
        <div className={`flex justify-between items-center mr-5 `}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTop={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-full hover:bg-zinc-300 max-w-fit p-2"
          >
            <Menu size={24} style={{ color: "black" }} />
          </motion.button>
          <img
            src={""}
            className={`${
              isSidebarOpen
                ? ""
                : "transition-all duration-300 ease-in-out hidden"
            } w-32`}
          />
        </div>
        <nav className="mt-8 flex-grow">
          {SIDE_BAR.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-zinc-300">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      <h1 className="text-black"> {item.name}</h1>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
