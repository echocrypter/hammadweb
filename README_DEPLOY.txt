# Hammad Ahmad Portfolio

## Run locally
Open `index.html` through a local static server (recommended), rather than `file://`.
For example, from this folder run:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Deploy
This is a static HTML/CSS/JavaScript site. Deploy the repository root as the output directory.
The animation frames must remain at:
`portfolio_video_frames/portfolio_frames/frame_0000.jpg` through `frame_0189.jpg`.

The frame loader now skips failed images safely and will not try to draw broken images.
