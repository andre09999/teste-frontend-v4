import { create } from "zustand";

type Equipment = {
  id: string;
  name: string;
  state: string;
  position: { lat: number; lon: number };
};

type Store = {
  equipments: Equipment[];
  setEquipments: (data: Equipment[]) => void;
};

export const useEquipmentStore = create<Store>((set) => ({
  equipments: [],
  setEquipments: (data) => set({ equipments: data }),
}));
