import React, { createContext, useState, useEffect, ReactNode } from 'react'

export type DataObject = {
  id: string | undefined
  name: string
  title: string | undefined
  abi: string | undefined
  address: string | undefined
  price: string | undefined
  description: string | undefined
}

interface IClubContext {
  club: DataObject[] | undefined
}

export const ClubContext = createContext<IClubContext>({} as IClubContext)

export const ClubProvider = ({ children }: { children: ReactNode }) => {
  const [club, setClub] = useState<DataObject[]>([])

  const fetchClub = async () => {
    const response = await fetch('/api/useDatabase?type=club')
    const data = await response.json()
    setClub(data)
  }

  useEffect(() => {
    fetchClub()
  }, [])

  return (
    <ClubContext.Provider value={{ club }}>{children}</ClubContext.Provider>
  )
}
