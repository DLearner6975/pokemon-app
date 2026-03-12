import {
  backgroundColorMap,
  borderColorMap,
  gradientColorMap,
  gradientColorWhiteMap,
  hoverColorMap,
  statsColorMap,
} from '../types';

export const backgroundColorClass = (color: string) =>
  backgroundColorMap[color ?? 'bg-gray-500'];

export const borderColorClass = (color: string) =>
  borderColorMap[color ?? 'border-gray-200'];

export const hoverColorClass = (color: string) =>
  hoverColorMap[color ?? 'bg-gray-500'];

export const statsColorClass = (color: string) =>
  statsColorMap[color ?? 'bg-gray-500'];

export const gradientColorClass = (color: string) =>
  gradientColorMap[color ?? 'bg-gradient-to-r from-gray-500 to-gray-600'];

export const gradientColorWhiteClass = (color: string) =>
  gradientColorWhiteMap[color ?? 'bg-gradient-to-r from-gray-500 to-white'];
