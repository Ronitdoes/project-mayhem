"use client";

import { useState, useEffect } from "react";
import TypewriterText from "../TypewriterText";

type Direction = 0 | 1 | 2 | 3; // 0: Top, 1: Right, 2: Bottom, 3: Left
type TileType = 'straight' | 'corner' | 'start' | 'end';

interface Tile {
  id: string;
  x: number;
  y: number;
  type: TileType;
  rotation: number;
  powered: boolean;
  isStart: boolean;
  isEnd: boolean;
  baseConnections: boolean[];
}

const getConnections = (tile: Tile): boolean[] => {
  if (tile.isStart || tile.isEnd) return tile.baseConnections;
  
  const rotated = [false, false, false, false];
  for (let i = 0; i < 4; i++) {
    rotated[(i + tile.rotation) % 4] = tile.baseConnections[i];
  }
  return rotated;
}

const updatePower = (currentGrid: Tile[][], size: number): boolean => {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      currentGrid[y][x].powered = false;
    }
  }
  
  const queue: Tile[] = [currentGrid[0][0]];
  currentGrid[0][0].powered = true;
  let reachedEnd = false;
  
  while (queue.length > 0) {
    const tile = queue.shift()!;
    if (tile.isEnd) reachedEnd = true;
    
    const conns = getConnections(tile);
    const neighbors = [
      { dx: 0, dy: -1, dir: 0, opp: 2 },
      { dx: 1, dy: 0, dir: 1, opp: 3 },
      { dx: 0, dy: 1, dir: 2, opp: 0 },
      { dx: -1, dy: 0, dir: 3, opp: 1 }
    ];
    
    for (const n of neighbors) {
      if (conns[n.dir]) {
        const nx = tile.x + n.dx;
        const ny = tile.y + n.dy;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
          const neighbor = currentGrid[ny][nx];
          const neighborConns = getConnections(neighbor);
          if (neighborConns[n.opp] && !neighbor.powered) {
            neighbor.powered = true;
            queue.push(neighbor);
          }
        }
      }
    }
  }
  
  return reachedEnd;
}

const generateGrid = (size: number): Tile[][] => {
  const directions = [
    { dx: 0, dy: -1, dir: 0 },
    { dx: 1, dy: 0, dir: 1 },
    { dx: 0, dy: 1, dir: 2 },
    { dx: -1, dy: 0, dir: 3 }
  ];
  
  const edges: { [key: string]: boolean[] } = {};
  for(let y=0; y<size; y++) {
    for(let x=0; x<size; x++) {
      edges[`${x},${y}`] = [false, false, false, false];
    }
  }

  let finalPath: {x: number, y: number}[] = [];
  let attempts = 0;
  
  while (finalPath.length === 0 && attempts < 1000) {
    attempts++;
    let px = 0, py = 0;
    const path = [{x: 0, y: 0}];
    const visited = new Set(['0,0']);
    let trapped = false;
    
    while (px !== size - 1 || py !== size - 1) {
      const dirs = [
        {dx: 1, dy: 0, weight: 3},
        {dx: 0, dy: 1, weight: 3},
        {dx: -1, dy: 0, weight: 1},
        {dx: 0, dy: -1, weight: 1}
      ];
      
      const validDirs = dirs.filter(d => {
        const nx = px + d.dx;
        const ny = py + d.dy;
        return nx >= 0 && nx < size && ny >= 0 && ny < size && !visited.has(`${nx},${ny}`);
      });
      
      if (validDirs.length === 0) {
        trapped = true;
        break;
      }
      
      const totalWeight = validDirs.reduce((sum, d) => sum + d.weight, 0);
      let r = Math.random() * totalWeight;
      let choice = validDirs[0];
      for (const d of validDirs) {
        r -= d.weight;
        if (r <= 0) {
          choice = d;
          break;
        }
      }
      
      px += choice.dx;
      py += choice.dy;
      path.push({x: px, y: py});
      visited.add(`${px},${py}`);
    }
    
    if (!trapped) {
      finalPath = path;
    }
  }

  // Fallback to monotonic if somehow failed
  if (finalPath.length === 0) {
    let px = 0, py = 0;
    finalPath.push({x: px, y: py});
    while (px !== size - 1 || py !== size - 1) {
      const options = [];
      if (px < size - 1) options.push({dx: 1, dy: 0});
      if (py < size - 1) options.push({dx: 0, dy: 1});
      const choice = options[Math.floor(Math.random() * options.length)];
      px += choice.dx;
      py += choice.dy;
      finalPath.push({x: px, y: py});
    }
  }

  for (let i = 0; i < finalPath.length; i++) {
    const current = finalPath[i];
    if (i > 0) {
      const prev = finalPath[i - 1];
      if (current.x > prev.x) { edges[`${prev.x},${prev.y}`][1] = true; edges[`${current.x},${current.y}`][3] = true; }
      else if (current.x < prev.x) { edges[`${prev.x},${prev.y}`][3] = true; edges[`${current.x},${current.y}`][1] = true; }
      else if (current.y > prev.y) { edges[`${prev.x},${prev.y}`][2] = true; edges[`${current.x},${current.y}`][0] = true; }
      else if (current.y < prev.y) { edges[`${prev.x},${prev.y}`][0] = true; edges[`${current.x},${current.y}`][2] = true; }
    }
  }

  const grid: Tile[][] = [];
  for (let y = 0; y < size; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < size; x++) {
      const isPath = finalPath.some(p => p.x === x && p.y === y);
      const conn = edges[`${x},${y}`];
      
      let type: TileType = 'straight';
      let baseConnections = [false, false, false, false];
      
      if (x === 0 && y === 0) {
        type = 'start';
        baseConnections = [...conn]; 
      } else if (x === size - 1 && y === size - 1) {
        type = 'end';
        baseConnections = [...conn];
      } else if (isPath) {
        if (conn[0] && conn[2]) { type = 'straight'; baseConnections = [true, false, true, false]; }
        else if (conn[1] && conn[3]) { type = 'straight'; baseConnections = [true, false, true, false]; }
        else if (conn[0] && conn[1]) { type = 'corner'; baseConnections = [true, true, false, false]; }
        else if (conn[1] && conn[2]) { type = 'corner'; baseConnections = [true, true, false, false]; }
        else if (conn[2] && conn[3]) { type = 'corner'; baseConnections = [true, true, false, false]; }
        else if (conn[3] && conn[0]) { type = 'corner'; baseConnections = [true, true, false, false]; }
      } else {
        type = Math.random() > 0.5 ? 'straight' : 'corner';
        baseConnections = type === 'straight' ? [true, false, true, false] : [true, true, false, false];
      }
      
      const rotation = Math.floor(Math.random() * 4);
      
      row.push({
        id: `${x},${y}`,
        x, y, type,
        rotation,
        powered: false,
        isStart: x === 0 && y === 0,
        isEnd: x === size - 1 && y === size - 1,
        baseConnections
      });
    }
    grid.push(row);
  }
  return grid;
}

const TileView = ({ tile, size, onClick }: { tile: Tile, size: number, onClick: () => void }) => {
  const color = tile.powered ? 'var(--text-primary)' : '#444';
  const bg = tile.powered ? 'rgba(0,255,255,0.05)' : 'rgba(255,255,255,0.02)';
  const strokeW = tile.isStart || tile.isEnd ? 40 : 30;
  
  let content;
  if (tile.isStart || tile.isEnd) {
    content = (
       <svg width="100%" height="100%" viewBox="0 0 100 100">
         {tile.isStart ? (
           <circle cx="50" cy="50" r="25" fill={color} />
         ) : (
           <rect x="25" y="25" width="50" height="50" fill={color} />
         )}
         {tile.baseConnections[0] && <rect x={50 - strokeW/2} y="0" width={strokeW} height="50" fill={color} />}
         {tile.baseConnections[1] && <rect x="50" y={50 - strokeW/2} width="50" height={strokeW} fill={color} />}
         {tile.baseConnections[2] && <rect x={50 - strokeW/2} y="50" width={strokeW} height="50" fill={color} />}
         {tile.baseConnections[3] && <rect x="0" y={50 - strokeW/2} width="50" height={strokeW} fill={color} />}
       </svg>
    )
  } else {
    const rot = tile.rotation * 90;
    content = (
       <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: `rotate(${rot}deg)`, transition: 'transform 0.15s ease' }}>
         {tile.type === 'straight' && (
           <rect x={50 - strokeW/2} y="0" width={strokeW} height="100" fill={color} />
         )}
         {tile.type === 'corner' && (
           <>
             <rect x={50 - strokeW/2} y="0" width={strokeW} height={50 + strokeW/2} fill={color} />
             <rect x={50 - strokeW/2} y={50 - strokeW/2} width={50 + strokeW/2} height={strokeW} fill={color} />
           </>
         )}
       </svg>
    )
  }
  
  return (
    <div 
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: bg,
        cursor: tile.isStart || tile.isEnd ? 'default' : 'pointer',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
    >
      {content}
    </div>
  )
}

export default function Stage6({ onComplete, onLogRecovered }: { onComplete: () => void, onLogRecovered: (id: string, text: string) => void }) {
  const levels = [10, 20];
  const [levelIdx, setLevelIdx] = useState(0);
  const size = levels[levelIdx];
  
  const [grid, setGrid] = useState<Tile[][]>([]);
  const [completed, setCompleted] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const newGrid = generateGrid(size);
    updatePower(newGrid, size);
    setGrid(newGrid);
  }, [size]);

  const handleTileClick = (x: number, y: number) => {
    if (success || completed) return;
    
    setGrid(prev => {
      const newGrid = prev.map(row => [...row]);
      const tile = { ...newGrid[y][x] };
      
      if (tile.isStart || tile.isEnd) return prev;
      
      tile.rotation = (tile.rotation + 1) % 4;
      newGrid[y][x] = tile;
      
      const reached = updatePower(newGrid, size);
      if (reached) {
        setTimeout(() => setCompleted(true), 10);
      }
      
      return newGrid;
    });
  };

  useEffect(() => {
    if (completed) {
      if (levelIdx < 1) {
        const t = setTimeout(() => {
          setLevelIdx(l => l + 1);
          setCompleted(false);
        }, 1500);
        return () => clearTimeout(t);
      } else {
        setSuccess(true);
        const t = setTimeout(() => {
          onLogRecovered("log-stage6", "Data flows where logic dictates. The network is restored.");
          onComplete();
        }, 3000);
        return () => clearTimeout(t);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, levelIdx]);

  if (grid.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "1rem" }}>
      <div style={{ minHeight: "40px", color: "var(--text-amber)" }}>
        <TypewriterText text={`Route the signal to the endpoint. Click to rotate cells. GRID ${levelIdx + 1}/2 (${size}x${size})`} delay={30} />
      </div>

      <div style={{ 
        flex: 1, 
        position: "relative", 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: 0,
        minWidth: 0
      }}>
        
        {success && (
          <div className="glitch" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "2rem", color: "var(--text-primary)", background: "var(--bg-color)", padding: "1rem", border: "2px solid var(--text-primary)", zIndex: 20 }}>
            NETWORK RESTORED
          </div>
        )}
        
        {completed && !success && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "2rem", color: "var(--text-primary)", background: "rgba(0,0,0,0.8)", padding: "1rem", border: "2px solid var(--text-primary)", zIndex: 20 }}>
            GRID SECURED
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${size}, 1fr)`, 
          gridTemplateRows: `repeat(${size}, 1fr)`, 
          gap: size >= 25 ? '0px' : '1px', 
          background: '#111',
          width: 'min(100%, 65vh, 600px)',
          height: 'min(100%, 65vh, 600px)',
          margin: '0 auto',
          border: '2px solid var(--text-muted)'
        }}>
          {grid.map(row => row.map(tile => (
            <TileView key={tile.id} tile={tile} size={size} onClick={() => handleTileClick(tile.x, tile.y)} />
          )))}
        </div>
        
      </div>
    </div>
  );
}
