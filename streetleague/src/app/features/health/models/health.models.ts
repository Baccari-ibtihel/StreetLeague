export interface User {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'homme' | 'femme' | 'autre';
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  bloodPressure?: string;
  height: number; // en cm
  weight: number; // en kg
  muscleMass?: number; // en kg
  bodyFat?: number; // en %
  activityLevel: 'sédentaire' | 'léger' | 'modéré' | 'actif' | 'très actif';
  emergencyContact?: EmergencyContact;
  allergies?: Allergy[];
  chronicConditions?: ChronicCondition[];
  medications?: Medication[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Allergy {
  id: string;
  name: string;
  severity: 'légère' | 'modérée' | 'sévère';
  reaction?: string;
  dateDiagnosed?: Date;
}

export interface ChronicCondition {
  id: string;
  name: string;
  diagnosedDate: Date;
  status: 'actif' | 'en rémission' | 'résolu';
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  prescribedBy?: string;
}

export interface HealthMetric {
  id: string;
  userId: string;
  date: Date;
  weight: number;
  bmi: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  type: 'médical' | 'nutrition' | 'suivi' | 'examen';
  doctorName: string;
  doctorSpecialty?: string;
  date: Date;
  time: string;
  duration: number; // en minutes
  location: string;
  notes?: string;
  status: 'confirmé' | 'en attente' | 'terminé' | 'annulé';
  reminderSent: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface MedicalRecord {
  id: string;
  userId: string;
  title: string;
  type: 'blessure' | 'examen' | 'laboratoire' | 'diagnostic' | 'suivi';
  date: Date;
  doctorName: string;
  establishment?: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  attachments?: string[];
  status: 'actif' | 'archivé';
  createdAt: Date;
  updatedAt?: Date;
}

export interface DietPlan {
  id: string;
  userId: string;
  name: string;
  goal: 'prise de masse' | 'perte de poids' | 'maintenance' | 'performance';
  calories: number;
  proteins: number; // en grammes
  carbs: number; // en grammes
  fats: number; // en grammes
  mealsPerDay: number;
  waterIntake: number; // en litres
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  progress: number; // 0-100
  createdAt: Date;
  updatedAt?: Date;
}

export interface Meal {
  id: string;
  planId: string;
  name: string;
  time: string;
  foods: FoodItem[];
  totalCalories: number;
  totalProteins: number;
  totalCarbs: number;
  totalFats: number;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface HealthAlert {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  date: Date;
  read: boolean;
  action?: string;
}
