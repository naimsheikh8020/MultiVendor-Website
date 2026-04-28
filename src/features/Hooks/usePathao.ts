import { useQuery } from "@tanstack/react-query";
import { getAreas, getCities, getZones } from "../../services/pathao.api";

export const useCities = () =>
  useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

export const useZones = (cityId?: number) =>
  useQuery({
    queryKey: ["zones", cityId],
    queryFn: () => getZones(cityId!),
    enabled: !!cityId, // 🔥 important
  });

export const useAreas = (zoneId?: number) =>
  useQuery({
    queryKey: ["areas", zoneId],
    queryFn: () => getAreas(zoneId!),
    enabled: !!zoneId, // 🔥 important
  });