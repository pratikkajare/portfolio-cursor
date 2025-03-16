#!/usr/bin/env python3
import requests
import json
import os
from datetime import datetime

# GitHub username
USERNAME = "pratikkajare"

def fetch_github_stats():
    """Fetch GitHub stats for a user and save to a JSON file."""
    # Base URL for GitHub API
    base_url = f"https://api.github.com/users/{USERNAME}"

    # Headers for GitHub API
    headers = {
        "Accept": "application/vnd.github.v3+json"
    }

    # Add GitHub token if available (increases rate limit)
    github_token = os.environ.get("GITHUB_TOKEN")
    if github_token:
        headers["Authorization"] = f"token {github_token}"

    # Fetch user data
    user_response = requests.get(base_url, headers=headers)
    if user_response.status_code != 200:
        print(f"Error fetching user data: {user_response.status_code}")
        return None

    user_data = user_response.json()

    # Fetch repositories
    repos_url = f"{base_url}/repos?per_page=100"
    repos_response = requests.get(repos_url, headers=headers)
    if repos_response.status_code != 200:
        print(f"Error fetching repositories: {repos_response.status_code}")
        return None

    repos_data = repos_response.json()

    # Calculate stats
    stats = {
        "public_repos": user_data.get("public_repos", 0),
        "followers": user_data.get("followers", 0),
        "following": user_data.get("following", 0),
        "total_stars": sum(repo.get("stargazers_count", 0) for repo in repos_data),
        "total_forks": sum(repo.get("forks_count", 0) for repo in repos_data),
        "languages": {},
        "top_repos": [],
        "contributions": user_data.get("contributions", 0),
        "last_updated": datetime.now().isoformat()
    }

    # Count languages
    for repo in repos_data:
        language = repo.get("language")
        if language:
            stats["languages"][language] = stats["languages"].get(language, 0) + 1

    # Get top repositories by stars
    top_repos = sorted(repos_data, key=lambda x: x.get("stargazers_count", 0), reverse=True)[:5]
    stats["top_repos"] = [
        {
            "name": repo.get("name"),
            "description": repo.get("description"),
            "stars": repo.get("stargazers_count", 0),
            "forks": repo.get("forks_count", 0),
            "url": repo.get("html_url")
        }
        for repo in top_repos
    ]

    # Save to file
    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "data")
    os.makedirs(output_dir, exist_ok=True)

    output_file = os.path.join(output_dir, "github_stats.json")
    with open(output_file, "w") as f:
        json.dump(stats, f, indent=2)

    print(f"GitHub stats saved to {output_file}")
    return stats

if __name__ == "__main__":
    fetch_github_stats()