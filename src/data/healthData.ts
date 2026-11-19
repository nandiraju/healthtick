export interface SymptomOption {
  id: string;
  name: string;
  category: 'Neurological' | 'Energy' | 'Respiratory' | 'Musculoskeletal' | 'Digestive';
  color: string;
  defaultSeverity: number;
  active: boolean;
}

export interface SymptomRecord {
  id: string;
  symptom: string;
  category: string;
  severity: number; // 1-10
  timestamp: string;
  dateLabel: string;
  location: string;
  coords: string;
  notes: string;
  color: string;
}

export interface MapSymptomPin {
  id: string;
  x: number; // normalized 0..1
  y: number; // normalized 0..1
  symptom: string;
  severity: number;
  locationName: string;
  coords: string;
  timestamp: string;
  notes: string;
  region: 'Downtown' | 'Office Park' | 'Home' | 'Transit';
  color: string;
}

export const INITIAL_SYMPTOM_LIBRARY: SymptomOption[] = [
  { id: 'migraine', name: 'Migraine Aura', category: 'Neurological', color: '#FF6B6B', defaultSeverity: 7, active: true },
  { id: 'fatigue', name: 'Afternoon Fatigue', category: 'Energy', color: '#7C6BFF', defaultSeverity: 5, active: true },
  { id: 'sinus', name: 'Sinus Pressure', category: 'Respiratory', color: '#2EF2C5', defaultSeverity: 4, active: true },
  { id: 'joint', name: 'Joint Stiffness', category: 'Musculoskeletal', color: '#FFB84D', defaultSeverity: 6, active: true },
  { id: 'nausea', name: 'Mild Nausea', category: 'Digestive', color: '#38BDF8', defaultSeverity: 3, active: false },
  { id: 'brainfog', name: 'Brain Fog', category: 'Neurological', color: '#A78BFA', defaultSeverity: 5, active: true },
];

export const SYMPTOM_HISTORY: SymptomRecord[] = [
  {
    id: 'rec-1',
    symptom: 'Migraine Aura',
    category: 'Neurological',
    severity: 8,
    timestamp: 'Today · 09:42 AM',
    dateLabel: 'Nov 19',
    location: 'Downtown Financial District',
    coords: '37.7897° N, 122.4014° W',
    notes: 'Started after bright glare during morning commute. Rested 20 min in dim room, eased slightly.',
    color: '#FF6B6B',
  },
  {
    id: 'rec-2',
    symptom: 'Sinus Pressure',
    category: 'Respiratory',
    severity: 4,
    timestamp: 'Yesterday · 06:15 PM',
    dateLabel: 'Nov 18',
    location: 'Golden Gate Park Trail',
    coords: '37.7694° N, 122.4862° W',
    notes: 'Noticeable pressure around cheekbones during evening walk. High pollen breeze near eucalyptus grove.',
    color: '#2EF2C5',
  },
  {
    id: 'rec-3',
    symptom: 'Afternoon Fatigue',
    category: 'Energy',
    severity: 6,
    timestamp: 'Nov 17 · 02:30 PM',
    dateLabel: 'Nov 17',
    location: 'Home Studio',
    coords: '37.7599° N, 122.4148° W',
    notes: 'Sharp energy dip 90 minutes post-lunch. Hydrated with 500ml water and stepped outside for fresh air.',
    color: '#7C6BFF',
  },
  {
    id: 'rec-4',
    symptom: 'Joint Stiffness',
    category: 'Musculoskeletal',
    severity: 5,
    timestamp: 'Nov 15 · 07:10 AM',
    dateLabel: 'Nov 15',
    location: 'Home Studio',
    coords: '37.7599° N, 122.4148° W',
    notes: 'Morning stiffness in left knee and wrists after damp overnight weather. Improved after light stretching.',
    color: '#FFB84D',
  },
  {
    id: 'rec-5',
    symptom: 'Brain Fog',
    category: 'Neurological',
    severity: 5,
    timestamp: 'Nov 13 · 11:20 AM',
    dateLabel: 'Nov 13',
    location: 'North Bay Office Campus',
    coords: '37.7955° N, 122.3937° W',
    notes: 'Difficulty focusing during back-to-back design reviews after 5.5 hours of sleep.',
    color: '#A78BFA',
  },
];

export const MAP_SYMPTOM_PINS: MapSymptomPin[] = [
  {
    id: 'pin-1',
    x: 0.28,
    y: 0.36,
    symptom: 'Migraine Aura',
    severity: 8,
    locationName: 'Downtown Financial District',
    coords: '37.7897° N, 122.4014° W',
    timestamp: 'Today · 09:42 AM',
    notes: 'Triggered by high-glare transit & bright office lighting.',
    region: 'Downtown',
    color: '#FF6B6B',
  },
  {
    id: 'pin-2',
    x: 0.64,
    y: 0.28,
    symptom: 'Sinus Pressure',
    severity: 4,
    locationName: 'Parkside Botanical Corridor',
    coords: '37.7694° N, 122.4862° W',
    timestamp: 'Yesterday · 06:15 PM',
    notes: 'Recurring mild sinus tightness near outdoor park zone.',
    region: 'Transit',
    color: '#2EF2C5',
  },
  {
    id: 'pin-3',
    x: 0.51,
    y: 0.64,
    symptom: 'Afternoon Fatigue',
    severity: 6,
    locationName: 'Home Studio',
    coords: '37.7599° N, 122.4148° W',
    timestamp: 'Nov 17 · 02:30 PM',
    notes: 'Mid-afternoon energy drop logged 3 times this week at home.',
    region: 'Home',
    color: '#7C6BFF',
  },
  {
    id: 'pin-4',
    x: 0.77,
    y: 0.56,
    symptom: 'Brain Fog',
    severity: 5,
    locationName: 'North Bay Office Campus',
    coords: '37.7955° N, 122.3937° W',
    timestamp: 'Nov 13 · 11:20 AM',
    notes: 'Poor ventilation in conference wing correlated with mild fog.',
    region: 'Office Park',
    color: '#A78BFA',
  },
  {
    id: 'pin-5',
    x: 0.37,
    y: 0.72,
    symptom: 'Joint Stiffness',
    severity: 5,
    locationName: 'Coastal Fog Belt',
    coords: '37.7510° N, 122.4476° W',
    timestamp: 'Nov 15 · 07:10 AM',
    notes: 'Cool morning humidity correlated with knee stiffness.',
    region: 'Home',
    color: '#FFB84D',
  },
];

export const ANALYTICS_SERIES = {
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    frequency: [2, 3, 1, 4, 2, 1, 3],
    intensity: [4.2, 5.8, 3.0, 7.1, 4.9, 3.5, 6.2],
    totalLogs: 16,
    avgSeverity: '4.9',
    trendDelta: '-14%',
    topSymptoms: [
      { name: 'Afternoon Fatigue', count: 6, share: 38, color: '#7C6BFF' },
      { name: 'Sinus Pressure', count: 5, share: 31, color: '#2EF2C5' },
      { name: 'Migraine Aura', count: 3, share: 19, color: '#FF6B6B' },
      { name: 'Joint Stiffness', count: 2, share: 12, color: '#FFB84D' },
    ],
  },
  '30D': {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    frequency: [14, 11, 9, 7],
    intensity: [6.4, 5.7, 4.8, 4.3],
    totalLogs: 41,
    avgSeverity: '5.3',
    trendDelta: '-28%',
    topSymptoms: [
      { name: 'Sinus Pressure', count: 14, share: 34, color: '#2EF2C5' },
      { name: 'Afternoon Fatigue', count: 12, share: 29, color: '#7C6BFF' },
      { name: 'Migraine Aura', count: 9, share: 22, color: '#FF6B6B' },
      { name: 'Joint Stiffness', count: 6, share: 15, color: '#FFB84D' },
    ],
  },
  '90D': {
    labels: ['Sep', 'Oct', 'Nov'],
    frequency: [48, 39, 29],
    intensity: [6.8, 5.6, 4.6],
    totalLogs: 116,
    avgSeverity: '5.6',
    trendDelta: '-39%',
    topSymptoms: [
      { name: 'Afternoon Fatigue', count: 38, share: 33, color: '#7C6BFF' },
      { name: 'Sinus Pressure', count: 34, share: 29, color: '#2EF2C5' },
      { name: 'Migraine Aura', count: 26, share: 22, color: '#FF6B6B' },
      { name: 'Joint Stiffness', count: 18, share: 16, color: '#FFB84D' },
    ],
  },
} as const;
