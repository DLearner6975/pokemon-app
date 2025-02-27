import { backgroundColorMap, hoverColorMap, statsColorMap } from '../types';

export const backgroundColorClass = (color: string) =>
  backgroundColorMap[color ?? 'bg-gray-500'];

export const hoverColorClass = (color: string) =>
  hoverColorMap[color ?? 'bg-gray-500'];

export const statsColorClass = (color: string) =>
  statsColorMap[color ?? 'bg-gray-500'];
