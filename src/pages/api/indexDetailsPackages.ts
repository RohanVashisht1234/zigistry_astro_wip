// netlify/functions/indexDetailsPackages.js
import databaseMain from '../../../database/main.json';

exports.handler = async function (event: { queryStringParameters: { section: string; range: string; }; }) {
  const { section, range } = event.queryStringParameters;

  if (
    !section ||
    typeof section !== "string" ||
    !range ||
    typeof range !== "string"
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify([])
    };
  }

  const ranger = range.split("..");
  const lowerLimit = parseInt(ranger[0]);
  const upperLimit = parseInt(ranger[1]);

  if (section == "mostUsed") {
    return {
      statusCode: 400,
      body: JSON.stringify(databaseMain.slice(lowerLimit, upperLimit))
    };
  } else if (section == "latestRepos") {
    const sortedRepos = databaseMain
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    return {
      statusCode: 400,
      body: JSON.stringify(sortedRepos.slice(lowerLimit, upperLimit))
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify([])
  };
}