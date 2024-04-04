import { useState, useEffect } from "react";
import { MenuTree } from "./components/menuTree/MenuTree";
import { loadMenuItems } from "./api";
import { MenuItem } from "./types";

export default function App() {
  const [menuData, setMenudata] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await loadMenuItems("large");
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        setMenudata(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <MenuTree items={menuData} />
    </div>
  );
}
