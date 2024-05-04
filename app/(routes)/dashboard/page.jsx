"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import CardsInfo from "./_components/CardsInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div className=" p-8">
      <h2 className=" font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
      <p className="text-gray-500">
        Here's, what's happening with your money. Let's manage your expenses!
      </p>

      <CardsInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
        </div>

        <div className="">Other content</div>
      </div>
    </div>
  );
}

export default Dashboard;
