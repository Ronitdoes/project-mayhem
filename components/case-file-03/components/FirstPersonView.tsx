import React, { useMemo } from 'react';

interface Segment {
  dx: number;
  dy: number;
  points: string;
  type: 'wall' | 'front';
}

const SEGMENTS: Segment[] = [
  { dx: -1, dy: 0, points: "-1000,-1000 50,50 50,350 -1000,1400", type: 'wall' },
  { dx: 1, dy: 0, points: "350,50 1400,-1000 1400,1400 350,350", type: 'wall' },

  { dx: -1, dy: -1, points: "-250,50 50,50 50,350 -250,350", type: 'front' },
  { dx: 1, dy: -1, points: "350,50 650,50 650,350 350,350", type: 'front' },
  { dx: -1, dy: -1, points: "50,50 100,100 100,300 50,350", type: 'wall' },
  { dx: 1, dy: -1, points: "300,100 300,300 350,350 350,50", type: 'wall' },
  { dx: 0, dy: -1, points: "50,50 350,50 350,350 50,350", type: 'front' },

  { dx: -1, dy: -2, points: "-100,100 100,100 100,300 -100,300", type: 'front' },
  { dx: 1, dy: -2, points: "300,100 500,100 500,300 300,300", type: 'front' },
  { dx: -1, dy: -2, points: "100,100 150,150 150,250 100,300", type: 'wall' },
  { dx: 1, dy: -2, points: "300,100 250,150 250,250 300,300", type: 'wall' },
  { dx: 0, dy: -2, points: "100,100 300,100 300,300 100,300", type: 'front' },

  { dx: -1, dy: -3, points: "50,150 150,150 150,250 50,250", type: 'front' },
  { dx: 1, dy: -3, points: "250,150 350,150 350,250 250,250", type: 'front' },
  { dx: -1, dy: -3, points: "150,150 175,175 175,225 150,250", type: 'wall' },
  { dx: 1, dy: -3, points: "250,150 225,175 225,225 250,250", type: 'wall' },
  { dx: 0, dy: -3, points: "150,150 250,150 250,250 150,250", type: 'front' },

  { dx: -1, dy: -4, points: "125,175 175,175 175,225 125,225", type: 'front' },
  { dx: 1, dy: -4, points: "225,175 275,175 275,225 225,225", type: 'front' },
  { dx: -1, dy: -4, points: "175,175 187.5,187.5 187.5,212.5 175,225", type: 'wall' },
  { dx: 1, dy: -4, points: "225,175 212.5,187.5 212.5,212.5 225,225", type: 'wall' },
  { dx: 0, dy: -4, points: "175,175 225,175 225,225 175,225", type: 'front' }
];

function rotatePlayer(dx: number, dy: number, facing: number): [number, number] {
  let rotatedDx = dx;
  let rotatedDy = dy;
  for (let i = 0; i < facing; i++) {
    const temp = rotatedDx;
    rotatedDx = -rotatedDy;
    rotatedDy = temp;
  }
  return [rotatedDx, rotatedDy];
}

function getTorchCoords(dir: Segment): { tx: number, ty: number, isRight: boolean } | null {
  if (dir.type !== 'wall') return null;
  
  if (dir.dx === -1 && dir.dy === -1) return { tx: 75, ty: 180, isRight: false };
  if (dir.dx === 1 && dir.dy === -1) return { tx: 325, ty: 180, isRight: true };
  
  if (dir.dx === -1 && dir.dy === -2) return { tx: 125, ty: 185, isRight: false };
  if (dir.dx === 1 && dir.dy === -2) return { tx: 275, ty: 185, isRight: true };
  
  if (dir.dx === -1 && dir.dy === -3) return { tx: 162.5, ty: 190, isRight: false };
  if (dir.dx === 1 && dir.dy === -3) return { tx: 237.5, ty: 190, isRight: true };
  
  return null;
}

interface Player {
  x: number;
  y: number;
  facing: number;
}

interface Anomaly {
  id: string;
  solved: boolean;
  puzzles: any[];
}

interface FirstPersonViewProps {
  player: Player;
  anomalies: Record<string, Anomaly>;
  allSolved: boolean;
  currentMap: number[][];
}

export function FirstPersonView({ player, anomalies, allSolved, currentMap }: FirstPersonViewProps) {
  const renderedPolygons = useMemo(() => {
    const polygons: React.ReactNode[] = [];
    const sortedSegments = [...SEGMENTS].sort((a, b) => {
      if (a.dy !== b.dy) {
        return a.dy - b.dy; 
      }
      if (a.type === 'wall' && b.type !== 'wall') return -1;
      if (a.type !== 'wall' && b.type === 'wall') return 1;
      return 0;
    });

    if (!currentMap) return null;

    for (let dir of sortedSegments) {
      let [dx, dy] = rotatePlayer(dir.dx, dir.dy, player.facing);
      let nx = player.x + dx;
      let ny = player.y + dy;

      if (ny >= 0 && ny < currentMap.length && nx >= 0 && nx < currentMap[0].length) {
        const tile = currentMap[ny][nx];

        if (tile === 1) {
          polygons.push(
            <polygon
              key={`wall-${nx}-${ny}-${dir.dx}-${dir.dy}-${dir.type}`}
              points={dir.points}
              fill={dir.type === 'front' ? "url(#wall-front-texture)" : "url(#wall-side-texture)"}
              stroke="var(--wall-stroke)"
              strokeWidth="0.5"
            />
          );

          // Add animating wall torch flames along the corridors!
          const torch = getTorchCoords(dir);
          if (torch) {
            const { tx, ty, isRight } = torch;
            const sizeMultiplier = dir.dy === -1 ? 1 : dir.dy === -2 ? 0.6 : 0.35;
            const w = 5 * sizeMultiplier;
            const h = 18 * sizeMultiplier;

            polygons.push(
              <g key={`torch-${nx}-${ny}-${dir.dx}-${dir.dy}`}>
                {/* Torch holder Bracket */}
                <line 
                  x1={tx} y1={ty} 
                  x2={tx + (isRight ? 10 : -10) * sizeMultiplier} y2={ty + 15 * sizeMultiplier} 
                  stroke="#33241d" strokeWidth={2.5 * sizeMultiplier} 
                />
                {/* Ambient glow backing */}
                <circle cx={tx} cy={ty - 8 * sizeMultiplier} r={16 * sizeMultiplier} fill="url(#torch-glow-gradient)" opacity="0.4" />
                
                {/* Flickering flame path */}
                <path 
                  d={`M ${tx - w/2} ${ty} Q ${tx - w} ${ty - h/2} ${tx} ${ty - h} Q ${tx + w} ${ty - h/2} ${tx + w/2} ${ty} Z`} 
                  fill="url(#torch-flame-gradient)"
                >
                  <animate 
                    attributeName="d" 
                    values={`
                      M ${tx - w/2} ${ty} Q ${tx - w * 1.3} ${ty - h/2} ${tx - w * 0.15} ${ty - h * 1.05} Q ${tx + w * 0.8} ${ty - h/2} ${tx + w/2} ${ty} Z;
                      M ${tx - w/2} ${ty} Q ${tx - w * 0.75} ${ty - h/2} ${tx + w * 0.2} ${ty - h * 0.95} Q ${tx + w * 1.3} ${ty - h/2} ${tx + w/2} ${ty} Z;
                      M ${tx - w/2} ${ty} Q ${tx - w * 1.3} ${ty - h/2} ${tx - w * 0.15} ${ty - h * 1.05} Q ${tx + w * 0.8} ${ty - h/2} ${tx + w/2} ${ty} Z
                    `} 
                    dur={`${0.35 + Math.random() * 0.25}s`} 
                    repeatCount="indefinite" 
                  />
                </path>
              </g>
            );
          }
        } else if (tile === 2 && dir.type === 'front') {
          const anomalyState = anomalies[`${ny},${nx}`];
          const isSolved = anomalyState?.solved;

          const pts = dir.points.split(' ').map(p => p.split(',').map(Number));
          const cx = (pts[0][0] + pts[1][0]) / 2;
          const cy = (pts[0][1] + pts[3][1]) / 2;
          const r = (pts[1][0] - pts[0][0]) * 0.25;

          const color = isSolved ? "var(--color-success)" : "var(--color-accent)";

          polygons.push(
            <g key={`anomaly-${nx}-${ny}-${dir.dx}-${dir.dy}`}>
              {/* Pulsating core */}
              <circle cx={cx} cy={cy} r={r} fill="#050202" stroke={color} strokeWidth="3" />
              <circle cx={cx} cy={cy} r={r*0.7} fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 2">
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r={r*0.3} fill={color}>
                <animate attributeName="r" values={`${r*0.25};${r*0.35};${r*0.25}`} dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Reticle lines */}
              <path d={`M ${cx - r*1.3} ${cy} L ${cx + r*1.3} ${cy} M ${cx} ${cy - r*1.3} L ${cx} ${cy + r*1.3}`} stroke={color} strokeWidth="1.5" opacity="0.4" />
            </g>
          );
        } else if (tile === 3 && dir.type === 'front') {
          const pts = dir.points.split(' ').map(p => p.split(',').map(Number));
          const x0 = pts[0][0];
          const y0 = pts[0][1];
          const x1 = pts[1][0];
          const y2 = pts[2][1];

          polygons.push(
            <g key={`exit-${nx}-${ny}-${dir.dx}-${dir.dy}`}>
              <polygon
                points={dir.points}
                fill="url(#wall-front-texture)"
              />
              {/* Flame exit portal portal */}
              <rect x={x0 + (x1-x0)*0.25} y={y0 + (y2-y0)*0.15} width={(x1-x0)*0.5} height={(y2-y0)*0.85} fill="url(#portal-glow)" stroke={allSolved ? "var(--color-success)" : "var(--wall-stroke)"} strokeWidth="3" />
              {!allSolved ? (
                <text x={(x0+x1)/2} y={(y0+y2)/2} fill="var(--color-accent)" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">
                  SEALED
                </text>
              ) : (
                <g>
                  {/* Floating dark yellow/gold flame particles inside portal */}
                  <circle cx={(x0+x1)/2} cy={(y0+y2)/2} r="4" fill="#e6b800">
                    <animate attributeName="cy" values={`${(y0+y2)/2 + 10};${(y0+y2)/2 - 20}`} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={(x0+x1)/2 - 8} cy={(y0+y2)/2 + 5} r="3" fill="#ffd700">
                    <animate attributeName="cy" values={`${(y0+y2)/2 + 15};${(y0+y2)/2 - 15}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={(x0+x1)/2 + 8} cy={(y0+y2)/2 + 8} r="3.5" fill="#ffea00">
                    <animate attributeName="cy" values={`${(y0+y2)/2 + 18};${(y0+y2)/2 - 12}`} dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
            </g>
          );
        } else if (tile === 4 && dir.type === 'front') {
          // Dying Flame Portal Shrine (Level 1)
          const pts = dir.points.split(' ').map(p => p.split(',').map(Number));
          const cx = (pts[0][0] + pts[1][0]) / 2;
          const cy = (pts[0][1] + pts[3][1]) / 2;
          const r = (pts[1][0] - pts[0][0]) * 0.35;

          polygons.push(
            <g key={`shrine-${nx}-${ny}-${dir.dx}-${dir.dy}`}>
              {/* Swirling energy fields */}
              <circle cx={cx} cy={cy} r={r * 1.6} fill="rgba(212, 175, 55, 0.15)" stroke="none">
                <animate attributeName="r" values={`${r*1.3};${r*1.8};${r*1.3}`} dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r={r * 1.1} fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" strokeDasharray="3 3">
                <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="4s" repeatCount="indefinite" />
              </circle>
              {/* Monolith geometric core */}
              <polygon points={`${cx},${cy - r} ${cx + r*0.7},${cy} ${cx},${cy + r} ${cx - r*0.7},${cy}`} fill="#0e0707" stroke="var(--color-accent)" strokeWidth="2" />
              {/* Inner floating fire jewel */}
              <polygon points={`${cx},${cy - r*0.45} ${cx + r*0.3},${cy} ${cx},${cy + r*0.45} ${cx - r*0.3},${cy}`} fill="url(#portal-glow)">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
              </polygon>
            </g>
          );
        }
      }
    }
    return polygons;
  }, [player, anomalies, allSolved, currentMap]);

  return (
    <div className="viewport-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--color-bg)', width: '100%', height: '100%' }}>
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={{ background: 'var(--sky-color)', border: '4px solid var(--wall-stroke)', maxHeight: '100%', maxWidth: '100%' }}>
        <defs>
          {/* Procedural front brick wall texture */}
          <pattern id="wall-front-texture" patternUnits="userSpaceOnUse" width="60" height="40">
            <rect width="60" height="40" fill="#1b160a" />
            <path d="M 0 0 L 60 0 M 0 20 L 60 20 M 30 0 L 30 20 M 0 20 L 0 40 M 60 20 L 60 40 M 45 20 L 45 40 M 15 20 L 15 40" stroke="#3b2e12" strokeWidth="1.5" />
            {/* Magma cracks - now glowing gold/yellow */}
            <path d="M 5 5 Q 12 12 8 18 T 18 35" fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
            <path d="M 35 15 Q 40 8 48 12 T 55 38" fill="none" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="0.8" />
          </pattern>
          {/* Procedural side brick wall texture (darker) */}
          <pattern id="wall-side-texture" patternUnits="userSpaceOnUse" width="60" height="40">
            <rect width="60" height="40" fill="#0f0d05" />
            <path d="M 0 0 L 60 0 M 0 20 L 60 20 M 30 0 L 30 20 M 0 20 L 0 40 M 60 20 L 60 40 M 45 20 L 45 40 M 15 20 L 15 40" stroke="#242009" strokeWidth="1.5" />
            <path d="M 5 5 Q 12 12 8 18 T 18 35" fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="0.8" />
          </pattern>
          {/* Glowing fire portal color - Gold/Yellow gradient */}
          <linearGradient id="portal-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffea00" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1a1402" stopOpacity="1" />
          </linearGradient>
          {/* Torch flame and glow gradients */}
          <linearGradient id="torch-flame-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#cc9900" />
            <stop offset="60%" stopColor="#ffea00" />
            <stop offset="100%" stopColor="#fffae6" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="torch-glow-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#cc9900" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter for lava */}
          <filter id="lava-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Turbulence filter for molten flow animation */}
          <filter id="lava-turbulence-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.08" numOctaves="2" result="noise">
              <animate attributeName="seed" values="1;100" dur="25s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Glowing yellow/gold magma river color */}
          <linearGradient id="magma-river-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffea00" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#806000" />
          </linearGradient>

          {/* Horizon shadow depth gradient for the floor */}
          <linearGradient id="floor-horizon-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020101" stopOpacity="1" />
            <stop offset="35%" stopColor="#020101" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020101" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base Floor (Basalt rock background) */}
        <polygon points="0,200 400,200 400,400 0,400" fill="#0d0806" />

        {/* Magma rivers flowing in perspective (wiggling/boiling with turbulence filter!) */}
        <g filter="url(#lava-turbulence-filter)" opacity="0.95">
          {/* Left flowing river */}
          <path d="M 200,200 Q 165,270 95,400 L 165,400 Q 200,270 206,200 Z" fill="url(#magma-river-grad)" filter="url(#lava-glow)" />
          {/* Right flowing river */}
          <path d="M 200,200 Q 235,270 305,400 L 235,400 Q 200,270 194,200 Z" fill="url(#magma-river-grad)" filter="url(#lava-glow)" />
          {/* Middle branch river */}
          <path d="M 200,200 Q 192,260 185,320 Q 215,360 200,400 L 210,400 Q 225,360 195,320 Q 202,260 200,200 Z" fill="url(#magma-river-grad)" filter="url(#lava-glow)" />
        </g>

        {/* Trapezoidal Basalt crust plates in 3D perspective overlay */}
        <g stroke="#1a140a" strokeWidth="1.2">
          {/* Row 1 (Near bottom - Y=330 to 400) - largest plates */}
          <polygon points="0,380 80,380 60,330 0,330" fill="#1d1713" />
          <polygon points="110,390 200,390 185,330 120,330" fill="#181310" />
          <polygon points="230,390 295,390 280,330 215,330" fill="#1b1612" />
          <polygon points="325,380 400,380 400,330 310,330" fill="#15110f" />

          {/* Row 2 (Mid-bottom - Y=280 to 330) */}
          <polygon points="0,325 45,325 35,290 0,290" fill="#191512" />
          <polygon points="60,325 125,325 115,290 70,290" fill="#15120f" />
          <polygon points="145,325 195,325 185,290 145,290" fill="#1b1612" />
          <polygon points="215,325 270,325 260,290 215,290" fill="#13100d" />
          <polygon points="295,325 360,325 370,290 305,290" fill="#171411" />

          {/* Row 3 (Mid-horizon - Y=240 to 285) */}
          <polygon points="10,285 55,285 47,255 15,255" fill="#1a1613" />
          <polygon points="70,285 115,285 108,255 75,255" fill="#14110e" />
          <polygon points="130,285 170,285 165,255 132,255" fill="#171411" />
          <polygon points="182,285 225,285 220,255 187,255" fill="#191613" />
          <polygon points="240,285 285,285 278,255 245,255" fill="#15120f" />
          <polygon points="300,285 350,285 360,255 310,255" fill="#1c1815" />

          {/* Row 4 (Far horizon - Y=210 to 240) - smallest plates */}
          <polygon points="25,250 60,250 55,225 32,225" fill="#14110f" />
          <polygon points="75,250 105,250 100,225 78,225" fill="#171411" />
          <polygon points="120,250 150,250 146,225 125,225" fill="#120f0d" />
          <polygon points="160,250 190,250 186,225 165,225" fill="#191613" />
          <polygon points="200,250 230,250 226,225 205,225" fill="#151210" />
          <polygon points="245,250 275,250 270,225 250,225" fill="#13100e" />
          <polygon points="290,250 325,250 330,225 298,225" fill="#1b1815" />
        </g>

        {/* Horizon shadow depth overlay on floor */}
        <polygon points="0,200 400,200 400,400 0,400" fill="url(#floor-horizon-gradient)" opacity="0.9" pointerEvents="none" />
        
        {/* Faint perspective lines */}
        <line x1="50" y1="50" x2="50" y2="350" stroke="var(--wall-stroke)" strokeWidth="1.5" opacity="0.25" />
        <line x1="350" y1="50" x2="350" y2="350" stroke="var(--wall-stroke)" strokeWidth="1.5" opacity="0.25" />
        <line x1="50" y1="50" x2="350" y2="50" stroke="var(--wall-stroke)" strokeWidth="1.5" opacity="0.25" />
        <line x1="50" y1="350" x2="350" y2="350" stroke="var(--wall-stroke)" strokeWidth="1.5" opacity="0.25" />

        {renderedPolygons}
      </svg>
    </div>
  );
}
