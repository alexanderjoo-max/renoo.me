import json

# Load the data
with open('data.json', 'r') as f:
    data = json.load(f)

print(f"Total records before: {len(data)}")

# Track unique entries
seen = set()
unique_data = []

for item in data:
    # Create a unique key based on procedure, city, and country
    key = (item['procedure'], item['city'], item['country'])

    if key not in seen:
        seen.add(key)
        unique_data.append(item)
    else:
        print(f"Removing duplicate: {item['procedure']} in {item['city']}, {item['country']}")

print(f"Total records after: {len(unique_data)}")
print(f"Removed {len(data) - len(unique_data)} duplicates")

# Save the cleaned data
with open('data.json', 'w') as f:
    json.dump(unique_data, f, indent=2)

print("\nDone! Saved cleaned data to data.json")
