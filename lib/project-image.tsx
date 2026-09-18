import { ImageResponse } from "next/og";
import type { ProjectProfile } from "@/lib/project-profile";

const palettes: Record<string, [string, string]> = {
  roof: ["#FFB66E", "#302219"], film: ["#FEB98B", "#302018"],
  garden: ["#B7E18B", "#20301D"], family: ["#EFB2CB", "#30212A"],
  pencil: ["#FFD48D", "#30271B"], health: ["#99DBCD", "#1B302D"],
  fitness: ["#C5E68C", "#28301B"], wine: ["#D0B3F5", "#2B2238"],
  pool: ["#8ADAEF", "#19303A"], energy: ["#F0DC88", "#302B1B"],
  cube: ["#D1BEF5", "#292335"], cabinet: ["#DCC19C", "#30271E"],
  brand: ["#FFB09C", "#35241E"], media: ["#ACBFFD", "#212A3D"],
  search: ["#9ADFD5", "#1C3032"], document: ["#C3C6F7", "#26283B"],
  blueprint: ["#99CFF9", "#1D2D3A"], network: ["#A5E5BB", "#1D3026"],
};

/** Original editorial line illustrations, not product screenshots or customer evidence. */
function ProjectMark({ kind, color }: { kind: string; color: string }) {
  const common = { fill: "none", stroke: color, strokeWidth: 6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let drawing;
  switch (kind) {
    case "roof": drawing = <g {...common}><path d="M36 148L174 42l138 106M65 135v123h217V135M138 258v-81h72v81"/><path d="M93 102l82-62 81 62M236 58V29h28v50"/><path d="M35 282h280"/><circle cx="285" cy="212" r="37" fill="#302219"/><path d="M267 212l13 13 24-26"/></g>; break;
    case "film": drawing = <g {...common}><rect x="38" y="55" width="278" height="202" rx="19"/><path d="M38 95h278M38 217h278M70 55v40M119 55v40M168 55v40M217 55v40M266 55v40M70 217v40M119 217v40M168 217v40M217 217v40M266 217v40"/><path d="M149 123v67l66-34Z" fill={color} stroke="none"/></g>; break;
    case "garden": drawing = <g {...common}><path d="M174 276V104M174 209c-85 5-118-56-112-101 75-1 114 47 112 101ZM174 152c82 5 111-48 108-93-70-3-107 39-108 93ZM52 278h245"/><path d="M174 211L94 139M174 153l78-65"/><circle cx="95" cy="253" r="10"/><circle cx="260" cy="230" r="16"/></g>; break;
    case "family": drawing = <g {...common}><circle cx="107" cy="83" r="29"/><circle cx="245" cy="83" r="29"/><circle cx="176" cy="172" r="23"/><path d="M48 200v-27c0-71 119-71 119-8M186 165c0-65 119-71 119 8v27M128 269v-19c0-61 96-61 96 0v19"/><path d="M151 58c15-27 42-26 49-6 13-20 40-15 40 7 0 22-39 43-39 43s-37-17-50-44Z" transform="translate(-25 -15) scale(.75)"/></g>; break;
    case "pencil": drawing = <g {...common}><rect x="57" y="35" width="212" height="248" rx="14"/><path d="M88 233l13-47L253 36l33 33-152 150-46 14ZM101 186l33 33M230 59l33 33M89 254h141"/><path d="M98 76l12 20 24-5-16 21 12 21-26-7-16 21 1-28-24-7 25-7Z" strokeWidth="4"/></g>; break;
    case "health": case "fitness": drawing = <g {...common}><path d="M174 265S41 193 41 107c0-79 99-89 133-29 37-60 135-50 135 29 0 85-135 158-135 158Z"/><path d="M62 159h60l26-59 39 111 31-64h71"/><circle cx="287" cy="263" r="12"/></g>; break;
    case "wine": drawing = <g {...common}><path d="M95 43h162l-14 98c-6 40-125 40-132 0L95 43ZM176 171v100M112 272h128M104 111h144"/><path d="M280 39c27 20 27 43 0 52-24-9-24-31 0-52"/></g>; break;
    case "pool": drawing = <g {...common}><rect x="32" y="67" width="290" height="191" rx="47"/><path d="M52 164c24-31 48 31 72 0s48 31 72 0 48 31 72 0 28 0 34 0M52 213c24-31 48 31 72 0s48 31 72 0 48 31 72 0"/><path d="M132 113V52c0-26 42-26 42 0v61M174 113V52c0-26 42-26 42 0v61M132 87h84"/></g>; break;
    case "energy": drawing = <g {...common}><circle cx="176" cy="160" r="119"/><path d="M185 58L104 177h63l-6 85 87-126h-65Z" fill={color} stroke="none"/></g>; break;
    case "cube": case "cabinet": drawing = <g {...common}><path d="M176 36l122 70v143l-122 70-123-70V106Z M53 106l123 72 122-72M176 178v141M114 70l123 71v79" transform="translate(0 -12)"/><path d="M78 153v55l67 38v-57ZM203 191v57l65-38v-56Z" strokeWidth="3"/></g>; break;
    case "search": drawing = <g {...common}><circle cx="143" cy="132" r="84"/><path d="M204 195l87 89M89 136h24l20-41 21 77 23-44h26"/><circle cx="267" cy="52" r="16"/></g>; break;
    case "brand": drawing = <g {...common}><circle cx="116" cy="106" r="70"/><rect x="153" y="112" width="139" height="139" rx="20"/><path d="M58 265l62-104 65 104Z" fill="#35241E"/><path d="M262 46v40M242 66h40"/></g>; break;
    case "media": drawing = <g {...common}><rect x="33" y="58" width="288" height="213" rx="18"/><path d="M33 104h288"/><circle cx="58" cy="81" r="5" fill={color}/><circle cx="80" cy="81" r="5" fill={color}/><circle cx="102" cy="81" r="5" fill={color}/><rect x="59" y="129" width="107" height="108" rx="10"/><path d="M62 215l35-38 21 17 22-31 23 38M192 145h100M192 179h74M192 213h87"/><circle cx="140" cy="151" r="9"/></g>; break;
    case "document": drawing = <g {...common}><path d="M81 36h145l51 53v190H81Z M226 36v56h51M112 126h124M112 162h83M112 198h103"/><path d="M117 237l13 13 24-25"/><circle cx="48" cy="101" r="12"/></g>; break;
    case "blueprint": drawing = <g {...common}><rect x="35" y="41" width="109" height="74" rx="13"/><rect x="207" y="120" width="109" height="74" rx="13"/><rect x="35" y="208" width="109" height="74" rx="13"/><path d="M144 78h35v79h28M207 157h-30v88h-33M64 68h51M64 87h31M233 146h55M233 165h33M64 235h51M64 254h31"/></g>; break;
    default: drawing = <g {...common}><path d="M173 161L63 65M173 161l114-96M173 161L63 265M173 161l114 104M63 65h224M63 265h224" strokeWidth="3"/><circle cx="173" cy="161" r="43" fill="#1D3026"/><circle cx="63" cy="65" r="28" fill="#1D3026"/><circle cx="287" cy="65" r="28" fill="#1D3026"/><circle cx="63" cy="265" r="28" fill="#1D3026"/><circle cx="287" cy="265" r="28" fill="#1D3026"/><path d="M158 161l11 11 23-26"/></g>;
  }
  return <svg width="350" height="330" viewBox="0 0 350 330">{drawing}</svg>;
}

export function renderProjectImage(project: {name: string; family: string; slug: string}, profile: ProjectProfile) {
  const [accent, tone] = palettes[profile.visual] ?? palettes.network;
  return new ImageResponse(
    <div style={{display:"flex",position:"relative",width:1200,height:630,backgroundColor:"#0C1119",color:"#F7F7F2",padding:52,fontFamily:"sans-serif",overflow:"hidden"}}>
      <div style={{display:"flex",position:"absolute",left:0,top:0,width:1200,height:9,backgroundColor:accent}} />
      <div style={{display:"flex",width:685,flexDirection:"column",justifyContent:"space-between"}}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",fontSize:19,letterSpacing:3,color:accent}}>TAI DURDEN / PROJECT NOTES</div>
          <div style={{display:"flex",marginTop:39,fontSize:19,color:"#AFBAC9"}}>{project.family.toUpperCase()}</div>
          <div style={{display:"flex",marginTop:18,fontSize:project.name.length>25?53:64,fontWeight:700,lineHeight:1.07,letterSpacing:-2,maxWidth:680}}>{project.name}</div>
          <div style={{display:"flex",marginTop:25,fontSize:27,lineHeight:1.35,color:"#CED6DF",maxWidth:640}}>{profile.tagline}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",fontSize:19,color:"#A5B1C0"}}>taidurden.com/ventures/{project.slug}</div>
      </div>
      <div style={{display:"flex",position:"absolute",right:35,top:126,width:365,height:365,borderRadius:36,backgroundColor:tone,alignItems:"center",justifyContent:"center",border:`1px solid ${accent}55`}}><ProjectMark kind={profile.visual} color={accent}/></div>
      <div style={{display:"flex",position:"absolute",right:52,bottom:51,fontSize:16,letterSpacing:2,color:accent}}>PARALLEL, IN PUBLIC</div>
    </div>,
    {width:1200,height:630}
  );
}
