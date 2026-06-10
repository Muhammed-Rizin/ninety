export interface MatchEvent {
  time: number;
  teamId: number;
  player: string;
  type: "Goal" | "Card";
  detail: string;
}

export interface WidgetMatch {
  fixtureId: number;
  status: string;
  minute: number;
  competition: string;
  stage: string;
  stadium: string;
  homeTeam: {
    id: number;
    name: string;
    logo: string;
    score: number;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
    score: number;
  };
  events: MatchEvent[];
}

export async function getLiveFixtures(): Promise<WidgetMatch[]> {
  const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;
  if (!apiKey || apiKey === "your_api_football_key_here") {
    console.warn("API-Football Key missing. Returning mock data.");
    return getMockFixtures();
  }

  try {
    const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    if (!res.ok) throw new Error("API-Football request failed");
    const data = await res.json();

    // Filter strictly for World Cup and Friendlies
    const filteredMatches = data.response.filter((f: any) => {
      const leagueId = f.league.id;
      const leagueName = f.league.name.toLowerCase();
      
      const isWorldCup = leagueId === 1 || leagueName.includes('world cup');
      const isFriendly = leagueId === 10 || leagueName.includes('friendlies') || leagueName.includes('friendly');
      
      return isWorldCup || isFriendly;
    });

    // Map API-Football raw response to WidgetMatch interface
    return filteredMatches.map((f: any) => ({
      fixtureId: f.fixture.id,
      status: f.fixture.status.short,
      minute: f.fixture.status.elapsed || 0,
      competition: f.league.name,
      stage: f.league.round,
      stadium: f.fixture.venue.name || "Unknown",
      homeTeam: {
        id: f.teams.home.id,
        name: f.teams.home.name,
        logo: f.teams.home.logo,
        score: f.goals.home ?? 0,
      },
      awayTeam: {
        id: f.teams.away.id,
        name: f.teams.away.name,
        logo: f.teams.away.logo,
        score: f.goals.away ?? 0,
      },
      // API-Football live endpoint doesn't always return events inline unless requested or included in certain plans
      // For free tier, we map what we have, or fetch events explicitly if needed.
      events: f.events
        ? f.events.map((e: any) => ({
            time: e.time.elapsed,
            teamId: e.team.id,
            player: e.player.name,
            type: e.type,
            detail: e.detail,
          }))
        : [],
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Fallback Mock Data for Development
function getMockFixtures(): WidgetMatch[] {
  return [
    {
      fixtureId: 101,
      status: "2H",
      minute: 74,
      competition: "UEFA Champions League",
      stage: "Semi-Final",
      stadium: "Santiago Bernabéu",
      homeTeam: {
        id: 541,
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png",
        score: 2,
      },
      awayTeam: {
        id: 50,
        name: "Manchester City",
        logo: "https://media.api-sports.io/football/teams/50.png",
        score: 1,
      },
      events: [
        { time: 14, teamId: 541, player: "Vinícius Jr.", type: "Goal", detail: "Normal Goal" },
        { time: 45, teamId: 50, player: "K. De Bruyne", type: "Goal", detail: "Normal Goal" },
        { time: 68, teamId: 541, player: "J. Bellingham", type: "Goal", detail: "Normal Goal" },
        { time: 72, teamId: 50, player: "Rodri", type: "Card", detail: "Yellow Card" },
      ],
    },
    {
      fixtureId: 102,
      status: "1H",
      minute: 22,
      competition: "Premier League",
      stage: "Regular Season",
      stadium: "Anfield",
      homeTeam: {
        id: 40,
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png",
        score: 0,
      },
      awayTeam: {
        id: 42,
        name: "Arsenal",
        logo: "https://media.api-sports.io/football/teams/42.png",
        score: 0,
      },
      events: [],
    },
  ];
}
