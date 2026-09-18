export type ThesisRelation = { thesisId: string; reason: string };
export type ThesisMembership = { operators: string[]; relations: ThesisRelation[] };
export function matchesThesis(membership: ThesisMembership, thesisId: string): boolean {
  return membership.relations.some(relation => relation.thesisId === thesisId);
}
/** Overlapping tags must not multiply products or experiment observations. */
export function uniqueIdsForThesis(productIds: readonly string[], memberships: Readonly<Record<string, ThesisMembership>>, thesisId: string): string[] {
  return [...new Set(productIds)].filter(id => memberships[id] && matchesThesis(memberships[id], thesisId));
}
