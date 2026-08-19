# The invented channel catalogue behind the app screenshots

The app screenshots in `src/assets/app/` are real captures from the app running
on an iPhone simulator. What the app was *showing* when they were taken is this
directory: eighteen channels that do not exist, with logos drawn by
`make-catalog.py` from flat geometric shapes and a system typeface.

That is the whole point. Brand rule 2 in `CLAUDE.md` — no channel names, no
network logos, no league or broadcaster branding in screenshots — is very easy
to break by accident, because the obvious way to get a demo playlist is to
point the app at a public one, and public playlists are full of real
broadcasters. Screenshots taken that way put someone else's trademarks on our
marketing pages. Keeping the fixture in the repo means the next person to
re-capture a screen does not have to invent one, and does not reach for a real
playlist because it was the quickest thing to hand.

Nothing here is shipped, imported, or wired into an npm script. It is a fixture
for a manual capture session, and `make-catalog.py` is the one-off that drew it
(Python, unlike the rest of `tool/`, because it needs an image library).

## Re-capturing a screenshot

```bash
python3 -m http.server 8787 --bind 127.0.0.1   # from THIS directory
```

Then build the app against it — the seed only applies to an install with no
playlist yet, so uninstall first:

```bash
flutter build ios --simulator --debug \
  --dart-define-from-file=dart_define.json \
  --dart-define=DEMO_M3U=http://localhost:8787/demo.m3u
```

Capture with `xcrun simctl io <udid> screenshot shot.png` and encode to WebP at
the size the existing assets use (1206×2622, quality 82).

Two things to watch for, both learned the hard way:

- **Do not open a channel before capturing a list.** The stream URLs in
  `demo.m3u` resolve to nothing, so playback fails, and the app then marks the
  channel unavailable and draws a "recently unavailable" banner over the list.
  Capture the list first. Opening one channel *is* how you get an entry in the
  home screen's "recent live channels" row — do that after, and relaunch the
  app to leave the player.
- **A language screenshot needs a fresh install**, not a switch in Settings:
  the first-run language gate is the screen worth showing.

To change the catalogue, edit the `CHANNELS` table in `make-catalog.py` and
re-run it — it rewrites `demo.m3u` and `logos/` together, so the two cannot
drift apart. Keep every name invented. If a name sounds like it could be a real
channel somewhere, it is the wrong name.
