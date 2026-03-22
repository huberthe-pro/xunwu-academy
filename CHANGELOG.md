# Changelog

All notable changes to the Xunwu Academy project will be documented in this file.

## [0.1.1] - 2026-03-22

### Added
- **Rich Text Editing**: Replaced standard text areas with `@tiptap/react` for elegant, highly customizable rich text editing tailored to the project's ink-wash aesthetic.
- **Image Upload Integration**: Integrated Supabase Storage (`xunwu-images` bucket) into the editor. Includes frontend file-size validation (<5MB) and automatic inline insertion of remote URLs.
- **Frontend Typography**: Integrated `@tailwindcss/typography` (`prose`) plugin for rendering rich text articles flawlessly on public pages (`/article/[id]`).
- **Article View Counter**: 
  - *Frontend*: Visits to the article detail page autonomously increment the Supabase view count using a silent React Client Component.
  - *Admin*: Admins can manually view and override view counts inside the Content Management panel.
- **Proxy Middleware**: Upgraded deprecated Next.js v15 `middleware` paradigm to strictly adhere to the Next.js `proxy.ts` convention.

### Changed
- Bumped project version to `0.1.1`.
- Database Schema: Added `content` column to the `articles` table.
- Storage RLS: Configured explicit RLS policies for `storage.objects` to allow authenticated and guest access as necessitated by client-side operations.
