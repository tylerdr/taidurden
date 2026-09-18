import definitions from "@/data/theses.json";
import taxonomy from "@/data/venture-taxonomy.json";
import membershipData from "@/data/thesis-memberships.json";
import {matchesThesis,type ThesisMembership} from "@/lib/thesis-relations";
export const theses=definitions;
export type Thesis=(typeof definitions)[number];
type LegacyClassification=(typeof taxonomy.entries)[keyof typeof taxonomy.entries];
export type Classification=Omit<LegacyClassification,"primaryThesis">&ThesisMembership;
export const taxonomyVersion=membershipData.taxonomyVersion;
export const audienceLabels:Record<string,string>={b2b:"B2B",b2c:"B2C",b2b2c:"B2B2C"};
export const companyTypeLabels:Record<string,string>={"planning-tool":"Planning tool","productized-service":"Productized service","research-media":"Research & media","asset-product":"Creative asset product","document-tool":"Document tool",directory:"Directory",marketplace:"Marketplace","developer-tool":"Developer tool","comparison-tool":"Comparison tool","consumer-app":"Consumer app","vertical-software":"Vertical software","coordination-app":"Coordination app","learning-product":"Learning product","research-platform":"Research platform","analysis-tool":"Analysis tool","assessment-tool":"Assessment tool"};
export const industryLabels:Record<string,string>={"professional-services":"Professional services",wellness:"Health & wellness",marketing:"Marketing",acquisitions:"Business acquisitions",software:"Software",energy:"Energy",family:"Families & parenting","home-services":"Home services",fitness:"Fitness",winemaking:"Winemaking","education-agriculture":"Education & agriculture",commerce:"Commerce",accounting:"Accounting",privacy:"Privacy operations"};
export const businessModelLabels:Record<string,string>={"one-time":"One-time purchase",subscription:"Subscription",license:"License",freemium:"Freemium",affiliate:"Affiliate",sponsorship:"Sponsorship","transaction-fee":"Transaction fee","usage-based":"Usage-based",hybrid:"Mixed model"};
export const jobLabels:Record<string,string>={"workflow-planning":"Plan a workflow",research:"Research a decision",creation:"Create an asset",diligence:"Evaluate a business",integration:"Connect systems",delivery:"Find delivery capacity",publishing:"Publish clearly",comparison:"Compare options",learning:"Learn by doing",acquisition:"Acquire customers",tracking:"Track progress",verification:"Check evidence",operations:"Run a workflow",coordination:"Coordinate support",preservation:"Preserve a record"};
export const channelLabels:Record<string,string>={search:"Search-led discovery",direct:"Targeted direct outreach",partners:"Partner distribution","product-led":"Product-led sharing",community:"Community",content:"Educational content","cross-sell":"Relevant cross-sell"};
export const originLabels={"internal-need":"Our operating need","personal-need":"A personal need","close-network":"Someone close to us","customer-observed":"Customer-observed problem","market-research":"Market research",unverified:"Origin not yet verified"};
export const usageLabels={"tai-uses":"Tai uses it","tyler-uses":"Tyler uses it","close-network-uses":"Someone close uses it","external-customer-uses":"External customer uses it"};
export const operatorLabels:Record<string,string>={agents:"Agents (intended use)","solo-founders":"Amplified individuals","small-teams":"Small teams","business-operators":"Everyday business operators","portfolio-operators":"Portfolio operators","business-buyers":"Business buyers",individuals:"Individuals",households:"Households",families:"Families",caregivers:"Caregivers",educators:"Educators"};
export function membershipFor(id:string):ThesisMembership{const value=(membershipData.projects as Record<string,ThesisMembership>)[id];if(!value)throw new Error(`Missing thesis membership: ${id}`);return value;}
export function classificationFor(id:string):Classification{const value=(taxonomy.entries as Record<string,LegacyClassification>)[id];if(!value)throw new Error(`Missing venture classification: ${id}`);const {primaryThesis:_legacyPrimary,...attributes}=value;return {...attributes,...membershipFor(id)};}
export function thesisFor(slug:string):Thesis|undefined{return theses.find(t=>t.slug===slug);}
export function belongsToThesis(id:string,slug:string):boolean{return matchesThesis(membershipFor(id),slug);}
export function thesesForProject(id:string):Thesis[]{return theses.filter(t=>belongsToThesis(id,t.slug));}
