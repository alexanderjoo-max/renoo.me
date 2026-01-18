#!/usr/bin/env python3
import json

# Read existing data
with open('data.json', 'r') as f:
    data = json.load(f)

# New cities to add with coordinates
new_cities = {
    # Top 10 US cities
    "Chicago": {"country": "USA", "region": "North America", "lat": 41.8781, "lng": -87.6298},
    "Houston": {"country": "USA", "region": "North America", "lat": 29.7604, "lng": -95.3698},
    "Phoenix": {"country": "USA", "region": "North America", "lat": 33.4484, "lng": -112.0740},
    "Philadelphia": {"country": "USA", "region": "North America", "lat": 39.9526, "lng": -75.1652},
    "San Antonio": {"country": "USA", "region": "North America", "lat": 29.4241, "lng": -98.4936},
    "San Diego": {"country": "USA", "region": "North America", "lat": 32.7157, "lng": -117.1611},
    "Dallas": {"country": "USA", "region": "North America", "lat": 32.7767, "lng": -96.7970},
    "San Jose": {"country": "USA", "region": "North America", "lat": 37.3382, "lng": -121.8863},
    "Austin": {"country": "USA", "region": "North America", "lat": 30.2672, "lng": -97.7431},
    "Jacksonville": {"country": "USA", "region": "North America", "lat": 30.3322, "lng": -81.6557},

    # Other Americas
    "Rio de Janeiro": {"country": "Brazil", "region": "South America", "lat": -22.9068, "lng": -43.1729},
    "Toronto": {"country": "Canada", "region": "North America", "lat": 43.6532, "lng": -79.3832},
    "Vancouver": {"country": "Canada", "region": "North America", "lat": 49.2827, "lng": -123.1207},
    "Buenos Aires": {"country": "Argentina", "region": "South America", "lat": -34.6037, "lng": -58.3816},

    # Australia
    "Sydney": {"country": "Australia", "region": "Oceania", "lat": -33.8688, "lng": 151.2093},
    "Melbourne": {"country": "Australia", "region": "Oceania", "lat": -37.8136, "lng": 144.9631},

    # Asia
    "Shanghai": {"country": "China", "region": "East Asia", "lat": 31.2304, "lng": 121.4737},
    "Taipei": {"country": "Taiwan", "region": "East Asia", "lat": 25.0330, "lng": 121.5654},

    # Russia & Central Asia
    "Moscow": {"country": "Russia", "region": "Eastern Europe", "lat": 55.7558, "lng": 37.6173},
    "Almaty": {"country": "Kazakhstan", "region": "Central Asia", "lat": 43.2220, "lng": 76.8512},

    # EU Countries (one city each)
    "Vienna": {"country": "Austria", "region": "Europe", "lat": 48.2082, "lng": 16.3738},
    "Brussels": {"country": "Belgium", "region": "Europe", "lat": 50.8503, "lng": 4.3517},
    "Sofia": {"country": "Bulgaria", "region": "Europe", "lat": 42.6977, "lng": 23.3219},
    "Zagreb": {"country": "Croatia", "region": "Europe", "lat": 45.8150, "lng": 15.9819},
    "Copenhagen": {"country": "Denmark", "region": "Europe", "lat": 55.6761, "lng": 12.5683},
    "Tallinn": {"country": "Estonia", "region": "Europe", "lat": 59.4370, "lng": 24.7536},
    "Helsinki": {"country": "Finland", "region": "Europe", "lat": 60.1695, "lng": 24.9354},
    "Berlin": {"country": "Germany", "region": "Europe", "lat": 52.5200, "lng": 13.4050},
    "Athens": {"country": "Greece", "region": "Europe", "lat": 37.9838, "lng": 23.7275},
    "Dublin": {"country": "Ireland", "region": "Europe", "lat": 53.3498, "lng": -6.2603},
    "Rome": {"country": "Italy", "region": "Europe", "lat": 41.9028, "lng": 12.4964},
    "Riga": {"country": "Latvia", "region": "Europe", "lat": 56.9496, "lng": 24.1052},
    "Vilnius": {"country": "Lithuania", "region": "Europe", "lat": 54.6872, "lng": 25.2797},
    "Luxembourg": {"country": "Luxembourg", "region": "Europe", "lat": 49.6116, "lng": 6.1319},
    "Amsterdam": {"country": "Netherlands", "region": "Europe", "lat": 52.3676, "lng": 4.9041},
    "Lisbon": {"country": "Portugal", "region": "Europe", "lat": 38.7223, "lng": -9.1393},
    "Bucharest": {"country": "Romania", "region": "Europe", "lat": 44.4268, "lng": 26.1025},
    "Bratislava": {"country": "Slovakia", "region": "Europe", "lat": 48.1486, "lng": 17.1077},
    "Ljubljana": {"country": "Slovenia", "region": "Europe", "lat": 46.0569, "lng": 14.5058},
    "Stockholm": {"country": "Sweden", "region": "Europe", "lat": 59.3293, "lng": 18.0686},
    "Zurich": {"country": "Switzerland", "region": "Europe", "lat": 47.3769, "lng": 8.5417},
}

# Price multipliers for different regions (relative to baseline international prices)
# US cities are typically 2-3x more expensive than international medical tourism destinations
region_multipliers = {
    "USA": 2.5,  # US cities significantly more expensive
    "Canada": 1.8,  # Canada moderately more expensive
    "Australia": 2.0,  # Australia high costs
    "Western Europe": 1.5,  # Western EU more expensive
    "Eastern Europe": 0.9,  # Eastern EU affordable
    "South America": 1.1,  # South America moderate
    "China": 1.3,  # China moderate-high
    "Taiwan": 1.2,  # Taiwan moderate
    "Russia": 0.8,  # Russia affordable
    "Kazakhstan": 0.7,  # Central Asia very affordable
}

def get_multiplier(country, region):
    if country == "USA" or country == "Canada":
        return region_multipliers.get(country, 1.5)
    elif country == "Australia":
        return region_multipliers["Australia"]
    elif country in ["Brazil", "Argentina"]:
        return region_multipliers["South America"]
    elif country in ["China"]:
        return region_multipliers["China"]
    elif country in ["Taiwan"]:
        return region_multipliers["Taiwan"]
    elif country in ["Russia"]:
        return region_multipliers["Russia"]
    elif country in ["Kazakhstan"]:
        return region_multipliers["Kazakhstan"]
    elif country in ["Austria", "Belgium", "Denmark", "Finland", "Germany", "Ireland",
                     "Luxembourg", "Netherlands", "Sweden", "Switzerland"]:
        return region_multipliers["Western Europe"]
    else:  # Eastern EU
        return region_multipliers["Eastern Europe"]

# Get existing procedures
procedures_set = set()
for item in data:
    procedures_set.add(item['procedure'])

print(f"Found {len(procedures_set)} existing procedures")
print(f"Adding {len(new_cities)} new cities to each procedure")

# For each procedure, add each new city
new_records = []
for procedure in procedures_set:
    # Find a sample record for this procedure to get baseline pricing
    sample = next((d for d in data if d['procedure'] == procedure), None)
    if not sample:
        continue

    # Get baseline prices (use typical international city like Bangkok/Istanbul)
    baseline_low = sample.get('price_low_usd', 1000)
    baseline_high = sample.get('price_high_usd', 3000)
    baseline_mid = sample.get('price_mid_usd', 2000)
    category = sample.get('category', 'Medical')

    for city_name, city_info in new_cities.items():
        country = city_info["country"]
        multiplier = get_multiplier(country, city_info["region"])

        # Calculate prices with multiplier
        price_low = int(baseline_low * multiplier)
        price_high = int(baseline_high * multiplier)
        price_mid = int(baseline_mid * multiplier)

        # Determine currency
        currency_map = {
            "USA": "USD", "Canada": "CAD", "Brazil": "BRL", "Argentina": "ARS",
            "Australia": "AUD", "China": "CNY", "Taiwan": "TWD", "Russia": "RUB",
            "Kazakhstan": "KZT", "Austria": "EUR", "Belgium": "EUR", "Bulgaria": "BGN",
            "Croatia": "HRK", "Denmark": "DKK", "Estonia": "EUR", "Finland": "EUR",
            "Germany": "EUR", "Greece": "EUR", "Ireland": "EUR", "Italy": "EUR",
            "Latvia": "EUR", "Lithuania": "EUR", "Luxembourg": "EUR", "Netherlands": "EUR",
            "Portugal": "EUR", "Romania": "RON", "Slovakia": "EUR", "Slovenia": "EUR",
            "Sweden": "SEK", "Switzerland": "CHF"
        }
        currency = currency_map.get(country, "USD")

        # Determine confidence and source
        if country == "USA":
            confidence = "High"
            source = "US clinic data + aggregators"
        elif country in ["Canada", "Australia"]:
            confidence = "Medium"
            source = "Clinic websites"
        elif country in ["Germany", "Switzerland", "Austria", "Netherlands"]:
            confidence = "High"
            source = "Clinic sites + aggregators"
        else:
            confidence = "Medium"
            source = "Market estimates"

        # Create notes
        if country == "USA":
            included = "Surgeon, facility, comprehensive care"
            notes = "Anesthesia, follow-up"
            caveats = "US healthcare costs significantly higher"
        elif country == "Canada":
            included = "Surgeon, facility"
            notes = "Extended care"
            caveats = "Canadian healthcare pricing"
        elif country == "Australia":
            included = "Surgeon, hospital care"
            notes = "Follow-up visits"
            caveats = "Australian medical costs high"
        elif "Western Europe" in str(get_multiplier(country, city_info["region"])):
            included = "Surgeon, facility, EU standards"
            notes = "Post-op care"
            caveats = "EU regulations and quality"
        else:
            included = "Surgeon, facility"
            notes = "Basic follow-up"
            caveats = "Emerging medical tourism market"

        new_record = {
            "procedure": procedure,
            "category": category,
            "city": city_name,
            "country": country,
            "region": city_info["region"],
            "price_low_usd": price_low,
            "price_high_usd": price_high,
            "price_mid_usd": price_mid,
            "currency": currency,
            "included": included,
            "notes": notes,
            "confidence": confidence,
            "source": source,
            "caveats": caveats,
            "lat": city_info["lat"],
            "lng": city_info["lng"]
        }
        new_records.append(new_record)

# Add new records to existing data
data.extend(new_records)

# Write updated data
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"Added {len(new_records)} new records")
print(f"Total records now: {len(data)}")
print(f"\nBreakdown:")
for procedure in sorted(procedures_set):
    count = len([d for d in data if d['procedure'] == procedure])
    print(f"  {procedure}: {count} cities")
