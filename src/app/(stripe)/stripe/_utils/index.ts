const GROSZ_MULTIPLIER = 100;

export const groszToPLN = (amount: number) => amount / GROSZ_MULTIPLIER;
export const PLNToGrosz = (amount: number) => amount * GROSZ_MULTIPLIER;
