import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// Util untuk menghindari karakter khusus dalam lirik
function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

app.get("/lyrics", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query required' });
  }

  try {
    // 1) Search di Genius
    const searchUrl = `https://genius.com/api/search/multi?per_page=1&q=${encodeURIComponent(query)}`;
    const searchRes = await fetch(searchUrl);
    const searchJson = await searchRes.json();

    const songHit =
      searchJson?.response?.sections
        ?.flatMap(s => s.hits || [])
        ?.find(hit => hit.type === "song");

    if (!songHit) {
      return res.json({ error: 'Song not found' });
    }

    const songUrl = songHit.result.url;

    // 2) Ambil halaman lirik & scrape
    const page = await fetch(songUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8"
      }
    });
    const html = await page.text();
    const $ = cheerio.load(html);

    // Ambil lirik dan format dengan benar
    let lyrics = $("[data-lyrics-container='true']")
      .map((_, el) => {
        return $(el).find('br').replaceWith('\n').end().text();
      })
      .get()
      .join('\n\n')
      .trim();

    lyrics = lyrics
      .replace(/^.*?(?=\[Verse|\[Chorus|\[Bridge)/s, '')
      .replace(/(\[[^\]]+\])/g, '\n$1\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Jika tidak ada lirik, gunakan fallback
    if (!lyrics) {
      lyrics = $(".lyrics").text().trim();
    }

    let safeLyrics = escapeHtml(lyrics || "Lirik tidak ditemukan.");
    safeLyrics = safeLyrics.replace(/(\[([^\]]+)\])/g, '<span class="tag">[$2]</span>');

    res.json({
      title: songHit.result.full_title,
      artist: songHit.result.primary_artist.name,
      lyrics: safeLyrics,
      source_url: songUrl
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});