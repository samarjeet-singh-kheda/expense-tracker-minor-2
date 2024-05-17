"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses as Exp } from "@/utils/schema";
import ExpenseListTable from "./_components/ExpenseListTable";

function Expenses() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Exp.amount})`.mapWith(Number),
        totalItem: sql`count(${Exp.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Exp, eq(Budgets.id, Exp.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Exp.id,
        name: Exp.name,
        amount: Exp.amount,
        createdAt: Exp.createdAt,
      })
      .from(Budgets)
      .rightJoin(Exp, eq(Budgets.id, Exp.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Exp.id));

    setExpensesList(result);
  };

  return (
    <div className=" m-12 shadow-md border rounded-lg p-4">
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getBudgetList()}
      />
    </div>
  );
}

export default Expenses;
