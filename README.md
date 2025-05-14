# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
# tabata-manager
A simple web App in REACT for tabata session

# 09k-Tabata Timer

A React-based Tabata workout timer application with customizable intervals, multiple stations, and sound notifications.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd 09k-tabata
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

### Development Mode

To run the application in development mode:
```bash
npm run dev
```
This will start the development server, typically at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```
This will generate optimized files in the `dist` directory.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```
This will serve the contents of the `dist` directory, typically at `http://localhost:4173`

## Project Structure

```
09k-tabata/
├── public/
│   ├── sounds/      # Audio files for notifications
│   └── gifs/        # Exercise demonstration GIFs
├── src/
│   ├── components/  # React components
│   ├── assets/      # Static assets
│   └── ...
└── package.json
```

## Features

- Customizable work/rest intervals
- Multiple exercise stations
- Sound notifications for interval changes
- 10-second preparation countdown
- Exercise GIF demonstrations
- Save and load workout configurations

## Browser Support

The application is tested and supported on modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Make sure your browser allows audio playback for the beep sounds to work
- The application uses local storage to save workout configurations
