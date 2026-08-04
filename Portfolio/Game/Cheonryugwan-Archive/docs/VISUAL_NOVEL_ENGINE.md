# Visual Novel Engine v0.6.0

## Implemented

- Scene JSON rendering
- Background image switching
- Character display at left/center/right positions
- Character show/hide transitions
- Continuous rain ambience generated with Web Audio API
- WAV SFX playback: thunder, sword draw, sword clash, memory drone
- Master volume, mute, text speed and rain toggle
- Three manual save/load slots
- Auto-save and continue
- Choice scene and variable storage
- Dialogue log and auto-play
- Mobile viewport support

## Scene schema example

```json
{
  "id": "scene-id",
  "speaker": "정파 무인",
  "text": "허세 부리지 마라!",
  "background": "rainy-mountain-road",
  "character": {
    "id": "jeon-seoyul",
    "expression": "default",
    "position": "center",
    "visible": true
  },
  "ambient": "rain",
  "sfx": "sword-draw",
  "effect": "shake"
}
```

## Current limitation

The current Jeon Seoyul image is an author-provided visual reference with its
original background. It is used temporarily to verify the character layer.
A transparent game standing asset should replace it later.
