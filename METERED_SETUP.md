# Crossfire Online networking: free STUN-only mode

This build no longer calls Metered. `js/game.js` uses the public Google and Cloudflare STUN endpoints already configured in `RTC_CFG`, and `js/metered-config.js` contains no credential.

## What works
- GitHub Pages can host the static game files.
- Trystero's default public signaling network is used for lobby discovery.
- WebRTC tries direct peer-to-peer connections using STUN; no paid TURN account is required.
- Manual host/join is still available as a two-player copy/paste fallback.

## Limitations
STUN is not a relay. If either player's network blocks direct peer-to-peer traffic (some school, mobile, corporate, or strict NAT networks), online multiplayer may fail. Try both players on different networks (for example, home Wi-Fi and a phone hotspot). If reliable connectivity on all networks becomes necessary, add a managed TURN service or host coturn on a reachable machine/server.

## Publish
Upload the contents of this folder to your GitHub repository and publish the repository root with GitHub Pages. Test with two devices on different networks.

## Security note
The original `js/metered-config.js` contained a Metered credential API key. It has been removed from this modified copy. If that key was ever pushed to a public repository, revoke/rotate it in Metered before using that account again; removing it from the current files does not erase it from Git history or prior downloads.
