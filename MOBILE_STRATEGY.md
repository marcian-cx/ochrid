# Mobile Strategy for OCHRID

## Current State
- Next.js 14 with App Router (SSR)
- Server-side API calls to Orthocal
- File-based data (366 JSON files)
- Responsive web design

## Mobile Options Comparison

### Option 1: PWA (Progressive Web App)
**Timeline:** 1 week
**Cost:** Minimal
**Effort:** Low

**Changes Required:**
1. Add manifest.json
2. Add service worker
3. Implement offline caching
4. Add "Add to Home Screen" prompt

**Pros:**
- Instant deployment
- No app store approval
- Works on current architecture
- Offline access

**Cons:**
- iOS push notifications limited
- Not in App Store
- Slightly less native feel

---

### Option 2: Capacitor Hybrid
**Timeline:** 2-3 weeks
**Cost:** Low-Medium
**Effort:** Medium

**Changes Required:**
1. Convert Next.js to static export
2. Move Orthocal API calls to client-side
3. Add Capacitor native layer
4. Configure for iOS/Android builds
5. Submit to app stores

**Architecture Changes:**
```typescript
// BEFORE (Server-side)
export default async function DayPage() {
  const orthocalData = await fetchOrthocalByDate(date); // Server
  return <Page data={orthocalData} />;
}

// AFTER (Client-side)
'use client';
export default function DayPage() {
  const { data } = useSWR(date, fetchOrthocalByDate); // Client
  return <Page data={data} />;
}
```

**Additional Requirements:**
- Convert to `output: 'export'` in next.config.js
- Bundle all 366 entries into app
- Use client-side data fetching
- Add Capacitor plugins for native features

**Pros:**
- In App Store + Play Store
- Push notifications work well
- Native features accessible
- 80% code reuse

**Cons:**
- Lose some SSR benefits
- Need app store approval
- More complex deployment

---

### Option 3: React Native/Expo
**Timeline:** 2-3 months
**Cost:** High
**Effort:** High

**New Architecture:**
```
/
├── apps/
│   ├── web/          # Next.js (current)
│   ├── mobile/       # Expo/React Native
│   └── shared/       # Shared logic
│       ├── api/
│       ├── types/
│       └── utils/
```

**Pros:**
- Best performance
- Full native capabilities
- Best UX
- Professional feel

**Cons:**
- Separate codebase
- More maintenance
- Longer dev time
- Higher cost

---

## Recommended Path

### Phase 1: PWA (Week 1)
Launch PWA to validate mobile interest
- Add offline support
- Enable "install" prompt
- Test with users
- Collect feedback

### Phase 2: Capacitor (Month 2-3)
Convert to Capacitor if PWA shows traction
- Restructure for static export
- Add native features
- Launch on app stores
- Premium tier launch

### Phase 3: Native (Month 6+)
Build React Native app if growth justifies
- Only for premium features
- Keep web as free tier
- Best possible experience

---

## Technical Requirements for Capacitor

### 1. Next.js Config Changes
```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

### 2. API Layer Refactor
Move all server-side calls to client-side:
- Orthocal API → client fetch with SWR
- File reads → bundle data or use API

### 3. Capacitor Setup
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap add android
```

### 4. Native Features
```typescript
// Push notifications
import { PushNotifications } from '@capacitor/push-notifications';

// Local notifications
import { LocalNotifications } from '@capacitor/local-notifications';

// App preferences
import { Preferences } from '@capacitor/preferences';
```

---

## Cost Analysis

### PWA
- Development: $0 (DIY) or $2-5K (hire)
- Maintenance: Minimal
- Hosting: $20-50/month

### Capacitor
- Development: $5-15K (or 2-3 weeks DIY)
- App Store fees: $99/year (Apple) + $25 (Google one-time)
- Maintenance: ~10 hours/month
- Hosting: $50-100/month

### React Native
- Development: $20-40K (or 2-3 months DIY)
- App Store fees: $124/year
- Maintenance: ~20 hours/month
- Hosting: $100-200/month

---

## Decision Matrix

| Feature | PWA | Capacitor | React Native |
|---------|-----|-----------|--------------|
| Time to Market | 1 week | 3 weeks | 3 months |
| Cost | Low | Medium | High |
| Performance | Good | Good | Excellent |
| Native Feel | Fair | Good | Excellent |
| Push Notifications | Limited | Full | Full |
| Offline Access | Yes | Yes | Yes |
| App Store Presence | No | Yes | Yes |
| Code Reuse | 100% | 80% | 40% |
| Maintenance | Easy | Medium | Complex |

---

## Recommendation

**Start with PWA, evolve to Capacitor**

This gives you:
1. Fastest validation
2. Lowest risk
3. Path to native
4. Manageable costs
5. Single codebase (mostly)

Once you hit 1,000 paying users, invest in full React Native app for premium tier.

