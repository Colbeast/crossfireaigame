# Metered TURN setup for Crossfire Online v3.8

The game already uses Trystero + WebRTC for multiplayer. Metered is used as a
TURN relay so players can connect when direct WebRTC connectivity fails.

## 1. Create a Metered TURN credential

1. Sign in to Metered.
2. Open the TURN Server page.
3. Create/add a TURN credential.
4. Give it a label such as `crossfire-online`.
5. After it is created, open the credential's **Get credential** details.
6. Use **Show API Key** for this credential.
7. Do NOT use your account **Secret Key** in the game.

## 2. Put the credential API endpoint in the game

Open:

    js/metered-config.js

Set:

    window.METERED_TURN_API =
      'https://YOURAPP.metered.live/api/v1/turn/credentials?apiKey=YOUR_CREDENTIAL_API_KEY';

Replace YOURAPP and YOUR_CREDENTIAL_API_KEY with the values from Metered.

The credential API key is scoped to that TURN credential. The account Secret
Key must never be put in public browser code.

## 3. Publish the game

Upload the contents of `crossfire-online/` to your GitHub repository and enable
GitHub Pages.

## 4. What the game now does

On startup/connection it fetches Metered's complete ICE-server list and adds
it to the existing Google/Cloudflare STUN servers. Trystero then uses that
configuration for WebRTC.

If Metered is not configured, the game still works with the original STUN
configuration.

If Metered cannot be reached, the game reports the configuration problem
instead of silently pretending TURN is available.

## 5. Test

Test with two different internet connections (for example, home Wi-Fi and a
phone hotspot). Host a lobby on one device, enter the four-letter lobby code
on the other, and start a match.

Metered's dashboard/testing tools can be used to verify that the TURN
credential itself is reachable.
