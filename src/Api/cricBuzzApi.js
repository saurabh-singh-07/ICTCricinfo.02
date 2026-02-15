
import axios from "axios";


const api = axios.create({
  baseURL: "https://cricbuzz-cricket.p.rapidapi.com",
  timeout: 15000,
});

async function safeGet(endpoint) {
  try {
    const response = await api.get(endpoint, {
      headers: {
        "x-rapidapi-key": VITE_RAPIDAPI_KEY,
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
      },
    });

    if (!response.data) {
      throw new Error("Empty response from Cricbuzz");
    }

    return response.data;
  } catch (error) {
    console.error("[CRICBUZZ ERROR]", endpoint, error);

    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch Cricbuzz data"
    );
  }
}


export function getTrendingPlayers() {
  return safeGet("/stats/v1/player/trending");
}
export function getLiveMatches() {
  return safeGet("/matches/v1/live");
}

export function getUpcomingMatches() {
  return safeGet("/matches/v1/upcoming");
}

export function getRecentMatches() {
    return safeGet("/matches/v1/recent");
}
export function getScoreCard(matchId){
  return safeGet(`/mcenter/v1/${matchId}/scard`)
}

export function getMatchInfo(matchId){
  return safeGet(`/mcenter/v1/${matchId}`);
}

export function getTeamInfo(matchId){
  return safeGet(`/mcenter/v1/${matchId}/team/9`)
}