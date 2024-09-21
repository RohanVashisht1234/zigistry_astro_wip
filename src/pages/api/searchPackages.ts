//!===============================================================
//!         Search Engine Algorithm API "/api/searchPackages"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This api implements algorithm for search.
//! The search query is expected to be received like this:
//! /api/searchPackages?q=Search%20Query
//!===============================================================

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo from "@/types/customTypes";
import type { NextApiRequest, NextApiResponse } from "next";

// --------- Database -----------
import mainDatabase from "@/database/main.json";

// =========================================
//       Exports "/api/searchPackages"
// =========================================
export default async function search(
  req: NextApiRequest,
  res: NextApiResponse<Repo[]>,
) {
  const { q, filter } = req.query;

  // Check if the query parameter `q` exists and is a string
  if (!q || typeof q !== "string") {
    const searchResults = mainDatabase.filter((item) => {
      if (typeof filter === "string") {
        return item.topics?.includes(filter.toString().toLowerCase());
      }

      return true;
    });
    return res.status(200).json(searchResults);
  }

  const query = q.toLowerCase();

  // Filter the main database based on the query and optional filters
  const searchResults = mainDatabase.filter((item) => {
    const fullNameMatch = item.full_name.toLowerCase().includes(query);
    const descriptionMatch = item.description.toLowerCase().includes(query);

    if (!fullNameMatch && !descriptionMatch) {
      return false;
    }

    if (typeof filter === "string") {
      return item.topics?.includes(filter.toString().toLowerCase());
    }

    return true;
  });

  return res.status(200).json(searchResults);
}
