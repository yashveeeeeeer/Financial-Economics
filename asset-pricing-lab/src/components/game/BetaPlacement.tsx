import { useState, useRef, useCallback } from 'react';
import type { Asset, AxisConfig } from '../../types/index.ts';
import Button from '../ui/Button.tsx';

interface BetaPlacementProps {
  assets: Asset[];
  xAxis: AxisConfig;
  yAxis: AxisConfig;
  onSubmit: (placements: { assetId: string; x: number; y: number }[]) => void;
}

export default function BetaPlacement({
  assets,
  xAxis,
  yAxis,
  onSubmit,
}: BetaPlacementProps) {
  const [placements, setPlacements] = useState<Record<string, { x: number; y: number }>>(
    () => {
      const init: Record<string, { x: number; y: number }> = {};
      assets.forEach((a, i) => {
        init[a.id] = {
          x: (xAxis.range[0] + xAxis.range[1]) / 2 + (i - 2) * 0.3,
          y: (yAxis.range[0] + yAxis.range[1]) / 2 + (i - 2) * 0.3,
        };
      });
      return init;
    }
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 400;
  const H = 300;
  const PAD = 40;

  const toSvgX = (val: number) =>
    PAD + ((val - xAxis.range[0]) / (xAxis.range[1] - xAxis.range[0])) * (W - 2 * PAD);
  const toSvgY = (val: number) =>
    H - PAD - ((val - yAxis.range[0]) / (yAxis.range[1] - yAxis.range[0])) * (H - 2 * PAD);
  const fromSvgX = (px: number) =>
    xAxis.range[0] + ((px - PAD) / (W - 2 * PAD)) * (xAxis.range[1] - xAxis.range[0]);
  const fromSvgY = (py: number) =>
    yAxis.range[0] + ((H - PAD - py) / (H - 2 * PAD)) * (yAxis.range[1] - yAxis.range[0]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!dragging || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const x = Math.max(xAxis.range[0], Math.min(xAxis.range[1], fromSvgX(px)));
      const y = Math.max(yAxis.range[0], Math.min(yAxis.range[1], fromSvgY(py)));
      setPlacements((prev) => ({ ...prev, [dragging]: { x, y } }));
    },
    [dragging, xAxis.range, yAxis.range]
  );

  const handleSubmit = () => {
    const result = assets.map((a) => ({
      assetId: a.id,
      x: Number(placements[a.id].x.toFixed(2)),
      y: Number(placements[a.id].y.toFixed(2)),
    }));
    onSubmit(result);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-secondary">
        Drag each asset to where you think it belongs on the beta map.
      </p>

      <div className="flex justify-center">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-xl bg-bg-primary rounded-lg border border-border"
          onMouseMove={handleMouseMove}
          onMouseUp={() => setDragging(null)}
          onMouseLeave={() => setDragging(null)}
        >
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const val = xAxis.range[0] + (i / 5) * (xAxis.range[1] - xAxis.range[0]);
            const px = toSvgX(val);
            return (
              <g key={`vg-${i}`}>
                <line x1={px} y1={PAD} x2={px} y2={H - PAD} stroke="#334155" strokeWidth={0.5} />
                <text x={px} y={H - 10} textAnchor="middle" fill="#64748B" fontSize={9}>
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const val = yAxis.range[0] + (i / 5) * (yAxis.range[1] - yAxis.range[0]);
            const py = toSvgY(val);
            return (
              <g key={`hg-${i}`}>
                <line x1={PAD} y1={py} x2={W - PAD} y2={py} stroke="#334155" strokeWidth={0.5} />
                <text x={10} y={py + 3} fill="#64748B" fontSize={9}>
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Axis labels */}
          <text x={W / 2} y={H - 0} textAnchor="middle" fill="#94A3B8" fontSize={10}>
            {xAxis.label}
          </text>
          <text
            x={5}
            y={H / 2}
            textAnchor="middle"
            fill="#94A3B8"
            fontSize={10}
            transform={`rotate(-90, 5, ${H / 2})`}
          >
            {yAxis.label}
          </text>

          {/* Zero lines */}
          <line
            x1={toSvgX(0)}
            y1={PAD}
            x2={toSvgX(0)}
            y2={H - PAD}
            stroke="#64748B"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <line
            x1={PAD}
            y1={toSvgY(0)}
            x2={W - PAD}
            y2={toSvgY(0)}
            stroke="#64748B"
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* Asset circles */}
          {assets.map((asset) => {
            const pos = placements[asset.id];
            if (!pos) return null;
            const cx = toSvgX(pos.x);
            const cy = toSvgY(pos.y);
            const isDragging = dragging === asset.id;
            return (
              <g
                key={asset.id}
                onMouseDown={() => setDragging(asset.id)}
                style={{ cursor: 'grab' }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isDragging ? 18 : 15}
                  fill={isDragging ? '#3B82F640' : '#1E293B'}
                  stroke={isDragging ? '#3B82F6' : '#64748B'}
                  strokeWidth={isDragging ? 2 : 1}
                />
                <text
                  x={cx}
                  y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={14}
                >
                  {asset.icon}
                </text>
                <text
                  x={cx}
                  y={cy + 24}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize={7}
                >
                  {asset.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          Submit Placement →
        </Button>
      </div>
    </div>
  );
}
