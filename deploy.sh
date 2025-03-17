#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --prod --dir=out

echo "Deployment process completed."