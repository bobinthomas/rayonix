/** Anchor id for a solution group on /solutions, e.g. "Defence & Homeland" -> "defence-homeland". */
export function solutionGroupId(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
