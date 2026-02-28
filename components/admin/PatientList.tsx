import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Calendar, Download, Trash2, Edit3, X, ChevronLeft, ChevronRight,
    AlertCircle, Filter, SlidersHorizontal
} from 'lucide-react';
import { Patient } from '../../types';
import { patientService } from '../../services/patientService';

const MotionDiv = motion.div as any;

interface PatientListProps {
    refreshKey: number;
    onEdit: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ refreshKey, onEdit }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchName, setSearchName] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        patientService.getAll().then(data => setPatients(data));
    }, [refreshKey]);

    const filtered = useMemo(() => {
        return patients.filter(p => {
            const nameMatch = !searchName || p.name.toLowerCase().includes(searchName.toLowerCase());
            const fromMatch = !dateFrom || p.date >= dateFrom;
            const toMatch = !dateTo || p.date <= dateTo;
            return nameMatch && fromMatch && toMatch;
        });
    }, [patients, searchName, dateFrom, dateTo]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => { setCurrentPage(1); }, [searchName, dateFrom, dateTo]);

    const handleDelete = async (id: string) => {
        await patientService.remove(id);
        const updated = await patientService.getAll();
        setPatients(updated);
        setDeleteId(null);
    };

    const clearFilters = () => {
        setSearchName('');
        setDateFrom('');
        setDateTo('');
    };

    const exportToExcel = async () => {
        const XLSX = await import('xlsx');
        const data = filtered.map((p, i) => ({
            'S.No': i + 1,
            'Name': p.name,
            'Contact': p.contact,
            'Date': p.date,
            'Day of OPD': p.dayOfOPD,
            'Condition / Diagnosis': p.condition,
            'Address': p.address,
            'Amount Paid (₹)': p.amountPaid,
        }));
        const ws = XLSX.utils.json_to_sheet(data);

        // Set column widths
        ws['!cols'] = [
            { wch: 5 }, { wch: 20 }, { wch: 15 }, { wch: 12 },
            { wch: 10 }, { wch: 30 }, { wch: 25 }, { wch: 15 }
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Patients');
        XLSX.writeFile(wb, `patients_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const hasFilters = searchName || dateFrom || dateTo;

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 outline-none bg-slate-50 text-sm font-semibold text-slate-700 placeholder-slate-400 transition-all"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${showFilters || hasFilters
                                ? 'border-teal-400 bg-teal-50 text-teal-700'
                                : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-teal-200'
                                }`}
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="hidden sm:inline">Filters</span>
                            {hasFilters && (
                                <span className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {(searchName ? 1 : 0) + (dateFrom || dateTo ? 1 : 0)}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={exportToExcel}
                            disabled={filtered.length === 0}
                            className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <MotionDiv
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-end">
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Date From</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 outline-none bg-slate-50 text-sm font-semibold text-slate-700 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Date To</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 outline-none bg-slate-50 text-sm font-semibold text-slate-700 transition-all"
                                        />
                                    </div>
                                </div>
                                {hasFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center space-x-1 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 border-2 border-red-100 transition-all whitespace-nowrap"
                                    >
                                        <X className="h-4 w-4" />
                                        <span>Clear</span>
                                    </button>
                                )}
                            </div>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between px-1">
                <p className="text-sm font-semibold text-slate-500">
                    {filtered.length} {filtered.length === 1 ? 'patient' : 'patients'} found
                    {hasFilters && <span className="text-teal-600"> (filtered)</span>}
                </p>
                {hasFilters && (
                    <p className="text-xs text-slate-400">Export will include filtered results only</p>
                )}
            </div>

            {/* Data Display */}
            {filtered.length === 0 ? (
                <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200"
                >
                    <Filter className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-bold text-lg">No patients found</p>
                    <p className="text-slate-400 text-sm mt-1">
                        {hasFilters ? 'Try adjusting your filters' : 'Add your first patient record'}
                    </p>
                </MotionDiv>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                                        <th className="px-4 py-3 text-left font-bold">#</th>
                                        <th className="px-4 py-3 text-left font-bold">Name</th>
                                        <th className="px-4 py-3 text-left font-bold">Contact</th>
                                        <th className="px-4 py-3 text-left font-bold">Date</th>
                                        <th className="px-4 py-3 text-left font-bold">OPD Day</th>
                                        <th className="px-4 py-3 text-left font-bold">Condition</th>
                                        <th className="px-4 py-3 text-left font-bold">Address</th>
                                        <th className="px-4 py-3 text-right font-bold">Amount (₹)</th>
                                        <th className="px-4 py-3 text-center font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginated.map((patient, idx) => (
                                        <tr
                                            key={patient.id}
                                            className={`border-b border-slate-50 hover:bg-teal-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                                                }`}
                                        >
                                            <td className="px-4 py-3 text-slate-400 font-bold">
                                                {(currentPage - 1) * itemsPerPage + idx + 1}
                                            </td>
                                            <td className="px-4 py-3 font-bold text-slate-800">{patient.name}</td>
                                            <td className="px-4 py-3 text-slate-600">{patient.contact}</td>
                                            <td className="px-4 py-3 text-slate-600">{patient.date}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs font-bold">
                                                    Day {patient.dayOfOPD}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate" title={patient.condition}>
                                                {patient.condition}
                                            </td>
                                            <td className="px-4 py-3 text-slate-600 max-w-[150px] truncate" title={patient.address}>
                                                {patient.address}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-emerald-700">
                                                ₹{patient.amountPaid.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center space-x-1">
                                                    <button
                                                        onClick={() => onEdit(patient)}
                                                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(patient.id)}
                                                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards — compact */}
                    <div className="md:hidden space-y-2">
                        {paginated.map((patient, idx) => (
                            <MotionDiv
                                key={patient.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className="bg-white rounded-xl border border-slate-100 px-3 py-2.5 shadow-sm"
                            >
                                {/* Row 1: Name + Amount + Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-800 text-sm truncate">{patient.name}</h3>
                                        <p className="text-xs text-slate-400">{patient.contact}</p>
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold ml-2 whitespace-nowrap">
                                        ₹{patient.amountPaid.toLocaleString()}
                                    </span>
                                    <div className="flex ml-2">
                                        <button
                                            onClick={() => onEdit(patient)}
                                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                        >
                                            <Edit3 className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(patient.id)}
                                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                                {/* Row 2: Meta info */}
                                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />{patient.date}
                                    </span>
                                    <span className="bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                        OPD {patient.dayOfOPD}
                                    </span>
                                    <span className="truncate flex-1 text-slate-400" title={patient.condition}>{patient.condition}</span>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-2 pt-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl border-2 border-slate-100 hover:border-teal-300 disabled:opacity-40 disabled:hover:border-slate-100 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5 text-slate-600" />
                            </button>
                            <span className="text-sm font-bold text-slate-600 px-3">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl border-2 border-slate-100 hover:border-teal-300 disabled:opacity-40 disabled:hover:border-slate-100 transition-colors"
                            >
                                <ChevronRight className="h-5 w-5 text-slate-600" />
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteId && (
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[2000] p-4"
                        onClick={() => setDeleteId(null)}
                    >
                        <MotionDiv
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
                        >
                            <div className="text-center">
                                <div className="bg-red-100 p-3 rounded-full inline-flex mb-4">
                                    <AlertCircle className="h-8 w-8 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Patient?</h3>
                                <p className="text-slate-500 text-sm mb-6">
                                    This action cannot be undone. The patient record will be permanently removed.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        className="flex-1 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deleteId)}
                                        className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </MotionDiv>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PatientList;
