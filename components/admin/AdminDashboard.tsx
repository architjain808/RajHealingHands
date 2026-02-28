import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, UserPlus, ClipboardList, LogOut, Save, X,
    User, Phone, Calendar, Hash, Stethoscope, MapPin, IndianRupee, CheckCircle
} from 'lucide-react';
import { Patient } from '../../types';
import { patientService } from '../../services/patientService';
import PatientList from './PatientList';

const MotionDiv = motion.div as any;

type Tab = 'add' | 'view';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('add');
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Form state — dayOfOPD & amountPaid stored as strings so user can clear them
    const emptyForm = {
        name: '',
        contact: '',
        date: new Date().toISOString().split('T')[0],
        dayOfOPD: '' as string,
        condition: '',
        address: '',
        amountPaid: '' as string,
    };
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (editingPatient) {
            setForm({
                name: editingPatient.name,
                contact: editingPatient.contact,
                date: editingPatient.date,
                dayOfOPD: String(editingPatient.dayOfOPD),
                condition: editingPatient.condition,
                address: editingPatient.address,
                amountPaid: String(editingPatient.amountPaid),
            });
            setActiveTab('add');
        }
    }, [editingPatient]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = {
            ...form,
            dayOfOPD: parseInt(form.dayOfOPD) || 1,
            amountPaid: parseInt(form.amountPaid) || 0,
        };

        if (editingPatient) {
            await patientService.update(editingPatient.id, submitData);
            triggerSuccess('Patient updated successfully!');
            setEditingPatient(null);
        } else {
            await patientService.add(submitData);
            triggerSuccess('Patient added successfully!');
        }

        setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] });
        setRefreshKey(k => k + 1);
    };

    const triggerSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const cancelEdit = () => {
        setEditingPatient(null);
        setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] });
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        window.location.reload();
    };

    const handleEdit = (patient: Patient) => {
        setEditingPatient(patient);
    };

    const inputClass = 'w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 outline-none bg-slate-50 transition-all font-semibold text-slate-700 placeholder-slate-400 text-sm';

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
            {/* Background pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2dd4bf 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

            {/* Header */}
            <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-lg border-b border-teal-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="bg-teal-400 p-2 rounded-xl shadow-md">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">Admin Panel</h1>
                                <p className="text-xs text-slate-400 font-semibold hidden sm:block">Raj Healing Hands</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 border-2 border-red-100 transition-all"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Tab Bar */}
            <div className="sticky top-[57px] z-[99] bg-white/80 backdrop-blur-lg border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex">
                        <button
                            onClick={() => { setActiveTab('add'); cancelEdit(); }}
                            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 text-sm font-bold border-b-3 transition-all ${activeTab === 'add'
                                ? 'border-b-[3px] border-teal-500 text-teal-700 bg-teal-50/50'
                                : 'border-b-[3px] border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>{editingPatient ? 'Edit Patient' : 'Add Patient'}</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab('view'); cancelEdit(); }}
                            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 text-sm font-bold border-b-3 transition-all ${activeTab === 'view'
                                ? 'border-b-[3px] border-teal-500 text-teal-700 bg-teal-50/50'
                                : 'border-b-[3px] border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <ClipboardList className="h-4 w-4" />
                            <span>View Records</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 font-bold text-sm"
                    >
                        <CheckCircle className="h-5 w-5" />
                        <span>{successMessage}</span>
                    </MotionDiv>
                )}
            </AnimatePresence>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-6">
                {activeTab === 'add' ? (
                    <MotionDiv
                        key="add-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-2xl border-2 border-teal-50 shadow-xl p-4 sm:p-8">
                            {/* Form Header */}
                            <div className="flex items-center justify-between mb-3 sm:mb-6">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                                        {editingPatient ? 'Edit Patient Record' : 'New Patient Record'}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5 hidden sm:block">
                                        {editingPatient ? 'Update the details below' : 'Fill in the patient details below'}
                                    </p>
                                </div>
                                {editingPatient && (
                                    <button
                                        onClick={cancelEdit}
                                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
                                {/* Row 1: Name + Contact */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Patient Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className={inputClass}
                                                placeholder="Full name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Contact Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                value={form.contact}
                                                onChange={(e) => setForm({ ...form, contact: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                                className={inputClass}
                                                placeholder="Phone number"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Date + OPD Day */}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="date"
                                                required
                                                value={form.date}
                                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Day of OPD</label>
                                        <div className="relative">
                                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="number"
                                                required
                                                min={1}
                                                value={form.dayOfOPD}
                                                onChange={(e) => setForm({ ...form, dayOfOPD: e.target.value })}
                                                className={inputClass}
                                                placeholder="e.g. 1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3: Condition */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Condition / Diagnosis</label>
                                    <div className="relative">
                                        <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <textarea
                                            required
                                            rows={2}
                                            value={form.condition}
                                            onChange={(e) => setForm({ ...form, condition: e.target.value })}
                                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 outline-none bg-slate-50 transition-all font-semibold text-slate-700 placeholder-slate-400 text-sm resize-none"
                                            placeholder="Describe the condition or diagnosis..."
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Address */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            value={form.address}
                                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                                            className={inputClass}
                                            placeholder="Patient address"
                                        />
                                    </div>
                                </div>

                                {/* Row 5: Amount */}
                                {/* Row 5: Address + Amount side by side */}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Amount Paid (₹)</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="number"
                                                required
                                                min={0}
                                                value={form.amountPaid}
                                                onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
                                                className={inputClass}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-1">
                                    <button
                                        type="submit"
                                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                                    >
                                        <Save className="h-5 w-5" />
                                        <span>{editingPatient ? 'Update Patient' : 'Save Patient'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </MotionDiv>
                ) : (
                    <MotionDiv
                        key="view-list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PatientList
                            refreshKey={refreshKey}
                            onEdit={handleEdit}
                        />
                    </MotionDiv>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
