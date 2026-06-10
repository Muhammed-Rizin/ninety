# Ninety - Live Football Score Widget

A beautiful, transparent, floating Electron desktop widget for live football scores, built with React, Vite, and TypeScript.

## Features
- **Transparent Floating UI**: Unobtrusive, glass-morphic design.
- **Dual API Support**: Effortlessly switch between `api-sports.io` (live events) and `football-data.org` (high frequency polling).
- **Auto-compacting**: Scales down automatically when no active match is selected.
- **Live Notifications**: Goal and Red Card popup animations!

## Getting Started

### 1. API Keys
Before running the application, you need to configure your data providers.

1. Rename the `.env.example` file to `.env`.
2. Grab your free API keys:
   - **API-Football**: Register at [dashboard.api-football.com](https://dashboard.api-football.com/register).
   - **football-data.org**: Register at [football-data.org](https://www.football-data.org/client/register).
3. Paste the keys into your `.env` file.
4. Set the `VITE_DATA_PROVIDER` variable to your preferred provider.

### 2. Development
To start the Vite dev server alongside the Electron wrapper, run:

```bash
npm install
npm run dev
```

### 3. Production Build
To package the widget into a standalone desktop executable (`.exe`, `.dmg`, etc.), run:

```bash
npm run dist
```

> [!WARNING]
> **Windows `EPERM` Rename Errors**
> When running `npm run dist`, you may encounter an `EPERM: operation not permitted` error while `electron-builder` tries to extract the Electron framework. This is almost always caused by background file lockers:
> 1. **Antivirus Scanning**: Windows Defender may lock temporary build files. If this happens, briefly pause "Real-Time Protection" in your Windows Security settings during the build.
> 2. **Cloud Sync/Workspace Watchers**: Programs like OneDrive, Google Drive, or even the VS Code file indexer will instantly lock new folders. 
> 
> **The Workaround:** If disabling your Antivirus does not fix the `EPERM` error, you can temporarily bypass all workspace file locks by instructing `electron-builder` to output to an isolated external drive. Open `package.json` and change `"directories": { "output": "release" }` to an absolute path like `"output": "C:/temp/ninety-release"`.

The bundled executables (both the Installer and Portable version) will be generated at the `release/` directory in your project folder.
