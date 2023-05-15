import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ClubContext } from "@/context/clubContext";

function Item() {
  const router = useRouter();
  const { club } = useContext(ClubContext);

  useEffect(() => {
    const Page = async () => {
      router.push({
        pathname: "/club/[item]",
        query: { item: "exy" },
      });
    };

    Page();
  }, [club]);

  return null;
}

export default Item;
