// netlify/functions/programs.js
import mainDatabase from '../../../../../database/programs.json';

exports.handler = async function (event: { queryStringParameters: { user_name: string; repo: string; }; }) {
    const { user_name, repo } = event.queryStringParameters;

    if (!user_name || typeof user_name !== "string" || !repo || typeof repo !== "string") {
        return {
            statusCode: 200,
            body: JSON.stringify(null)
        };
    }

    const full_name = user_name.toLowerCase() + "/" + repo.toLowerCase();

    const searchResults = mainDatabase.filter((item) => {
        return item.full_name.toLowerCase() == full_name;
    });

    return {
        statusCode: 200,
        body: JSON.stringify(searchResults[0])
    };
}