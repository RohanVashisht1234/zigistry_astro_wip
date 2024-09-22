// netlify/functions/searchPrograms.js
import db from '../../../database/main.json';
import berg from '../../../database/codebergPrograms.json';

// --------- Constants -----------
const mainDatabase = [...db, ...berg];

exports.handler = async function(event: { queryStringParameters: { q: string; filter: string; }}) {
  const { q, filter } = event.queryStringParameters;

  // Check if the query parameter `q` exists and is a string
  if (!q || typeof q !== "string") {
    const searchResults = mainDatabase.filter((item) => {
      if (typeof filter === "string") {
        return item.topics?.includes(filter.toString().toLowerCase());
      }

      return true;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(searchResults)
    };
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

  return {
    statusCode: 200,
    body: JSON.stringify(searchResults)
  };
}