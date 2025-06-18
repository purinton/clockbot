# [![Purinton Dev](https://purinton.us/logos/brand.png)](https://discord.gg/QSBxQnX7PF)

## @purinton/clockbot [![npm version](https://img.shields.io/npm/v/@purinton/clockbot.svg)](https://www.npmjs.com/package/@purinton/clockbot)[![license](https://img.shields.io/github/license/purinton/clockbot.svg)](LICENSE)[![build status](https://github.com/purinton/clockbot/actions/workflows/nodejs.yml/badge.svg)](https://github.com/purinton/clockbot/actions)

A modern Discord app for displaying the current time and sunrise/sunset for any location, with multi-language support and easy extensibility.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running as a Service (systemd)](#running-as-a-service-systemd)
- [Docker](#docker)
- [Customization](#customization)
  - [Commands](#commands)
  - [Events](#events)
  - [Locales](#locales)
- [Testing](#testing)
- [Support](#support)
- [License](#license)

## Features

- Updates app Presence/Status with the current time and best clock emoji for a specified timezone
- `/time` and `!time` commands to display the current time in chat
- `/sun` and `!sun` commands to display sunrise and sunset times (requires a free OpenWeatherMap API key)
- Multi-language/localized responses and command registration
- Easily extensible with custom commands and event handlers
- Supports running multiple Discord apps, each with its own location/timezone (systemd templates)
- Environment variable configuration via dotenv
- Logging and graceful shutdown via `@purinton/common`
- Ready for deployment with systemd or Docker
- Jest for testing

## Getting Started

1. **Clone this project:**

   ```bash
   git clone https://github.com/purinton/clockbot.git
   cd clockbot
   npm install
   ```

2. **Set up your environment:**
   - Copy `.env.example` to `.env` and fill in your Discord app token, OpenWeatherMap API key, timezone, and location details.
   - Edit `package.json` (name, description, author, etc.) if desired.

3. **Start the app locally:**

   ```bash
   npm start
   # or
   node clockbot.mjs
   ```

## Configuration

- All configuration is handled via environment variables in the `.env` file.
- See `.env.example` for required and optional variables (Discord token, OWM API key, TIMEZONE, LOCATION_LAT/LON, etc).

## Running as a Service (systemd)

1. Copy `clockbot.service` or `clockbot@.service` to `/usr/lib/systemd/system/`.
2. Edit the paths and user/group as needed.
3. Reload systemd and start the service:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable clockbot@nyc.service --now
   sudo systemctl enable clockbot@la.service --now
   sudo systemctl status clockbot@nyc.service
   sudo systemctl status clockbot@la.service
   ```

## Docker

1. Build the Docker image:

   ```bash
   docker build -t clockbot .
   ```

2. Run the container:

   ```bash
   docker run --env-file .env clockbot
   ```

## Customization

### Commands

- Add new commands in the `commands/` directory.
- Each command has a `.json` definition (for Discord registration/localization) and a `.mjs` handler (for logic).
- Example: Add a `ping.json` and `ping.mjs` for a new `/ping` command.

### Events

- Add or modify event handlers in the `events/` directory.
- Each Discord event (e.g., `ready`, `messageCreate`, `interactionCreate`) has its own handler file.

### Locales

- Add or update language files in the `locales/` directory.
- Localize command names, descriptions, and app responses.

## Testing

- Run tests with:

  ```bash
  npm test
  ```

- Add your tests in the `tests/` folder or alongside your code.

## Folder Structure

```text
clockbot.mjs         # Main entry point
commands/            # Command definitions and handlers
  help.json/.mjs     # Example command
  sun.json/.mjs      # Sunrise/sunset command
  time.json/.mjs     # Time command
events/              # Event handlers (ready, messageCreate, etc)
locales/             # Locale JSON files (en-US.json, etc)
src/                 # Shared logic (emoji, formatting, etc)
tests/               # Jest tests for commands, events, and core logic
```

## Best Practices & Tips

- **Keep your app token secret!** Never commit your `.env` file or token to version control.
- **Use a dedicated, non-root user** for running your app in production.
- **Write tests** for your command and event handlers if your app grows in complexity.
- **Check Discord.js documentation** for new features and event names: [https://discord.js.org/](https://discord.js.org/)

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://purinton.us/logos/discord_96.png)](https://discord.gg/QSBxQnX7PF)[![Purinton Dev](https://purinton.us/logos/purinton_96.png)](https://discord.gg/QSBxQnX7PF)

**[Purinton Dev on Discord](https://discord.gg/QSBxQnX7PF)**

## License

[MIT © 2025 Russell Purinton](LICENSE)

## Links

- [GitHub (Project)](https://github.com/purinton/clockbot)
- [GitHub (Org)](https://github.com/purinton)
- [GitHub (Personal)](https://github.com/rpurinton)
- [Discord](https://discord.gg/QSBxQnX7PF)
