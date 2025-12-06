# Traffic Light Management Simulation

A 3D traffic light management simulation built with React Three Fiber, TypeScript, and Spring Boot.

## Overview

This application demonstrates AI-powered traffic light optimization using:
- **Frontend**: React 18 + TypeScript + React Three Fiber for 3D visualization
- **State Management**: Zustand for efficient state handling
- **Backend**: Spring Boot 3.4 with intelligent traffic timing algorithms
- **Build**: Vite for fast development and optimized production builds

## Architecture

The application follows a clean separation of concerns:

```
Frontend (3D Simulation)          Backend (AI Calculator)
────────────────────              ───────────────────
• Renders 3D scene               • Receives traffic data
• Moves vehicles                 • Calculates optimal timings
• Manages queues                 • Returns light durations
• Counts cars per direction
• Animates traffic lights
• Applies backend timings
```

Every 10 seconds, the frontend sends traffic counts to the backend, which calculates optimal green light durations based on current traffic volume.

## API Contract

### Request: `POST /api/traffic-update`

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "intersections": {
    "intersection_1": {
      "north": 5,
      "south": 3,
      "east": 2,
      "west": 4
    }
  }
}
```

### Response:

```json
{
  "intersections": {
    "intersection_1": {
      "north_south_green": 35,
      "east_west_green": 25,
      "yellow": 5
    }
  }
}
```

## Development

### Prerequisites
- Java 21
- Node.js 20.x (automatically downloaded by Gradle)
- npm 10.x (automatically downloaded by Gradle)

### Building the Project

The Gradle build automatically handles everything:

```bash
./gradlew build
```

This command:
1. Downloads Node.js and npm if needed
2. Installs frontend dependencies
3. Builds the React app with Vite
4. Compiles Java sources
5. Packages everything into a JAR

### Running the Application

```bash
./gradlew bootRun
```

Then open your browser to:
- **3D Simulation**: http://localhost:8080/simulation
- **Main Page**: http://localhost:8080/
- **Chat Interface**: http://localhost:8080/chat
- **Demo**: http://localhost:8080/demo

### Development Mode (Frontend Only)

For rapid frontend development:

```bash
cd src/main/front-app
npm install
npm run dev
```

The dev server runs on http://localhost:3000 with hot module replacement and proxies API calls to http://localhost:8080.

## Project Structure

```
src/main/front-app/
├── src/
│   ├── components/
│   │   ├── scene/              # 3D components
│   │   │   ├── Scene.tsx       # Main 3D scene manager
│   │   │   ├── Intersection.tsx
│   │   │   ├── TrafficLight.tsx
│   │   │   ├── Vehicle.tsx
│   │   │   ├── Road.tsx
│   │   │   └── Ground.tsx
│   │   └── ui/                 # UI components
│   │       ├── ControlPanel.tsx
│   │       └── StatusBar.tsx
│   ├── stores/                 # Zustand state stores
│   │   ├── vehicleStore.ts
│   │   ├── intersectionStore.ts
│   │   └── configStore.ts
│   ├── services/               # API services
│   │   ├── apiClient.ts
│   │   └── trafficReporter.ts
│   ├── types/                  # TypeScript definitions
│   ├── constants/              # Colors and physics
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Features

### 3D Visualization
- Interactive 3D intersection with traffic lights
- Realistic vehicle movement and queuing
- Camera controls (orbit, zoom, pan)
- Dynamic lighting and shadows

### Traffic Management
- Add vehicles to any lane (North, South, East, West)
- Vehicles stop at red lights
- Traffic lights cycle through states (Green → Yellow → Red)
- Backend-optimized timing based on traffic volume

### AI Optimization
- Backend calculates optimal green light durations
- Proportional time allocation based on traffic counts
- Minimum and maximum duration constraints
- Real-time updates every 10 seconds

### User Interface
- Control panel to add/remove vehicles
- Real-time traffic light timing display
- Connection status indicator
- Update countdown timer

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| 3D Rendering | React Three Fiber + Three.js | 3D scene visualization |
| Framework | React 18 + TypeScript | Application structure |
| State | Zustand | Global state management |
| HTTP Client | Axios | API communication |
| Build Tool | Vite | Fast builds and HMR |
| Backend | Spring Boot 3.4 | REST API and algorithms |
| Java | Java 21 | Backend runtime |

## Testing

### Test Endpoints

```bash
# Test simulation page
curl http://localhost:8080/simulation

# Test API with sample traffic data
curl -X POST http://localhost:8080/api/traffic-update \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-01-01T00:00:00Z",
    "intersections": {
      "intersection_1": {
        "north": 5,
        "south": 3,
        "east": 2,
        "west": 4
      }
    }
  }'
```

## Color Palette

- **Traffic Lights**: Red (#E74C3C), Yellow (#F1C40F), Green (#2ECC71)
- **Vehicles**: Blue (#5DADE2), Green (#58D68D), Orange (#F5B041), Purple (#AF7AC5), Coral (#EC7063)
- **Environment**: Road (#3D3D3D), Ground (#90EE90), Buildings (Pastels)

## Gradle Integration

The `build.gradle` file includes custom tasks for frontend integration:

- `installFrontendDependencies` - Installs npm packages
- `buildFrontend` - Builds React app with Vite
- `copyFrontendBuild` - Copies build to Spring static resources
- `clean` - Removes node_modules and dist directories

The frontend is automatically built when you run `./gradlew build` or `./gradlew bootRun`.

## Future Enhancements

- Multiple intersection support (2-4 intersections)
- Settings panel for configuration
- AI integration with OpenAI for advanced optimization
- Vehicle turn signals and lane changing
- Traffic statistics and analytics
- Different vehicle types (cars, trucks, buses)

## License

This project is part of the Traffic Light Hackathon.
