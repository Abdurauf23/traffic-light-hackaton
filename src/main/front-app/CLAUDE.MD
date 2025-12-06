# Traffic Light Management Simulation
## Development Plan (v2)

---

## 1. Core Concept

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           REQUEST-RESPONSE FLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   FRONTEND (Visualization)              BACKEND (AI Calculator)             │
│   ────────────────────────              ───────────────────────             │
│                                                                             │
│   ┌──────────────────────┐              ┌──────────────────────┐            │
│   │                      │   Request    │                      │            │
│   │  • Renders 3D scene  │  ─────────►  │  • Receives car      │            │
│   │  • Moves vehicles    │  every ~10s  │    counts per road   │            │
│   │  • Manages queues    │              │                      │            │
│   │  • Counts cars       │              │  • Calculates optimal│            │
│   │  • Animates lights   │   Response   │    green durations   │            │
│   │                      │  ◄─────────  │                      │            │
│   │                      │  light times │  • Returns seconds   │            │
│   └──────────────────────┘              │    per light         │            │
│                                         └──────────────────────┘            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Principle:** The frontend handles ALL simulation logic, animations, and vehicle behavior. The backend is a stateless calculator that receives traffic data and returns timing recommendations.

---

## 2. API Contract

### 2.1 Request (Frontend → Backend)

**Endpoint:** `POST /api/traffic-update`  
**Frequency:** Every 10 seconds (configurable 5-15s)

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "intersections": {
    "intersection_1": {
      "north": 5,
      "south": 3,
      "east": 2,
      "west": 4
    },
    "intersection_2": {
      "north": 1,
      "south": 6,
      "east": 0,
      "west": 2
    }
  }
}
```

### 2.2 Response (Backend → Frontend)

```json
{
  "intersections": {
    "intersection_1": {
      "north_south_green": 35,
      "east_west_green": 25,
      "yellow": 5
    },
    "intersection_2": {
      "north_south_green": 20,
      "east_west_green": 40,
      "yellow": 5
    }
  }
}
```

### 2.3 Flow Diagram

```
    FRONTEND                                           BACKEND
    ────────                                           ───────
        │                                                  │
        │  Count cars: N=5, S=3, E=2, W=4                 │
        │                                                  │
        ├──────────── POST /api/traffic-update ──────────►│
        │             { intersection_1: {n:5,s:3,e:2,w:4}} │
        │                                                  │
        │                                    AI calculates │
        │                                    optimal times │
        │                                                  │
        │◄─────────── 200 OK ─────────────────────────────┤
        │             { intersection_1:                    │
        │               { north_south_green: 35,           │
        │                 east_west_green: 25 }}           │
        │                                                  │
        │  Apply new timings to traffic lights             │
        │  Continue animating vehicles                     │
        │                                                  │
        │         ... 10 seconds pass ...                  │
        │                                                  │
        ├──────────── POST /api/traffic-update ──────────►│
        │                                                  │
       ...                                                ...
```

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | React 18 + TypeScript | Application structure |
| 3D Engine | React Three Fiber + Three.js | 3D visualization |
| State | Zustand | Simulation state management |
| HTTP | Axios | API communication |
| Animation | Built-in R3F + useFrame | Vehicle/light animations |
| Build | Vite | Development and bundling |

---

## 4. System Architecture

### 4.1 Component Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          APP COMPONENT                               │   │
│  └─────────────────────────────────┬───────────────────────────────────┘   │
│                                    │                                        │
│          ┌─────────────────────────┼─────────────────────────┐              │
│          │                         │                         │              │
│          ▼                         ▼                         ▼              │
│  ┌───────────────┐       ┌─────────────────┐       ┌─────────────────┐     │
│  │   UI LAYER    │       │  3D SCENE LAYER │       │  SERVICE LAYER  │     │
│  │               │       │                 │       │                 │     │
│  │ • ControlPanel│       │ • Roads         │       │ • APIClient     │     │
│  │ • Settings    │       │ • Buildings     │       │ • DataCollector │     │
│  │ • StatsDisplay│       │ • TrafficLights │       │ • TimingManager │     │
│  │               │       │ • Vehicles      │       │                 │     │
│  └───────────────┘       └─────────────────┘       └─────────────────┘     │
│          │                         │                         │              │
│          └─────────────────────────┼─────────────────────────┘              │
│                                    │                                        │
│                                    ▼                                        │
│                    ┌───────────────────────────────┐                        │
│                    │        ZUSTAND STORES         │                        │
│                    │                               │                        │
│                    │ • vehicleStore (positions)    │                        │
│                    │ • intersectionStore (lights)  │                        │
│                    │ • configStore (settings)      │                        │
│                    └───────────────────────────────┘                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW CYCLE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│     ┌──────────┐                                                            │
│     │  START   │                                                            │
│     └────┬─────┘                                                            │
│          │                                                                  │
│          ▼                                                                  │
│     ┌──────────────────────────────────────────────────────────────┐       │
│     │  1. SIMULATION LOOP (60fps)                                   │       │
│     │     • Move vehicles based on current light states             │       │
│     │     • Update queue positions                                  │       │
│     │     • Handle vehicle spawning/despawning                      │       │
│     └──────────────────────────────────────────────────────────────┘       │
│          │                                                                  │
│          ▼                                                                  │
│     ┌──────────────────────────────────────────────────────────────┐       │
│     │  2. TIMER CHECK (every 10s)                                   │       │
│     │     • Has 10 seconds passed since last API call?              │       │
│     └──────────────────────────────────────────────────────────────┘       │
│          │                                                                  │
│          ▼ YES                                                              │
│     ┌──────────────────────────────────────────────────────────────┐       │
│     │  3. COUNT VEHICLES                                            │       │
│     │     • For each intersection, count cars per direction         │       │
│     │     • Package into request payload                            │       │
│     └──────────────────────────────────────────────────────────────┘       │
│          │                                                                  │
│          ▼                                                                  │
│     ┌──────────────────────────────────────────────────────────────┐       │
│     │  4. SEND TO BACKEND                                           │       │
│     │     POST { intersection_1: { north: 5, south: 3, ... } }      │       │
│     └──────────────────────────────────────────────────────────────┘       │
│          │                                                                  │
│          ▼                                                                  │
│     ┌──────────────────────────────────────────────────────────────┐       │
│     │  5. RECEIVE TIMINGS                                           │       │
│     │     { intersection_1: { north_south_green: 35, ... } }        │       │
│     └──────────────────────────────────────────────────────────────┘       │
│          │                                                                  │
│          ▼                                                                  │
│     ┌──────────────────────────────────────────────────────────────┐       │
│     │  6. UPDATE LIGHT CYCLE DURATIONS                              │       │
│     │     • Apply new green/yellow times to each intersection       │       │
│     │     • Lights will use new durations on next cycle             │       │
│     └──────────────────────────────────────────────────────────────┘       │
│          │                                                                  │
│          └────────────────────► Loop back to Step 1                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Feature Specifications

### 5.1 Traffic Lights

**States:**
- RED: Vehicles must stop
- YELLOW: Transition warning (vehicles stop if safe)
- GREEN: Vehicles may proceed

**Cycle Logic (Frontend-controlled):**
```
North-South GREEN  →  North-South YELLOW  →  All RED (2s)  →
East-West GREEN    →  East-West YELLOW    →  All RED (2s)  →  Repeat
```

**Duration Updates:**
- When backend responds with new timings, store them
- Apply new durations at the START of the next phase (not mid-phase)
- Smooth transition without jarring light changes

### 5.2 Vehicles

**Behavior (all frontend):**
- Spawn at lane entry when user clicks "Add Vehicle"
- Move forward at constant speed when path is clear
- Decelerate and stop at red lights
- Maintain safe distance from vehicle ahead
- Despawn after crossing intersection

**Counting Logic:**
```typescript
function countVehiclesPerDirection(intersectionId: string) {
  return {
    north: vehicles.filter(v => v.intersectionId === intersectionId && v.approach === 'north').length,
    south: vehicles.filter(v => v.intersectionId === intersectionId && v.approach === 'south').length,
    east: vehicles.filter(v => v.intersectionId === intersectionId && v.approach === 'east').length,
    west: vehicles.filter(v => v.intersectionId === intersectionId && v.approach === 'west').length
  };
}
```

### 5.3 API Communication

**Timing Service:**
```typescript
class TrafficAPIService {
  private endpoint: string;
  private intervalMs: number = 10000;
  
  async sendUpdate(data: TrafficData): Promise<LightTimings> {
    const response = await axios.post(this.endpoint, data);
    return response.data;
  }
}
```

**Error Handling:**
- If backend unavailable: Continue with current timings
- Show connection status in UI
- Retry failed requests once before skipping

---

## 6. UI/UX Design

### 6.1 Main Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Traffic Simulation                              [⚙ Settings]    [▶ Play]   │
├─────────────────────────────────────────────────────┬───────────────────────┤
│                                                     │   CONTROLS            │
│                                                     │   ────────            │
│                                                     │                       │
│                                                     │   Intersection: [▼]   │
│                                                     │   Lane: [N][S][E][W]  │
│                                                     │                       │
│              3D SIMULATION VIEW                     │   [+ Add Car]         │
│                                                     │   [Clear All]         │
│                                                     │                       │
│                                                     ├───────────────────────┤
│                                                     │   CURRENT TIMINGS     │
│                                                     │   ───────────────     │
│                                                     │                       │
│                                                     │   Int 1:              │
│                                                     │   N-S: 35s  E-W: 25s  │
│                                                     │                       │
│                                                     │   Int 2:              │
│                                                     │   N-S: 20s  E-W: 40s  │
│                                                     │                       │
├─────────────────────────────────────────────────────┴───────────────────────┤
│   API: ● Connected    Last Update: 3s ago    Next Update: 7s                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Settings Panel

```
┌─────────────────────────────────────────────────┐
│   SETTINGS                                  [X] │
├─────────────────────────────────────────────────┤
│                                                 │
│   API Endpoint                                  │
│   ┌─────────────────────────────────────────┐   │
│   │ http://localhost:8000/api/traffic       │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   Update Interval                               │
│   [5s] ──────●────── [15s]                      │
│              10s                                │
│                                                 │
│   Number of Intersections                       │
│   [ 1 ]  [ 2 ]  [ 4 ]                          │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │            Save Settings                │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 7. Visual Design

### 7.1 Color Palette

```
TRAFFIC LIGHTS
├── Red:     #E74C3C
├── Yellow:  #F1C40F
└── Green:   #2ECC71

VEHICLES (random assignment)
├── Blue:    #5DADE2
├── Green:   #58D68D
├── Orange:  #F5B041
├── Purple:  #AF7AC5
└── Coral:   #EC7063

ENVIRONMENT
├── Road:    #3D3D3D
├── Lines:   #FFFFFF
├── Ground:  #90EE90 (light green)
└── Buildings: Pastel variants
```

### 7.2 3D Scene Elements

- **Roads:** Dark gray with white lane markings
- **Intersections:** Four-way with crosswalks
- **Traffic Lights:** Simple pole-mounted, glowing active color
- **Vehicles:** Low-poly car shapes, bright colors
- **Buildings:** Simple boxes, pastel colors, varying heights

---

## 8. File Structure

```
traffic-simulation/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   ├── StatusBar.tsx
│   │   │   └── TimingsDisplay.tsx
│   │   │
│   │   └── scene/
│   │       ├── Scene.tsx
│   │       ├── Road.tsx
│   │       ├── Intersection.tsx
│   │       ├── TrafficLight.tsx
│   │       ├── Vehicle.tsx
│   │       ├── Building.tsx
│   │       └── Ground.tsx
│   │
│   ├── stores/
│   │   ├── vehicleStore.ts
│   │   ├── intersectionStore.ts
│   │   └── configStore.ts
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── trafficReporter.ts
│   │
│   ├── hooks/
│   │   ├── useSimulationLoop.ts
│   │   ├── useTrafficAPI.ts
│   │   └── useVehicleCounter.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── constants/
│       ├── colors.ts
│       └── physics.ts
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Week 1)

| Task | Description |
|------|-------------|
| Project setup | Vite + React + TypeScript + R3F |
| Basic 3D scene | Ground, roads, camera controls |
| Single intersection | Four traffic lights, basic visuals |
| Light cycling | Manual timer-based state changes |

**Deliverable:** Static intersection with cycling lights

---

### Phase 2: Vehicles (Week 2)

| Task | Description |
|------|-------------|
| Vehicle model | Simple 3D car shape |
| Spawning system | Add car button → spawn at lane |
| Movement logic | Forward motion, speed control |
| Light response | Stop at red, go on green |
| Queue behavior | Safe following distance |

**Deliverable:** Cars that respond to traffic lights

---

### Phase 3: API Integration (Week 3)

| Task | Description |
|------|-------------|
| Vehicle counter | Count cars per direction |
| API client | POST request every 10s |
| Response handler | Parse timing updates |
| Light updater | Apply new durations to cycles |
| Status display | Connection indicator, countdown |

**Deliverable:** Working frontend-backend communication

---

### Phase 4: Polish (Week 4)

| Task | Description |
|------|-------------|
| Settings panel | Configurable endpoint, interval |
| Multiple intersections | Support 1-4 intersections |
| Visual polish | Colors, animations, buildings |
| Error handling | Offline mode, retries |
| Testing | Unit tests, manual QA |

**Deliverable:** Production-ready application

---

## 10. Type Definitions

```typescript
// Request payload (Frontend → Backend)
interface TrafficUpdateRequest {
  timestamp: string;
  intersections: {
    [intersectionId: string]: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
}

// Response payload (Backend → Frontend)
interface TrafficUpdateResponse {
  intersections: {
    [intersectionId: string]: {
      north_south_green: number;  // seconds
      east_west_green: number;    // seconds
      yellow: number;             // seconds
    };
  };
}

// Internal vehicle state
interface Vehicle {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: number;
  speed: number;
  intersectionId: string;
  approach: 'north' | 'south' | 'east' | 'west';
  state: 'moving' | 'waiting' | 'crossing';
  color: string;
}

// Traffic light state
interface TrafficLight {
  id: string;
  intersectionId: string;
  direction: 'north_south' | 'east_west';
  state: 'red' | 'yellow' | 'green';
  greenDuration: number;
  yellowDuration: number;
  timeRemaining: number;
}

// Configuration
interface Config {
  apiEndpoint: string;
  updateIntervalSeconds: number;
  intersectionCount: number;
}
```

---

## Summary

| Aspect | Frontend Responsibility | Backend Responsibility |
|--------|------------------------|------------------------|
| Vehicle movement | ✓ Full control | — |
| Vehicle counting | ✓ Count per direction | — |
| Traffic light visuals | ✓ Render and animate | — |
| Light state changes | ✓ Timer-based cycling | — |
| Light duration calc | — | ✓ AI optimization |
| API timing | ✓ Send every ~10s | ✓ Respond with timings |

The frontend is a complete simulation. The backend is a simple stateless calculator that helps optimize the light timings based on current traffic load.

---

*Document Version: 2.0*  
*Last Updated: January 2025*