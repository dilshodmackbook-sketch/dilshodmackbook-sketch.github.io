import type { BlogPost } from '../types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'react-query-changed-state',
    key: 'reactQuery',
    readingTime: 7,
    tags: ['React', 'React Query', 'State'],
    accent: 'violet',
    sections: [
      {
        heading: 'The problem with client-side state libraries',
        body: [
          "For years, I treated Redux and Vuex as the default answer for anything stateful. Need to fetch a user? Redux. Cache a list of products? Vuex. Synchronize data across tabs? Sure — more reducers.",
          "Slowly, my codebases got heavy. Two thirds of the actions, reducers, and selectors I wrote were essentially: 'fetch, store, expose, invalidate, refetch.' I was reinventing a cache, badly, in every project.",
        ],
      },
      {
        heading: 'What React Query actually solves',
        body: [
          "React Query (now TanStack Query) reframes the question: most of what you call 'state' is actually a cached snapshot of server state. It's not yours — the server owns it. You're just looking at a copy.",
          "Once I internalized that, my Redux stores shrunk dramatically. UI state stays in components. Server state lives in the cache. Suddenly, I didn't need a global store for 80% of what I used to put there.",
        ],
      },
      {
        heading: 'The patterns that stuck',
        body: [
          "Three patterns made the biggest difference: (1) `staleTime` properly tuned per query, (2) optimistic updates with `onMutate` for snappy UX, and (3) query invalidation keys structured like a tree so a single mutation can invalidate exactly the right slice.",
          "On Quantum ELD we cut perceived latency on most actions to near-zero by combining optimistic mutations with smart background refetching. Users feel like the app responds instantly, even on slow networks.",
        ],
      },
      {
        heading: 'When NOT to use it',
        body: [
          "Don't use React Query for purely local state (form drafts, modal open flags, theme). Don't use it as a global event bus. And don't fight it — if a piece of state isn't server-derived, find a smaller tool.",
        ],
      },
    ],
  },
  {
    slug: 'vue-to-react-mental-model',
    key: 'vueToReact',
    readingTime: 9,
    tags: ['Vue', 'React', 'Career'],
    accent: 'cyan',
    sections: [
      {
        heading: 'Why I switched',
        body: [
          "I spent three solid years in Vue — Vue 2, Vue 3 with Composition API, Pinia, Nuxt 3. I loved the developer experience: SFCs, the template syntax, reactivity that just worked.",
          "Then I joined a team where React was the standard, and I freelanced on Expensify's React Native codebase. Within months, my mental model had to rewire itself.",
        ],
      },
      {
        heading: 'The things Vue spoils you on',
        body: [
          "Two-way binding with `v-model` is genuinely nicer for forms than React's controlled inputs. Scoped styles in SFCs are a quality-of-life win Tailwind only partially replaces. And computed properties feel more natural than `useMemo` with dependency arrays.",
        ],
      },
      {
        heading: 'The things React got me hooked on',
        body: [
          "Composition becomes truly composition. Hooks aren't magic — they're just functions that follow a contract. Once you accept that, you build small, testable, reusable pieces of logic far more naturally than Vue's composables encouraged me to.",
          "The React Query + Radix + Tailwind stack also turned out to be unbeatable for shipping accessible UI fast.",
        ],
      },
      {
        heading: 'Advice for Vue devs switching',
        body: [
          "Don't fight `useEffect`. Don't recreate `watch` in your head — instead, think about what the UI is a function of, and let React rerender. The framework rewards declarative thinking and punishes imperative habits.",
        ],
      },
    ],
  },
  {
    slug: 'tailwind-three-years-later',
    key: 'tailwindReal',
    readingTime: 6,
    tags: ['Tailwind', 'CSS', 'Design Systems'],
    accent: 'pink',
    sections: [
      {
        heading: 'The honest take',
        body: [
          "I've shipped Tailwind in 10+ production projects across React, Vue, and Nuxt. The hype is mostly deserved. The complaints are mostly real, too.",
        ],
      },
      {
        heading: 'What works in real teams',
        body: [
          "Speed of iteration is real. You can change a design without leaving the JSX. Code review of UI changes becomes diff-readable. Onboarding new devs is faster because there's no bespoke CSS conventions to learn.",
          "When you commit to a design system in your `tailwind.config`, components stay consistent without anyone enforcing it manually.",
        ],
      },
      {
        heading: 'What hurts',
        body: [
          "Long class strings on complex components are genuinely hard to read. The answer is small components, not arbitrary `@apply` rules — once you start mixing both, you lose the simplicity Tailwind promises.",
          "Animations and complex hover/focus states still benefit from real CSS classes. Don't be religious about it.",
        ],
      },
      {
        heading: 'My current ruleset',
        body: [
          "(1) Extend the theme aggressively — colors, spacing, fonts. (2) Build a small component primitive library (Button, Card, Input). (3) Use `clsx` or `cn` helpers, not string concatenation. (4) Reach for plain CSS for keyframes and rare effects.",
        ],
      },
    ],
  },
  {
    slug: 'webpack-to-vite-migration',
    key: 'viteVsWebpack',
    readingTime: 8,
    tags: ['Vite', 'Webpack', 'Tooling'],
    accent: 'green',
    sections: [
      {
        heading: 'Why migrate at all',
        body: [
          "If your Webpack config works and your build takes 30 seconds, you can skip this article. But if dev server cold start is 60+ seconds and HMR feels laggy, Vite will change your day.",
        ],
      },
      {
        heading: 'What broke',
        body: [
          "Most things ported cleanly. Three categories of pain: (1) custom Webpack loaders that didn't have Vite/Rollup equivalents, (2) CommonJS-only dependencies that needed `vite-plugin-commonjs` shims, (3) environment variable conventions — `process.env` becomes `import.meta.env`.",
        ],
      },
      {
        heading: 'What got dramatically better',
        body: [
          "Cold start: 90s → 1.8s. HMR: ~3s → ~150ms. Production build: similar or slightly faster. Bundle output: smaller in most cases because esbuild + Rollup are aggressive about tree-shaking.",
        ],
      },
      {
        heading: 'Should you migrate?',
        body: [
          "Yes, if your app is < 100K LOC and your dependency tree is mostly ESM-friendly. Yes, if developer experience is hurting team productivity. No, if you have heavy custom Webpack plugins or your build is integrated into a larger backend bundler — the migration cost may not pay off.",
        ],
      },
    ],
  },
]
