"use client";

import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../_components/BudgetItem";
import AddExpense from "../_components/AddExpense";

function ExpensesScreen({ params }) {
  const { user } = useUser();

  const [budgetInfo, setBudgetInfo] = useState({});

  useEffect(() => {
    console.log(params.id);
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    // console.log(result);
    setBudgetInfo(result[0]);
  };

  return (
    <div className="p-10 flex justify-center  flex-col">
      <h2 className="text-3xl font-bold ">Expenses id page placeholder</h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className=" h-[150px] w-full bg-slate-200 rounded-lg  animate-pulse"></div>
        )}

        <AddExpense
          budgetId={params.id}
          refreshData={() => getBudgetInfo()}
          user={user}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
