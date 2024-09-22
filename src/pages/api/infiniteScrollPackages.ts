import databaseMain from "../../../database/main.json";

export async function GET({ params }: { params: { pageNumber: string } }) {
  // Extract and parse the page number from the query parameters.
  if (!params.pageNumber) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
  const pageNumber = parseInt(params.pageNumber, 10);

  // Check if pageNumber is a valid number.
  if (!isNaN(pageNumber) && pageNumber >= 0) {
    // Calculate the slice indices.
    const lowerLimit = pageNumber * 10;

    // Slice the array to get the results.
    const scrollResults = databaseMain.slice(lowerLimit, lowerLimit + 10);

    return new Response(JSON.stringify(scrollResults), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
  return new Response(JSON.stringify([]), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    }
  });
}
