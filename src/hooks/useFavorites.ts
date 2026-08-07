"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "nevexa-favs";

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useFavorites() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(getFavorites());
  }, []);

  const toggle = (productId: string) => {
    setItems((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      saveFavorites(next);
      return next;
    });
  };

  const isFavorite = (productId: string) => items.includes(productId);

  return { items, toggle, isFavorite };
}
