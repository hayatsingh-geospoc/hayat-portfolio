# Hayat Singh - 3D Portfolio

A modern 3D portfolio website built with React, Three.js, and modern UI inspired by Netflix and Spotify.

## Features

- Interactive 3D background using Three.js and React Three Fiber
- Responsive design with modern UI elements
- Smooth animations and transitions with Framer Motion
- Dynamic content loading and lazy loading for optimal performance
- Netflix-inspired card design for projects
- Spotify-inspired layout for skills and experience
- Fully functional contact form

## Technologies Used

- React.js
- Three.js
- React Three Fiber
- Styled Components
- Framer Motion
- GSAP (GreenSock Animation Platform)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/hayatsingh-geospoc/hayat-portfolio.git
cd hayat-portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/src
  /assets        # Static assets like images
  /components    # Reusable UI components
    - Background3D.js  # 3D particle system
    - Loader.js        # Loading screen
    - Navbar.js        # Navigation component
  /scenes        # Main page components
    - Home.js          # Landing page
    - About.js         # About section with skills
    - Projects.js      # Projects showcase
    - Contact.js       # Contact form
  - App.js        # Main application component
  - index.js      # Entry point
```

## Build for Production

```bash
npm run build
# or
yarn build
```

## License

MIT

## Credits

Created by Hayat Singh
