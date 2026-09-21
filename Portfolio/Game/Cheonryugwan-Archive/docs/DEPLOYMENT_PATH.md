# GitHub Pages Deployment Path

Version: v0.10.8

## Required directory

This project must be deployed under:

```text
Portfolio/
└─ Game/
   └─ Cheonryugwan-Archive/
      ├─ index.html
      ├─ game/
      ├─ pages/
      ├─ assets/
      └─ ...
```

Expected URL:

```text
/Portfolio/Game/Cheonryugwan-Archive/index.html
```

## Packaging rule

Release ZIPs may have versioned filenames, but the directory **inside the ZIP is always**:

```text
Cheonryugwan-Archive/
```

Do not rename the deployed directory to the release filename.
