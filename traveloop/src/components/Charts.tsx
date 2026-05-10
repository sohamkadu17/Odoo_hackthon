import React from 'react'

interface PieChartProps {
  data: { label: string; value: number; color: string }[]
  size?: number
}

export function PieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100
          const angle = (percentage / 100) * 360
          const startAngle = index === 0 ? -90 : data.slice(0, index).reduce((sum, prevItem) => sum + prevItem.value, 0) * 360 / total - 90
          const endAngle = startAngle + angle
          
          const largeArcFlag = angle > 180 ? 1 : 0
          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
          
          return (
            <g key={item.label}>
              <path
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
              />
            </g>
          )
        })}
      </svg>
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 font-medium">{item.label}</span>
            <span className="text-gray-500">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  )
}
