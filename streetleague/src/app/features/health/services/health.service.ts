import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { 
  User, HealthMetric, Appointment, MedicalRecord, 
  DietPlan, HealthAlert, Meal 
} from '../models/health.models';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private userSignal = signal<User | null>(null);
  private metricsSignal = signal<HealthMetric[]>([]);
  private appointmentsSignal = signal<Appointment[]>([]);
  private medicalRecordsSignal = signal<MedicalRecord[]>([]);
  private dietPlansSignal = signal<DietPlan[]>([]);
  private alertsSignal = signal<HealthAlert[]>([]);

  user = this.userSignal.asReadonly();
  metrics = this.metricsSignal.asReadonly();
  appointments = this.appointmentsSignal.asReadonly();
  medicalRecords = this.medicalRecordsSignal.asReadonly();
  dietPlans = this.dietPlansSignal.asReadonly();
  alerts = this.alertsSignal.asReadonly();

  constructor() {
    this.loadMockData();
  }

  private loadMockData() {
    // Utilisateur mock
    this.userSignal.set({
      id: '1',
      firstName: 'Jordan',
      lastName: 'Smith',
      dateOfBirth: new Date('1995-06-15'),
      gender: 'homme',
      bloodType: 'A+',
      bloodPressure: '120/80',
      height: 178,
      weight: 75,
      muscleMass: 35,
      bodyFat: 15,
      activityLevel: 'actif',
      emergencyContact: {
        name: 'Emma Smith',
        relationship: 'soeur',
        phone: '0612345678',
        email: 'emma.smith@email.com'
      },
      allergies: [
        { id: '1', name: 'Pollen', severity: 'modérée', reaction: 'Éternuements' }
      ],
      chronicConditions: [
        { id: '1', name: 'Asthme', diagnosedDate: new Date('2010-03-10'), status: 'actif' }
      ],
      medications: [
        { id: '1', name: 'Ventoline', dosage: '2 bouffées', frequency: 'si besoin', startDate: new Date('2024-01-15') }
      ]
    });

    // Métriques de santé
    this.metricsSignal.set([
      { id: '1', userId: '1', date: new Date('2026-02-01'), weight: 76, bmi: 24.0, bodyFat: 15.5, muscleMass: 34.5 },
      { id: '2', userId: '1', date: new Date('2026-02-08'), weight: 75.5, bmi: 23.8, bodyFat: 15.2, muscleMass: 34.8 },
      { id: '3', userId: '1', date: new Date('2026-02-15'), weight: 75, bmi: 23.7, bodyFat: 15.0, muscleMass: 35.0 },
      { id: '4', userId: '1', date: new Date('2026-02-22'), weight: 74.5, bmi: 23.5, bodyFat: 14.8, muscleMass: 35.2 },
      { id: '5', userId: '1', date: new Date('2026-03-01'), weight: 74, bmi: 23.4, bodyFat: 14.5, muscleMass: 35.5 }
    ]);

    // Rendez-vous
    this.appointmentsSignal.set([
      {
        id: '1',
        userId: '1',
        type: 'suivi',
        doctorName: 'Dr. Martin',
        doctorSpecialty: 'Médecine générale',
        date: new Date('2026-03-05'),
        time: '14:30',
        duration: 30,
        location: 'Cabinet Médical - Paris 8',
        status: 'confirmé',
        reminderSent: true,
        createdAt: new Date('2026-02-20')
      },
      {
        id: '2',
        userId: '1',
        type: 'nutrition',
        doctorName: 'Sophie Bernard',
        doctorSpecialty: 'Nutritionniste',
        date: new Date('2026-03-12'),
        time: '10:00',
        duration: 45,
        location: 'Centre Nutrition - Lyon',
        status: 'en attente',
        reminderSent: false,
        createdAt: new Date('2026-02-25')
      }
    ]);

    // Dossiers médicaux
    this.medicalRecordsSignal.set([
      {
        id: '1',
        userId: '1',
        title: 'Examen annuel',
        type: 'examen',
        date: new Date('2026-01-15'),
        doctorName: 'Dr. Martin',
        establishment: 'Clinique du Sport',
        description: 'Examen de routine complet',
        diagnosis: 'Bon état général',
        treatment: 'Aucun traitement nécessaire',
        status: 'actif',
        createdAt: new Date('2026-01-15')
      },
      {
        id: '2',
        userId: '1',
        title: 'Bilan sanguin',
        type: 'laboratoire',
        date: new Date('2026-02-10'),
        doctorName: 'Dr. Petit',
        establishment: 'Laboratoire Bio',
        description: 'Analyse sanguine complète',
        diagnosis: 'Taux de fer légèrement bas',
        treatment: 'Supplémentation en fer',
        status: 'actif',
        createdAt: new Date('2026-02-10')
      }
    ]);

    // Plans alimentaires
    this.dietPlansSignal.set([
      {
        id: '1',
        userId: '1',
        name: 'Plan Performance Football',
        goal: 'performance',
        calories: 2800,
        proteins: 140,
        carbs: 350,
        fats: 90,
        mealsPerDay: 5,
        waterIntake: 2.5,
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-04-01'),
        isActive: true,
        progress: 45,
        createdAt: new Date('2026-01-28')
      }
    ]);

    // Alertes santé
    this.alertsSignal.set([
      {
        id: '1',
        userId: '1',
        type: 'info',
        title: 'Rappel IMC',
        message: 'Votre IMC est dans la zone normale',
        date: new Date(),
        read: false
      },
      {
        id: '2',
        userId: '1',
        type: 'warning',
        title: 'Rendez-vous demain',
        message: 'Consultation avec Dr. Martin à 14h30',
        date: new Date(),
        read: false,
        action: '/health/appointments'
      }
    ]);
  }

  // CRUD pour User
  updateUser(userData: Partial<User>): Observable<User> {
    const currentUser = this.userSignal();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      this.userSignal.set(updatedUser);
      return of(updatedUser).pipe(delay(500));
    }
    return of({} as User).pipe(delay(500));
  }

  // CRUD pour Health Metrics
  getMetrics(startDate?: Date, endDate?: Date): Observable<HealthMetric[]> {
    let metrics = this.metricsSignal();
    if (startDate && endDate) {
      metrics = metrics.filter(m => m.date >= startDate && m.date <= endDate);
    }
    return of(metrics).pipe(delay(300));
  }

  addMetric(metric: Omit<HealthMetric, 'id'>): Observable<HealthMetric> {
    const newMetric = {
      ...metric,
      id: Date.now().toString()
    } as HealthMetric;
    const currentMetrics = this.metricsSignal();
    this.metricsSignal.set([...currentMetrics, newMetric]);
    return of(newMetric).pipe(delay(500));
  }

  // CRUD pour Appointments
  getAppointments(status?: string): Observable<Appointment[]> {
    let appointments = this.appointmentsSignal();
    if (status) {
      appointments = appointments.filter(a => a.status === status);
    }
    return of(appointments).pipe(delay(300));
  }

  getUpcomingAppointments(): Observable<Appointment[]> {
    const now = new Date();
    const appointments = this.appointmentsSignal().filter(a => 
      a.date >= now && a.status !== 'annulé' && a.status !== 'terminé'
    );
    return of(appointments).pipe(delay(300));
  }

  createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Observable<Appointment> {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date()
    } as Appointment;
    const currentAppointments = this.appointmentsSignal();
    this.appointmentsSignal.set([...currentAppointments, newAppointment]);
    return of(newAppointment).pipe(delay(500));
  }

  updateAppointment(id: string, updates: Partial<Appointment>): Observable<Appointment> {
    const appointments = this.appointmentsSignal();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      const updated = { ...appointments[index], ...updates, updatedAt: new Date() };
      appointments[index] = updated;
      this.appointmentsSignal.set([...appointments]);
      return of(updated).pipe(delay(500));
    }
    throw new Error('Rendez-vous non trouvé');
  }

  deleteAppointment(id: string): Observable<boolean> {
    const appointments = this.appointmentsSignal().filter(a => a.id !== id);
    this.appointmentsSignal.set(appointments);
    return of(true).pipe(delay(500));
  }

  // CRUD pour Medical Records
  getMedicalRecords(type?: string, search?: string): Observable<MedicalRecord[]> {
    let records = this.medicalRecordsSignal();
    if (type) {
      records = records.filter(r => r.type === type);
    }
    if (search) {
      const term = search.toLowerCase();
      records = records.filter(r => 
        r.title.toLowerCase().includes(term) || 
        r.description.toLowerCase().includes(term)
      );
    }
    return of(records).pipe(delay(300));
  }

  createMedicalRecord(record: Omit<MedicalRecord, 'id' | 'createdAt'>): Observable<MedicalRecord> {
    const newRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date()
    } as MedicalRecord;
    const currentRecords = this.medicalRecordsSignal();
    this.medicalRecordsSignal.set([...currentRecords, newRecord]);
    return of(newRecord).pipe(delay(500));
  }

  updateMedicalRecord(id: string, updates: Partial<MedicalRecord>): Observable<MedicalRecord> {
    const records = this.medicalRecordsSignal();
    const index = records.findIndex(r => r.id === id);
    if (index !== -1) {
      const updated = { ...records[index], ...updates, updatedAt: new Date() };
      records[index] = updated;
      this.medicalRecordsSignal.set([...records]);
      return of(updated).pipe(delay(500));
    }
    throw new Error('Dossier non trouvé');
  }

  deleteMedicalRecord(id: string): Observable<boolean> {
    const records = this.medicalRecordsSignal().filter(r => r.id !== id);
    this.medicalRecordsSignal.set(records);
    return of(true).pipe(delay(500));
  }

  // CRUD pour Diet Plans
  getActiveDietPlan(): Observable<DietPlan | null> {
    const plan = this.dietPlansSignal().find(p => p.isActive);
    return of(plan || null).pipe(delay(300));
  }

  createDietPlan(plan: Omit<DietPlan, 'id' | 'createdAt' | 'progress'>): Observable<DietPlan> {
    const newPlan = {
      ...plan,
      id: Date.now().toString(),
      progress: 0,
      createdAt: new Date()
    } as DietPlan;
    const currentPlans = this.dietPlansSignal();
    this.dietPlansSignal.set([...currentPlans, newPlan]);
    return of(newPlan).pipe(delay(500));
  }

  updateDietPlan(id: string, updates: Partial<DietPlan>): Observable<DietPlan> {
    const plans = this.dietPlansSignal();
    const index = plans.findIndex(p => p.id === id);
    if (index !== -1) {
      const updated = { ...plans[index], ...updates, updatedAt: new Date() };
      plans[index] = updated;
      this.dietPlansSignal.set([...plans]);
      return of(updated).pipe(delay(500));
    }
    throw new Error('Plan non trouvé');
  }

  // Calculs santé
  calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  }

  getBMICategory(bmi: number): { category: string; color: string } {
    if (bmi < 18.5) return { category: 'Insuffisance pondérale', color: 'text-blue-400' };
    if (bmi < 25) return { category: 'Poids normal', color: 'text-green-400' };
    if (bmi < 30) return { category: 'Surpoids', color: 'text-yellow-400' };
    if (bmi < 35) return { category: 'Obésité modérée', color: 'text-orange-400' };
    return { category: 'Obésité sévère', color: 'text-red-400' };
  }

  // Alertes
  getUnreadAlerts(): Observable<HealthAlert[]> {
    return of(this.alertsSignal().filter(a => !a.read)).pipe(delay(200));
  }

  markAlertAsRead(alertId: string): Observable<boolean> {
    const alerts = this.alertsSignal();
    const index = alerts.findIndex(a => a.id === alertId);
    if (index !== -1) {
      alerts[index].read = true;
      this.alertsSignal.set([...alerts]);
    }
    return of(true).pipe(delay(200));
  }
}
