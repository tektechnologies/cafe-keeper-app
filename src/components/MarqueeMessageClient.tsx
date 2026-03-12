/**
 * Client-only marquee content. This file is loaded only in the browser
 * (via React.lazy from MarqueeMessage.tsx), so react-fast-marquee is
 * never run on the server.
 */
import Marquee from 'react-fast-marquee'

const items = [
  'Access to AI work flows',
  'Secure Data and Process Tracking',
  'Manage your Information Systems',
]

const itemStyle = { marginRight: '40px', fontSize: '25px' }

export default function MarqueeMessageClient() {
  return (
    <Marquee>
      {items.map((text, i) => (
        <span key={i} style={itemStyle}>
          {text}
        </span>
      ))}
    </Marquee>
  )
}
