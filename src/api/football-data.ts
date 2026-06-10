import type { WidgetMatch } from './api-football';

export async function getFootballDataFixtures(): Promise<WidgetMatch[]> {
  const apiKey = import.meta.env.VITE_FOOTBALL_DATA_KEY;
  if (!apiKey || apiKey === 'your_football_data_key_here') {
    console.warn('football-data.org Key missing. Returning empty array.');
    return [];
  }

  try {
    // football-data.org endpoint for today's matches
    const res = await fetch('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': apiKey,
      },
    });
    
    if (!res.ok) throw new Error('football-data.org request failed');
    const data = await res.json();
    
    // Filter matches that are actually in play AND are international matches
    const liveMatches = data.matches.filter((m: any) => {
      const isLive = ['IN_PLAY', 'PAUSED'].includes(m.status);
      if (!isLive) return false;
      
      const compCode = m.competition.code || '';
      const compName = m.competition.name ? m.competition.name.toLowerCase() : '';
      
      const isWorldCup = compCode === 'WC' || compName.includes('world cup');
      const isEuro = compCode === 'EC' || compName.includes('european');
      const isFriendly = compName.includes('friendly') || compName.includes('friendlies');
      
      return isWorldCup || isEuro || isFriendly;
    });

    // Map football-data.org raw response to WidgetMatch interface
    return liveMatches.map((f: any) => ({
      fixtureId: f.id,
      status: f.status === 'PAUSED' ? 'HT' : 'LIVE',
      minute: 0, // football-data.org free tier does not provide live match minute easily
      competition: f.competition.name,
      stage: f.matchday ? `Matchday ${f.matchday}` : 'Regular',
      stadium: 'Unknown',
      homeTeam: {
        id: f.homeTeam.id,
        name: f.homeTeam.shortName || f.homeTeam.name,
        logo: f.homeTeam.crest,
        score: f.score.fullTime.home ?? 0,
      },
      awayTeam: {
        id: f.awayTeam.id,
        name: f.awayTeam.shortName || f.awayTeam.name,
        logo: f.awayTeam.crest,
        score: f.score.fullTime.away ?? 0,
      },
      events: [], // Free tier lacks detailed events timeline
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
