import { useState, useEffect } from 'react';
import { useConfigStore } from '../../stores/configStore';

export function StatusBar() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const updateInterval = useConfigStore((s) => s.updateIntervalSeconds);
  const lastUpdateTimestamp = useConfigStore((s) => s.lastUpdateTimestamp);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const lastUpdate = Math.floor((currentTime - lastUpdateTimestamp) / 1000);
  const nextUpdate = Math.max(0, updateInterval - lastUpdate);

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '0.75rem 2rem',
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      gap: '2rem',
      fontSize: '0.875rem',
      color: '#666'
    }}>
      <div>
        <span style={{ color: '#10b981', marginRight: '0.5rem' }}>●</span>
        API: Connected
      </div>
      <div>
        Last Update: {lastUpdate}s ago
      </div>
      <div>
        Next Update: {nextUpdate}s
      </div>
    </div>
  );
}
