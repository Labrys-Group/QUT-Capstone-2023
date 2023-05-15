import React, { createContext, useState, useEffect, ReactNode } from "react";

export type DataObject = {
  id: string | undefined;
  name: string;
  title: string | undefined;
  abi: string | undefined;
  address: string | undefined;
  price: string | undefined;
  description: string | undefined;
};

interface IClubContext {
  clubs: DataObject[] | undefined;
}

const fetchClubsfromDb = async () => {
  const response = await fetch("/api/useDatabase?type=club");
  const data = await response.json();
  console.log("data", data);
  return data;
};

export const ClubContext = createContext<IClubContext>({} as IClubContext);

export const ClubProvider = ({ children }: { children: ReactNode }) => {
  const [clubs, setClubs] = useState<DataObject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchClubsfromDb();
      setClubs(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTotalSupply = async () => {
      const newData = await fetchClubsfromDb();
    };
  }, []);

  return (
    <ClubContext.Provider value={{ clubs }}>{children}</ClubContext.Provider>
  );
};
