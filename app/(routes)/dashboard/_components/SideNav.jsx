import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="h-screen p-5">
      <Image src={"./logo.svg"} alt="logo" width={160} height={100} />
      <div>
        {menuList.map((menu, index) => {
          <h2>{menu.name}</h2>;
        })}
      </div>
    </div>
  );
}

export default SideNav;
