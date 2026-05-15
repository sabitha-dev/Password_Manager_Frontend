import api from "../../lib/axios";

export type VaultRequest = {
  appName: string;
  loginUsername: string;
  password: string;
  notes?: string;
};

export const getVaultList = async () => {
  const res = await api.get("/vault");
  return res.data;
};

export const getVaultById = async (id: string) => {
  const res = await api.get(`/vault/${id}`);
  return res.data;
};

export const addVault = async (data: VaultRequest) => {
  const res = await api.post("/vault", data);
  return res.data;
};

export const deleteVault = async (id: string) => {
  const res = await api.delete(`/vault/${id}`);
  return res.data;
};