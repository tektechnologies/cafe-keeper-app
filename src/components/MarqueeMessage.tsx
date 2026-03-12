import { Suspense, lazy, useSyncExternalStore } from 'react'

/**
 * Client-only marquee wrapper. Loaded dynamically so react-fast-marquee
 * is never imported on the server (it doesn't support SSR).
 */
const MarqueeMessageClient = lazy(
  () => import('./MarqueeMessageClient'),
)

/** No-op unsubscribe. We only read "is client?", which doesn't change. */
function subscribe() {
  return () => {}
}

/** In the browser, window exists, so we're on the client. */
function getClientSnapshot() {
  return typeof window !== 'undefined'
}

/** During SSR and hydration, report that we're not on the client. */
function getServerSnapshot() {
  return false
}

/**
 * Returns true only after hydration (in the browser). Uses useSyncExternalStore
 * so the server and first client render match, avoiding hydration mismatches.
 */
function useIsClient() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}

const items = [
  'Access to AI work flows',
  'Secure Data and Process Tracking',
  'Manage your Information Systems',
]

const itemStyle = { marginRight: '40px', fontSize: '25px' }

/** Static copy of the marquee text; shown on the server and while the client chunk loads. */
const placeholder = (
  <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
    {items.map((text, i) => (
      <span key={i} style={itemStyle}>
        {text}
      </span>
    ))}
  </div>
)

export default function MarqueeMessage() {
  const isClient = useIsClient()

  // Server and initial client render: show static text (no Marquee = no SSR error).
  if (!isClient) {
    return placeholder
  }

  // After hydration: load and render the real marquee inside Suspense.
  return (
    <Suspense fallback={placeholder}>
      <MarqueeMessageClient />
    </Suspense>
  )
}
