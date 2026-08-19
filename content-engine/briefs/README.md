# Content briefs

One YAML file per topic, per `docs/content-engine/ARCHITECTURE.md` §6.0. A brief
declares the target intent, the source locale, the app angle, the product facts
the article may rely on, and the constraints. The article is drafted in
`sourceLocale` first; every other locale transcreates from it.

`status` is one of `queued` (nothing written yet), `drafted` (source-language
article exists in `src/content/blog/<sourceLocale>/`), `held` (written but not
publishable yet — see `holdReason`), or `published` (live in every locale).
A brief that went out over an open `holdReason` keeps a `publishNote` saying
what was accepted and what still wants checking.
