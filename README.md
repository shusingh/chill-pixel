# Chill Pixel 🎵

A beautiful lofi music player with a pixel art theme. Listen to relaxing beats while enjoying a nostalgic pixel art aesthetic.

## Live Demo 🌐

Try out the application at: [https://chill-pixel.onrender.com](https://chill-pixel.onrender.com)

## Features ✨

- 🎵 Lofi music streaming
- 🎨 Pixel art themed UI
- 🌙 Dark mode support
- 🎮 Retro-style controls
- 🎼 Playlist management
- 🎹 Real-time track information

## Tech Stack 🛠

- React
- TypeScript
- Vite
- Tailwind CSS
- Jamendo API for music streaming
- Render.com for deployment

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/chill-pixel.git
cd chill-pixel
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Jamendo API credentials:

```env
VITE_JAMENDO_CLIENT_ID=your_client_id
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Deployment 🚀

This project is deployed on Render.com. To deploy your own instance:

1. Create a Render.com account
2. Connect your GitHub repository
3. Create a new Web Service
4. Select your repository
5. Configure the following settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`
   - Add your environment variables (VITE_JAMENDO_CLIENT_ID)

## Building for Production 🏗

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
