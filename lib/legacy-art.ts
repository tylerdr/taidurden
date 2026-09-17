/** Existing March 2026 brand art, not current screenshots or customer evidence. */
const slugs=new Set(["peakedlabs","protocolrank","shreddify","ai-business-blueprint","alivelongevity","ohio-power-picker","getfoundinchat","ogfixer","aiopsguide","winemakeros","hireagentbuilders","portcoaudit"]);
export function legacyArt(slug:string):string|null{return slugs.has(slug)?`/sharecards/${slug}.png`:null;}
