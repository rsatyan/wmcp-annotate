#!/bin/bash
# wmcp-annotate publish script
# Run this after creating the GitHub repo

set -e

echo "🚀 wmcp-annotate publish script"
echo "================================"

# Check npm login
echo "Checking npm login..."
if ! npm whoami &> /dev/null; then
    echo "❌ Not logged into npm. Running npm login..."
    npm login
fi

# Build
echo "Building..."
npm run build

# Publish to npm
echo "Publishing to npm..."
npm publish --access public

echo ""
echo "✅ Published to npm!"
echo ""
echo "Next steps:"
echo "1. Create GitHub repo: gh repo create avatarconsulting/wmcp-annotate --public"
echo "2. Push code: git remote add origin git@github.com:avatarconsulting/wmcp-annotate.git && git push -u origin master"
echo "3. Deploy landing page to Vercel/Netlify"
echo "4. Post to social media (see LAUNCH.md)"
echo ""
