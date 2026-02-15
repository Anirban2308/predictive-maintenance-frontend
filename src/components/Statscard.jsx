import React from 'react'

const Statscard = ({ icon: Icon, title, value, description, colorClass }) => {
  return (
    <div className={`p-6 h-48 w-72 rounded-lg ${colorClass} text-white shadow-xl`}>
      <div className="flex items-center justify-between">
        {Icon && <Icon className="w-8 h-8" />} 
        <h3 className="text-sm font-semibold uppercase opacity-75">{title}</h3>
      </div>
      <p className="text-4xl font-bold mt-2">{value}</p>
      <p className="text-sm opacity-90 mt-1">{description}</p>
    </div>
  )
}

export default Statscard