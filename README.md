# watch-party

Peer to peer tab sharing for two people. One HTML page, no backend, no accounts.

## Features

- Share a tab, window, or screen at up to 1080p 30fps with stereo tab audio
- Two-way voice with a mic picker, click-to-mute bubbles, and speaking indicators
- Either person can share, one at a time
- Collapsible chat sidebar
- Separate volume for their voice and the screen audio, up to 300%
- "Hear what they hear" mode to check your outgoing audio
- Optional Chrome extension that syncs play/pause to the shared tab

## Run

The friend's browser only allows the mic on HTTPS, so serve the folder locally and expose it through a tunnel. From the repo folder:

```
python3 -m http.server 8000 --bind 127.0.0.1
cloudflared tunnel --url http://localhost:8000
```

`ssh -R 80:localhost:8000 nokey@localhost.run` also works without installing anything, but its free address rotates, which breaks old invite links.

## Use

1. Open the tunnel URL, click START, and allow the mic. The invite link appears in the settings menu (⚙).
2. Send the link. Your friend opens it and clicks JOIN.
3. Either of you clicks Share, picks a tab, and ticks "Share tab audio".

The video player's fullscreen button shows only the video. Volume lives in the settings menu.

## Play/pause sync extension

Only the person sharing needs it.

1. Open `chrome://extensions` and enable Developer mode.
2. Click "Load unpacked" and select the `extension` folder.
3. Reload the tab you plan to share.

Without it, a pause only freezes the viewer's picture and the shared tab keeps playing.

## How it works

- WebRTC through [PeerJS](https://peerjs.com). The public PeerJS server only brokers the handshake. Video and audio go directly between the two browsers, encrypted with DTLS-SRTP, and fall back to the PeerJS TURN relay (still encrypted) when a direct path fails.
- Voice and screen are separate calls, so either side can start or stop sharing without renegotiating.
- The data channel carries chat, speaking state, and play/pause commands.

## Limits

- Chrome/Chromium only
- On Linux only tabs share audio, not windows or the whole screen
- DRM sites like Netflix capture as a black screen
- Anyone with the link can join until the first friend connects
- Use headphones to avoid echo
