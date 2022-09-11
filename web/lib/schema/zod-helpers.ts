import { z } from "zod";

export const ethWalletRegex = /^0x[a-fA-F0-9]{40}$/g;

function zodFile(type: "audio" | "image", optional = false) {
  return z
    .any() // Cannot use instanceof because of server side rendering and FileList is not defined
    .superRefine((list, ctx) => {
      if (list.length === 0) {
        if (optional) return z.NEVER;

        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: "array",
          inclusive: true,
          minimum: 1,
          message: `An ${type} file should be selected`,
          fatal: true,
        });
        return z.NEVER;
      }

      if (list.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          type: "array",
          inclusive: true,
          maximum: 1,
          message: "Too many file selected",
          fatal: true,
        });
        return z.NEVER;
      }

      if (!list.item(0).type.startsWith(type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Should be an ${type} file`,
        });
      }
    });
}

export function zodAudioFile(optional: boolean = false) {
  return zodFile("audio", optional);
}

export function zodImageFile(optional: boolean = false) {
  return zodFile("image", optional);
}
