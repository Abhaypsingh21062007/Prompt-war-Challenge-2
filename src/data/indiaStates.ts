export interface StateData {
  id: string;
  name: string;
  phase: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const INDIA_STATES_DATA: Record<string, StateData> = {
  "JK": { id: "JK", name: "Jammu & Kashmir", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "HP": { id: "HP", name: "Himachal Pradesh", phase: "Phase 2", date: "Oct 05, 2024", status: "completed" },
  "PB": { id: "PB", name: "Punjab", phase: "Phase 3", date: "Oct 21, 2024", status: "completed" },
  "HR": { id: "HR", name: "Haryana", phase: "Phase 2", date: "Oct 05, 2024", status: "completed" },
  "RJ": { id: "RJ", name: "Rajasthan", phase: "Phase 4", date: "Nov 12, 2024", status: "ongoing" },
  "GJ": { id: "GJ", name: "Gujarat", phase: "Phase 5", date: "Nov 25, 2024", status: "upcoming" },
  "MH": { id: "MH", name: "Maharashtra", phase: "Phase 4", date: "Nov 20, 2024", status: "ongoing" },
  "KA": { id: "KA", name: "Karnataka", phase: "Phase 6", date: "Dec 05, 2024", status: "upcoming" },
  "KL": { id: "KL", name: "Kerala", phase: "Phase 6", date: "Dec 05, 2024", status: "upcoming" },
  "TN": { id: "TN", name: "Tamil Nadu", phase: "Phase 6", date: "Dec 05, 2024", status: "upcoming" },
  "AP": { id: "AP", name: "Andhra Pradesh", phase: "Phase 5", date: "Nov 25, 2024", status: "upcoming" },
  "TG": { id: "TG", name: "Telangana", phase: "Phase 5", date: "Nov 25, 2024", status: "upcoming" },
  "OR": { id: "OR", name: "Odisha", phase: "Phase 4", date: "Nov 20, 2024", status: "ongoing" },
  "WB": { id: "WB", name: "West Bengal", phase: "Phase 3", date: "Oct 21, 2024", status: "completed" },
  "BR": { id: "BR", name: "Bihar", phase: "Phase 2", date: "Oct 05, 2024", status: "completed" },
  "UP": { id: "UP", name: "Uttar Pradesh", phase: "Phase 3", date: "Oct 21, 2024", status: "completed" },
  "MP": { id: "MP", name: "Madhya Pradesh", phase: "Phase 4", date: "Nov 12, 2024", status: "ongoing" },
  "CT": { id: "CT", name: "Chhattisgarh", phase: "Phase 4", date: "Nov 12, 2024", status: "ongoing" },
  "JH": { id: "JH", name: "Jharkhand", phase: "Phase 3", date: "Oct 21, 2024", status: "completed" },
  "AS": { id: "AS", name: "Assam", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "TR": { id: "TR", name: "Tripura", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "ML": { id: "ML", name: "Meghalaya", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "MN": { id: "MN", name: "Manipur", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "MZ": { id: "MZ", name: "Mizoram", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "NL": { id: "NL", name: "Nagaland", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "AR": { id: "AR", name: "Arunachal Pradesh", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "SK": { id: "SK", name: "Sikkim", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" },
  "GA": { id: "GA", name: "Goa", phase: "Phase 5", date: "Nov 25, 2024", status: "upcoming" },
  "UK": { id: "UK", name: "Uttarakhand", phase: "Phase 2", date: "Oct 05, 2024", status: "completed" },
  "PY": { id: "PY", name: "Puducherry", phase: "Phase 6", date: "Dec 05, 2024", status: "upcoming" },
  "AN": { id: "AN", name: "Andaman & Nicobar", phase: "Phase 6", date: "Dec 05, 2024", status: "upcoming" },
  "LD": { id: "LD", name: "Lakshadweep", phase: "Phase 6", date: "Dec 05, 2024", status: "upcoming" },
  "CH": { id: "CH", name: "Chandigarh", phase: "Phase 3", date: "Oct 21, 2024", status: "completed" },
  "DH": { id: "DH", name: "Dadra & Nagar Haveli", phase: "Phase 5", date: "Nov 25, 2024", status: "upcoming" },
  "DL": { id: "DL", name: "Delhi", phase: "Phase 3", date: "Oct 21, 2024", status: "completed" },
  "LA": { id: "LA", name: "Ladakh", phase: "Phase 1", date: "Sept 18, 2024", status: "completed" }
};
