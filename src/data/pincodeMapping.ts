export interface PincodeData {
  pincode: string;
  constituency: string;
  state: string;
  pollingBooth: string;
  candidates: Array<{ name: string; party: string }>;
}

export const PINCODE_MAPPING: Record<string, PincodeData> = {
  "110001": {
    pincode: "110001",
    constituency: "New Delhi",
    state: "Delhi",
    pollingBooth: "Central Secretariat Primary School, Room 4",
    candidates: [
      { name: "Siddharth Singh", party: "PFP" },
      { name: "Meera Nair", party: "NPA" },
      { name: "Rohan Khanna", party: "Independent" }
    ]
  },
  "110011": {
    pincode: "110011",
    constituency: "New Delhi",
    state: "Delhi",
    pollingBooth: "Rashtrapati Bhavan Community Hall",
    candidates: [
      { name: "Siddharth Singh", party: "PFP" },
      { name: "Meera Nair", party: "NPA" }
    ]
  },
  "110019": {
    pincode: "110019",
    constituency: "South Delhi",
    state: "Delhi",
    pollingBooth: "Kalkaji Govt. Boys Senior Secondary School",
    candidates: [
      { name: "Aradhana Sharma", party: "PFP" },
      { name: "Vikram Malhotra", party: "NPA" },
      { name: "Sanjay Deshmukh", party: "JUJ" }
    ]
  },
  "400001": {
    pincode: "400001",
    constituency: "Mumbai South",
    state: "Maharashtra",
    pollingBooth: "Fort Municipal School, Building B",
    candidates: [
      { name: "Milind Deora", party: "NPA" },
      { name: "Arvind Sawant", party: "SHS" }
    ]
  },
  "560001": {
    pincode: "560001",
    constituency: "Bangalore Central",
    state: "Karnataka",
    pollingBooth: "St. Joseph's Boys High School, Museum Road",
    candidates: [
      { name: "Mansoor Khan", party: "INC" },
      { name: "P.C. Mohan", party: "BJP" }
    ]
  },
  "700001": {
    pincode: "700001",
    constituency: "Kolkata Uttar",
    state: "West Bengal",
    pollingBooth: "Loreto Day School, Bowbazar",
    candidates: [
      { name: "Sudip Bandyopadhyay", party: "AITC" },
      { name: "Tapash Roy", party: "BJP" }
    ]
  },
  "600001": {
    pincode: "600001",
    constituency: "Chennai Central",
    state: "Tamil Nadu",
    pollingBooth: "Govt. Arts College, Nandanam",
    candidates: [
      { name: "Dayanidhi Maran", party: "DMK" },
      { name: "Vinoj P. Selvam", party: "BJP" }
    ]
  },
  "500001": {
    pincode: "500001",
    constituency: "Hyderabad",
    state: "Telangana",
    pollingBooth: "St. George's Grammar School, Abids",
    candidates: [
      { name: "Asaduddin Owaisi", party: "AIMIM" },
      { name: "Madhavi Latha", party: "BJP" }
    ]
  },
  "380001": {
    pincode: "380001",
    constituency: "Ahmedabad West",
    state: "Gujarat",
    pollingBooth: "Gujarat College, Ellisbridge",
    candidates: [
      { name: "Hasmukh Patel", party: "BJP" },
      { name: "Bharat Yogendra", party: "INC" }
    ]
  },
  "110021": {
    pincode: "110021",
    constituency: "New Delhi",
    state: "Delhi",
    pollingBooth: "Navyug School, Chanakyapuri",
    candidates: [
      { name: "Siddharth Singh", party: "PFP" },
      { name: "Meera Nair", party: "NPA" }
    ]
  },
  "110048": {
    pincode: "110048",
    constituency: "South Delhi",
    state: "Delhi",
    pollingBooth: "Don Bosco School, Greater Kailash II",
    candidates: [
      { name: "Aradhana Sharma", party: "PFP" },
      { name: "Vikram Malhotra", party: "NPA" }
    ]
  }
};
