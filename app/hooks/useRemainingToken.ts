import { ClubContext } from "@/context/clubContext";
import { useState, useEffect, useContext } from "react";

function useTokenRemaining(itemName: string | string[]) {
  const { clubs } = useContext(ClubContext);

  const [remainingToken, setRemainingToken] = useState<number | undefined>();

  useEffect(() => {
    const fetchTokenRemaining = async () => {
      if (clubs !== undefined) {
        const clubIndex: number = clubs.findIndex(
          (obj) => obj.name === itemName
        );
        if (clubIndex !== -1) {
          const contract = clubs[clubIndex].name;
          const abi = clubs[clubIndex].abi;
          const res = await fetch("../api/getBalance", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ contract, abi }),
          });
          const data = await res.json();
          setRemainingToken(200 - data.totalSupply);
        }
      }
    };
    fetchTokenRemaining();
  }, [itemName, clubs]);

  return remainingToken;
}

export default useTokenRemaining;
