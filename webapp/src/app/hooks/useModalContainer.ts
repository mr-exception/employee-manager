"use client";

import { useEffect, useState } from "react";

export function useModalContainer() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById("modal-root"));
  }, []);

  return container;
}
