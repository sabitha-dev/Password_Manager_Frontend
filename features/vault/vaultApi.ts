import api from "../../lib/axios";
import axios from "axios";

export type VaultRequest = {
  appName: string;
  loginUsername: string;
  password: string;
  notes?: string;
};

export const getVaultList = async () => {
  try {
    const res = await api.get("/vault");
    
    return res.data.data;
  } catch (error: any) {
    
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch vault list");
    }
    throw new Error("Something went wrong");
  }
};

export const getVaultById = async (id: string) => {
  try {
    const res = await api.get(`/vault/${id}`);
    
    return res.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch vault details");
    }
    throw new Error("Something went wrong");
  }
};

export const addVault = async (data: VaultRequest) => {
  try {
    const res = await api.post("/vault", data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to add vault");
    }
    throw new Error("Something went wrong");
  }
};
export const updateVault = async (id: string, data: VaultRequest) => {
  try {
    const res = await api.patch(`/vault/${id}`, data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update vault"
      );
    }
    throw new Error("Something went wrong");
  }
};
export const deleteVault = async (id: string) => {
  try {
    const res = await api.delete(`/vault/${id}`);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to delete vault");
    }
    throw new Error("Something went wrong");
  }
};