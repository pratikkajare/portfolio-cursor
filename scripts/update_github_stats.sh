#!/bin/bash

# Create the data directory if it doesn't exist
mkdir -p public/data

# Install required Python packages if not already installed
pip3 install -r scripts/requirements.txt

# Run the Python script to fetch GitHub stats
python3 scripts/fetch_github_stats.py

echo "GitHub stats updated successfully!"