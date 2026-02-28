import {
    collection, addDoc, getDocs, updateDoc, deleteDoc,
    doc, query, orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { Patient } from '../types';

const COLLECTION = 'patients';

export const patientService = {
    async getAll(): Promise<Patient[]> {
        const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => ({
            id: d.id,
            ...d.data()
        })) as Patient[];
    },

    async add(data: Omit<Patient, 'id' | 'createdAt'>): Promise<Patient> {
        const docData = { ...data, createdAt: new Date().toISOString() };
        const docRef = await addDoc(collection(db, COLLECTION), docData);
        return { id: docRef.id, ...docData } as Patient;
    },

    async update(id: string, updates: Partial<Omit<Patient, 'id' | 'createdAt'>>): Promise<Patient | null> {
        const docRef = doc(db, COLLECTION, id);
        await updateDoc(docRef, updates);
        return { id, ...updates } as Patient;
    },

    async remove(id: string): Promise<boolean> {
        await deleteDoc(doc(db, COLLECTION, id));
        return true;
    },
};
