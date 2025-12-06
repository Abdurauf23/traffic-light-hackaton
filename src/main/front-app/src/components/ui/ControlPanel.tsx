import { useState } from 'react';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useIntersectionStore } from '../../stores/intersectionStore';
import { Direction } from '../../types';

export function ControlPanel() {
  const [selectedIntersection, setSelectedIntersection] = useState('intersection_1');
  const [selectedDirection, setSelectedDirection] = useState<Direction>('north');

  const addVehicle = useVehicleStore((s) => s.addVehicle);
  const clearAll = useVehicleStore((s) => s.clearAll);
  const lights = useIntersectionStore((s) => s.getLightsByIntersection(selectedIntersection));

  const handleAddVehicle = () => {
    addVehicle(selectedIntersection, selectedDirection);
  };

  const nsLight = lights.find((l) => l.direction === 'north_south');
  const ewLight = lights.find((l) => l.direction === 'east_west');

  return (
    <div style={{
      width: '300px',
      padding: '1.5rem',
      background: 'white',
      borderLeft: '1px solid #e0e0e0',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <div>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#333' }}>Controls</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#555' }}>
            Intersection:
          </label>
          <select
            value={selectedIntersection}
            onChange={(e) => setSelectedIntersection(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="intersection_1">Intersection 1</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#555' }}>
            Lane:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {(['north', 'south', 'east', 'west'] as Direction[]).map((dir) => (
              <button
                key={dir}
                onClick={() => setSelectedDirection(dir)}
                style={{
                  padding: '0.5rem',
                  background: selectedDirection === dir ? '#667eea' : '#f5f5f5',
                  color: selectedDirection === dir ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: '0.875rem'
                }}
              >
                {dir[0]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddVehicle}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            marginBottom: '0.5rem'
          }}
        >
          + Add Car
        </button>

        <button
          onClick={clearAll}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem'
          }}
        >
          Clear All
        </button>
      </div>

      <div>
        <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem', color: '#333' }}>
          Current Timings
        </h3>
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
              North-South
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#333' }}>
              Green: {nsLight?.greenDuration || 30}s  Yellow: {nsLight?.yellowDuration || 5}s
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
              East-West
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#333' }}>
              Green: {ewLight?.greenDuration || 30}s  Yellow: {ewLight?.yellowDuration || 5}s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
