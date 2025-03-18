# Channel Block System

## Project Structure
```
...channel-block-system/
│── public/                    # Static assets
│── src/
│   ├── assets/                 # Images, styles, fonts
│   │   ├── icons/
│   │   ├── styles/
│   │   ├── fonts/
│   ├── components/             # Reusable components
│   │   ├── channels/
│   │   │   ├── ChannelList.vue      # Displays list of channels
│   │   │   ├── ChannelDetail.vue    # Details of a specific channel
│   │   │   ├── ChannelForm.vue      # Form to create/edit channels
│   │   │   ├── ChannelActions.vue   # Actions like delete, edit
│   │   ├── blocks/
│   │   │   ├── BlockList.vue        # Displays list of blocks
│   │   │   ├── BlockDetail.vue      # Details of a specific block
│   │   │   ├── BlockForm.vue        # Form to create/edit blocks
│   │   │   ├── BlockActions.vue     # Actions like delete, edit
│   ├── ui/                  # General UI components (buttons, modals, etc.)
│   ├── layouts/             # Layout components
│   ├── composables/         # Logic layer for fetching & state management
│   │   ├── useChannels.ts       # Handles fetching channels
│   │   ├── useBlocks.ts         # Handles fetching blocks
│   │   ├── useUsers.ts          # Handles fetching users
│   │   ├── useAuth.ts           # Handles authentication state
│   ├── directives/          # Custom Vue directives (v-focus, v-access)
│   ├── middleware/          # Authentication & Authorization guards
│   ├── pages/               # Nuxt pages (auto-routed)
│   │   ├── index.vue           # Dashboard Home
│   │   ├── channels/           # Channels module
│   │   │   ├── index.vue       # Channels list
│   │   │   ├── new.vue         # Create new channel
│   │   │   ├── [id].vue        # Channel details/edit page
│   │   ├── blocks/             # Blocks module
│   │   │   ├── index.vue       # Blocks list
│   │   │   ├── new.vue         # Create new block
│   │   │   ├── [id].vue        # Block details/edit page
│   ├── plugins/             # Global plugins
│   ├── api/                 # Centralized API layer
│   │   ├── channels.ts          # API calls for channels
│   │   ├── blocks.ts            # API calls for blocks
│   │   ├── users.ts             # API calls for users
│   │   ├── auth.ts              # Authentication-related API calls
│   │   ├── index.ts             # Centralized API exports
│   ├── store/               # Pinia store
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Utility functions
│   ├── i18n/                # Localization files
│   ├── app.vue              # Root component
│── tests/
│   ├── unit/                # Unit tests
│   ├── e2e/                 # End-to-end tests
│── .eslintrc.js             # Linting configuration
│── nuxt.config.ts           # Nuxt configuration
│── tsconfig.json            # TypeScript config
│── vitest.config.ts         # Testing config
│── package.json             # Dependencies
│── README.md                # Documentation
```

## Project Overview
This project is a **Nuxt 3**-based system for managing **channels and blocks**, featuring:
- **Modular structure** with reusable components.
- **Centralized API layer (`/api/`)** for managing backend requests.
- **Composables (`/composables/`)** for managing data fetching and state.
- **Pinia store (`/store/`)** for global state management.
- **Authentication middleware (`/middleware/`)** for role-based access control.
- **Internationalization (`/i18n/`)** for supporting multiple languages.

## API Configuration
The project uses environment variables to manage API URLs. Set the **base API URL** in `.env`:
```
NUXT_PUBLIC_API_BASE=https://your-backend.com/api
```
Ensure it's loaded in `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE: process.env.NUXT_PUBLIC_API_BASE || "https://default-api.com",
    },
  },
});
```

## How to Use API in Components
### Example: Fetching Channels
Use the composables inside Vue components:
```vue
<script setup lang="ts">
import { useChannels } from "@/composables/useChannels";

const { channels, pending, error, refresh } = useChannels();
</script>

<template>
  <div>
    <button @click="refresh">Reload Channels</button>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="channel in channels" :key="channel.id">{{ channel.name }}</li>
    </ul>
  </div>
</template>
```

## Running the Project
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the development server:
   ```sh
   npm run dev
   ```
3. Deploying to production:
   ```sh
   npm run build
   npm run start
   ```

## Testing
Run unit tests:
```sh
npm run test:unit
```
Run end-to-end tests:
```sh
npm run test:e2e
```

## Contribution
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---
### 📌 This README provides a clean, organized overview of your **Channel Block System** project.
Let me know if you'd like any modifications! 🚀

