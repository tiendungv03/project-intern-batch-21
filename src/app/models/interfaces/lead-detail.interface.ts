export interface Personnel {
  name: string;
  initials: string;
  avatarUrl?: string;
  colorClass?: string;
}

export interface Lead {
  id: string;
  name: string;
  otherName?: string;
  avatarUrl: string;
  bannerUrl: string;
  gender: string;
  age: number;
  dob: string;
  status: string;
  leadType: string;
  marriedStatus: string;
  policyStatus: string;
  source: string;
  subSource: string;
  email: string;
  phone: string;
  workPhone?: string;
  address: string;
  mailingAddress: string;
  tags: string[];
  owner: Personnel;
  csr: Personnel;
  agent: Personnel;
  addedBy: Personnel;
  dateAdded: string;
}

export interface Note {
  id: string;
  badge: string;
  content: string;
  aigCode: string;
  author: Personnel;
  appendsCount: number;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  assignee: Personnel;
}

export interface Comment {
  id: string;
  author: Personnel;
  date: string;
  content: string;
  appendsCount: number;
}

export interface Relationship {
  id: string;
  name: string;
  avatarUrl: string;
  leadId: string;
  type: string;
  relationship: string;
}