# BodyWise

Click a body part, learn what it does, what to eat to keep it healthy, and what happens if you don't.

## Why
Health info about organs, food, and deficiency risk exists but is scattered across dozens of articles
(Mayo Clinic, Harvard Health, NIH, WebMD). BodyWise packages it into one simple, clickable, sourced
web page — aimed at people with no medical background.

## v1 Scope
6 body parts: Heart, Liver, Brain, Kidneys, Gut, Lungs. Each with function, best foods, foods to limit,
neglect effects (short & long term), daily tips, and cited sources.

## Non-Goals
Not a diagnostic tool. Not personalized medical/nutrition advice. No tracking, no login, no ads.
Every claim is sourced (Mayo Clinic / Harvard Health / NIH / PMC / Cleveland Clinic) and framed as
"supports" — never "cures."

## Run locally
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
Then open http://localhost:5050

## Stack
- Backend: Flask (serves JSON API + static page)
- Frontend: vanilla HTML/CSS/JS, clickable SVG body diagram
- Content: `data/organs.json` — structured, sourced, easy to extend

## Disclaimer
This app is for general education only and is not medical advice. Consult a doctor for any health
concerns or symptoms.

## Roadmap
- [x] v1: 6 organs, SVG diagram, Flask app
- [ ] v2: remaining ~14 body parts
- [ ] v3: deploy + share publicly
- [ ] v4 (maybe): symptom-based search, PWA, multi-language
