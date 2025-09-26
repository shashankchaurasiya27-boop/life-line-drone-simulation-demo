#!/bin/bash

echo "🚀 Deploying Moodify Application..."

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Your application is ready to deploy!"
    echo ""
    echo "Choose your hosting platform:"
    echo "1. Vercel (Recommended - Easy & Fast)"
    echo "2. Netlify (Great for static sites)"
    echo "3. GitHub Pages (Free hosting)"
    echo "4. Firebase Hosting (Google's platform)"
    echo ""
    echo "📁 Build files are in the 'build' directory"
    echo "📋 Configuration files have been created:"
    echo "   - vercel.json (for Vercel)"
    echo "   - netlify.toml (for Netlify)"
    echo "   - .github/workflows/deploy.yml (for GitHub Pages)"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your repository to your chosen hosting platform"
    echo "3. Deploy!"
else
    echo "❌ Build failed!"
    exit 1
fi


