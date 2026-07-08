"use client";

import { mockCmsPages } from "@/data/mockCmsPages";

export default function useCms() {
  return {
    pages: mockCmsPages,
  };
}