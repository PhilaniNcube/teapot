import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

/**
 * Creates an afterChange hook that revalidates the given cache tags.
 * Pass a static list of tags plus an optional function to derive per-document tags.
 */
export function revalidateAfterChange(
  tags: string[],
  dynamicTag?: (doc: Record<string, unknown>) => string[]
): CollectionAfterChangeHook {
  return ({ doc }) => {
    for (const tag of tags) {
      revalidateTag(tag, 'max');
    }
    if (dynamicTag) {
      for (const tag of dynamicTag(doc as Record<string, unknown>)) {
        revalidateTag(tag, 'max');
      }
    }
    return doc;
  };
}

/**
 * Creates an afterDelete hook that revalidates the given cache tags.
 */
export function revalidateAfterDelete(
  tags: string[],
  dynamicTag?: (doc: Record<string, unknown>) => string[]
): CollectionAfterDeleteHook {
  return ({ doc }) => {
    for (const tag of tags) {
      revalidateTag(tag, 'max');
    }
    if (dynamicTag) {
      for (const tag of dynamicTag(doc as Record<string, unknown>)) {
        revalidateTag(tag, 'max');
      }
    }
    return doc;
  };
}
