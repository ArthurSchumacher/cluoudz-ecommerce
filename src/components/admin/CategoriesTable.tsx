"use client";
import { Category } from "@/types/category";
import React from "react";

interface CategoriesTableProps {
  categories: Category[];
}

function CategoriesTable({ categories }: CategoriesTableProps) {
  return <div>CategoriesTable</div>;
}

export default CategoriesTable;
