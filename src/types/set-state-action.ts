/**
 * Utility type for React state dispatch
 * Simplifies TypeScript type definitions for setState functions
 */

import type { Dispatch, SetStateAction } from "react";

export type SetStateActionType<T> = Dispatch<SetStateAction<T>>;
