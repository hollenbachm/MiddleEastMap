import csv
import json

# === Config ===
input_file = "conflict_events.csv"
output_file = "events.json"

# Filters (edit as needed)
MIN_YEAR = 2022          # keep events from this year onward
MIN_FATALITIES = 2       # keep events with at least this many fatalities

events = []

with open(input_file, encoding="latin-1", newline="") as f:
    reader = csv.DictReader(f)

    for row in reader:
        lat_raw = (row.get("lat") or "").strip()
        lng_raw = (row.get("lng") or "").strip()

        # Skip rows without coordinates
        if not lat_raw or not lng_raw:
            continue

        # Skip header-like / malformed rows
        if lat_raw.lower() in ("lat", "latitude") or lng_raw.lower() in ("lng", "longitude"):
            continue

        # Parse and filter by date/year
        date_str = (row.get("date") or "").strip()
        year_str = date_str[:4] if len(date_str) >= 4 else ""
        if not year_str.isdigit():
            continue
        if int(year_str) < MIN_YEAR:
            continue

        # Parse and filter by fatalities
        fatalities_raw = (row.get("fatalities") or "").strip()
        try:
            fatalities = int(float(fatalities_raw)) if fatalities_raw else 0
        except ValueError:
            fatalities = 0

        if fatalities < MIN_FATALITIES:
            continue

        # Build event object
        try:
            event = {
                "lat": float(lat_raw),
                "lng": float(lng_raw),
                "actor1": (row.get("actor1") or "").strip(),
                "actor2": (row.get("actor2") or "").strip(),
                "fatalities": fatalities,
                "date": date_str,
                "country": (row.get("country") or "").strip(),
                "location": (row.get("location") or "").strip(),
                "source": (row.get("source_office") or "").strip(),
                "source_date": (row.get("source_date") or "").strip(),
                "headline": (row.get("source_headline") or "").strip(),
            }
        except ValueError:
            # Skip rows where lat/lng can't be parsed
            continue

        events.append(event)

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(events, f, indent=2, ensure_ascii=False)

print(f"{len(events)} events exported to {output_file} (MIN_YEAR={MIN_YEAR}, MIN_FATALITIES={MIN_FATALITIES})")