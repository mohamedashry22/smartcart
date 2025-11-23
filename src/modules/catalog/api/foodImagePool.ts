const cdn = "https://images.unsplash.com";

export const foodImagePools: Record<string, string[]> = {
  produce: [
    `${cdn}/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1506801310323-534be5e7c1f9?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80`,
  ],
  dairy: [
    `${cdn}/photo-1472145246862-b24cf25c4a36?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1504673908802-3d94aa7b8551?auto=format&fit=crop&w=900&q=80`,
  ],
  bakery: [
    `${cdn}/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1542838132-48707c781e16?auto=format&fit=crop&w=900&q=80`,
  ],
  meat: [
    `${cdn}/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1615937691194-96f5d92c3c8e?auto=format&fit=crop&w=900&q=80`,
  ],
  pantry: [
    `${cdn}/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1504674900247-83aea1bd2e97?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1504674900247-75e25f4623c0?auto=format&fit=crop&w=900&q=80`,
  ],
  snacks: [
    `${cdn}/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1504674900247-79b3751d95b0?auto=format&fit=crop&w=900&q=80`,
  ],
  beverages: [
    `${cdn}/photo-1504674900247-83aea1bd2e97?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1504674900247-75e25f4623c0?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80`,
  ],
  frozen: [
    `${cdn}/photo-1504674900247-1c1da6e46edc?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80`,
    `${cdn}/photo-1504674900247-83aea1bd2e97?auto=format&fit=crop&w=900&q=80`,
  ],
};

export const fallbackImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

export const defaultLqip =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYVAAAAEklEQVR42mNk+M9QzwAEYBxVSJ0UsgAAAABJRU5ErkJggg==";
