import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Item() {
  const router = useRouter();
  const { data: session } = useSession();
  const clubs = session?.clubs;

  useEffect(() => {
    const Page = async () => {
      router.push({
        pathname: "/club/[item]",
        query: { item: "exy" },
      });
    };

    Page();
  }, [clubs]);

  return null;
}

export default Item;
