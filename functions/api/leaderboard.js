// GET /api/leaderboard — return { scores: [...], totalLaunches: N }
// POST /api/leaderboard — add/update a score { initials: "ABC", launches: 42 }

var HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

export async function onRequestGet(context) {
  var data = await context.env.LEADERBOARD.get('scores', 'json');
  var scores = data || [];
  var total = parseInt(await context.env.LEADERBOARD.get('totalLaunches') || '0');
  // Ensure total is never less than sum of scores
  var sum = 0;
  for (var j = 0; j < scores.length; j++) sum += scores[j].launches;
  if (total < sum) {
    total = sum;
    await context.env.LEADERBOARD.put('totalLaunches', String(total));
  }
  return new Response(JSON.stringify({ scores: scores, totalLaunches: total }), { headers: HEADERS });
}

export async function onRequestPost(context) {
  var body = await context.request.json();
  var initials = String(body.initials || '').toUpperCase().replace(/[^A-Z0-9?]/g, '').slice(0, 3);
  var launches = parseInt(body.launches) || 0;
  var addToTotal = parseInt(body.addToTotal) || 0;
  if (!initials || initials.length < 1 || launches < 1) {
    return new Response(JSON.stringify({ error: 'Invalid' }), { status: 400, headers: HEADERS });
  }

  var data = await context.env.LEADERBOARD.get('scores', 'json');
  var scores = data || [];

  // Find existing entry by initials — merge by adding together
  var found = false;
  for (var i = 0; i < scores.length; i++) {
    if (scores[i].initials === initials) {
      // Add the new launches on top of existing
      if (addToTotal > 0) {
        scores[i].launches += addToTotal;
      } else if (launches > scores[i].launches) {
        scores[i].launches = launches;
      }
      found = true;
      break;
    }
  }
  if (!found) {
    scores.push({ initials: initials, launches: launches, date: new Date().toISOString().split('T')[0] });
  }

  // Sort descending, keep top 20
  scores.sort(function(a, b) { return b.launches - a.launches; });
  scores = scores.slice(0, 20);

  await context.env.LEADERBOARD.put('scores', JSON.stringify(scores));

  // Update global total
  if (addToTotal > 0) {
    var total = parseInt(await context.env.LEADERBOARD.get('totalLaunches') || '0');
    total += addToTotal;
    await context.env.LEADERBOARD.put('totalLaunches', String(total));
  }
  // Ensure global total is never less than sum of all scores
  var total = parseInt(await context.env.LEADERBOARD.get('totalLaunches') || '0');
  var sum = 0;
  for (var j = 0; j < scores.length; j++) sum += scores[j].launches;
  if (total < sum) {
    total = sum;
    await context.env.LEADERBOARD.put('totalLaunches', String(total));
  }

  return new Response(JSON.stringify({ scores: scores, totalLaunches: total }), { headers: HEADERS });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
