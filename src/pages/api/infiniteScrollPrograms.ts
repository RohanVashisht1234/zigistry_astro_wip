// netlify/functions/infiniteScrollProjects.js
import databaseMain from '../../../database/main.json';

exports.handler = async function (event: { queryStringParameters: { pageNumber: string; }; }) {
  // Extract and parse the page number from the query parameters.
  const pageNumber = parseInt(event.queryStringParameters.pageNumber, 10);

  // Check if pageNumber is a valid number.
  if (!isNaN(pageNumber) && pageNumber >= 0) {
    {
      // Calculate the slice indices.
      const lowerLimit = pageNumber * 10;

      // Slice the array to get the results.
      const scrollResults = databaseMain.slice(lowerLimit, lowerLimit + 10);

      return {
        statusCode: 200,
        body: JSON.stringify(scrollResults)
      }
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify([])
  }
}