import React, { createContext, useState, useEffect } from 'react'

export const ClubContext = createContext()

export const ClubProvider = ({ children }) => {
  const [club, setClub] = useState()

  const fetchClub = async () => {
    const response = await fetch('/api/useDatabase?type=club')
    const data = await response.json()
    setClub(data)
  }

  useEffect(() => {
    fetchClub()
  }, [])

  return (
    <ClubContext.Provider value={{ club, setClub }}>
      {children}
    </ClubContext.Provider>
  )
}
