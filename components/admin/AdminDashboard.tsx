import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  UserPlus,
  ClipboardList,
  LogOut,
  Save,
  X,
  User,
  Phone,
  Calendar,
  Hash,
  Stethoscope,
  MapPin,
  IndianRupee,
  CheckCircle,
  Cake,
} from "lucide-react";
import { Patient } from "../../types";
import { patientService } from "../../services/patientService";
import PatientList from "./PatientList";

const MotionDiv = motion.div as any;

type Tab = "add" | "view";

const EMPTY_FORM = {
  name: "",
  countryCode: "91",
  contact: "",
  age: "",
  date: new Date().toISOString().split("T")[0],
  dayOfOPD: "",
  condition: "",
  address: "",
  amountPaid: "",
};

type FormState = typeof EMPTY_FORM;

const inputClass =
  "w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 outline-none bg-slate-50 transition-all font-semibold text-slate-700 placeholder-slate-400 text-sm";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("add");
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editingPatient) return;
    setForm({
      name: editingPatient.name,
      countryCode: editingPatient.countryCode?.replace(/^\+/, "") || "91",
      contact: editingPatient.contact,
      age: editingPatient.age !== undefined ? String(editingPatient.age) : "",
      date: editingPatient.date,
      dayOfOPD: String(editingPatient.dayOfOPD),
      condition: editingPatient.condition,
      address: editingPatient.address,
      amountPaid: String(editingPatient.amountPaid),
    });
    setActiveTab("add");
  }, [editingPatient]);

  const resetForm = () => {
    setForm({ ...EMPTY_FORM, date: new Date().toISOString().split("T")[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      countryCode: `+${form.countryCode.replace(/^\+/, "")}`,
      contact: form.contact,
      age: form.age !== "" ? parseInt(form.age) : undefined,
      date: form.date,
      dayOfOPD: parseInt(form.dayOfOPD) || 1,
      condition: form.condition,
      address: form.address,
      amountPaid: parseInt(form.amountPaid) || 0,
    };

    if (editingPatient) {
      await patientService.update(editingPatient.id, payload);
      triggerSuccess("Patient updated successfully!");
      setEditingPatient(null);
    } else {
      await patientService.add(payload);
      triggerSuccess("Patient added successfully!");
    }

    resetForm();
    setRefreshKey((k) => k + 1);
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const cancelEdit = () => {
    setEditingPatient(null);
    resetForm();
  };

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      {/* Background dot pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#2dd4bf 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-lg border-b border-teal-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-teal-400 p-2 rounded-xl shadow-md">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-400 font-semibold hidden sm:block">
                Raj Healing Hands
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("isAdmin");
              window.location.reload();
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 border-2 border-red-100 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* ── Tab Bar ── */}
      <div className="sticky top-[57px] z-[99] bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex">
          {(["add", "view"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "add") cancelEdit();
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 text-sm font-bold border-b-[3px] transition-all ${
                activeTab === tab
                  ? "border-teal-500 text-teal-700 bg-teal-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "add" ? (
                <UserPlus className="h-4 w-4" />
              ) : (
                <ClipboardList className="h-4 w-4" />
              )}
              <span>
                {tab === "add"
                  ? editingPatient
                    ? "Edit Patient"
                    : "Add Patient"
                  : "View Records"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Success Toast ── */}
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

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-6">
        <AnimatePresence mode="wait">
          {activeTab === "add" ? (
            <MotionDiv
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-white rounded-2xl border-2 border-teal-50 shadow-xl p-4 sm:p-8">
                {/* Form header */}
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                      {editingPatient
                        ? "Edit Patient Record"
                        : "New Patient Record"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5 hidden sm:block">
                      {editingPatient
                        ? "Update the details below"
                        : "Fill in the patient details below"}
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

                <form
                  onSubmit={handleSubmit}
                  className="space-y-2.5 sm:space-y-4"
                >
                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                      Patient Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set("name")}
                        className={inputClass}
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  {/* Contact + Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    {/* Phone with inline country code */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                        Contact Number
                      </label>
                      <div className="flex rounded-xl border-2 border-slate-100 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 bg-slate-50 overflow-hidden transition-all">
                        {/* Country code text box */}
                        <div className="flex items-center pl-3 pr-1 border-r border-slate-200 shrink-0">
                          <Phone className="h-4 w-4 text-slate-400 mr-1 shrink-0" />
                          <span className="text-slate-500 font-bold text-sm">
                            +
                          </span>
                          <input
                            type="text"
                            value={form.countryCode}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                countryCode: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 4),
                              }))
                            }
                            className="w-10 bg-transparent outline-none font-bold text-slate-700 text-sm placeholder-slate-400"
                            placeholder="91"
                            maxLength={4}
                          />
                        </div>
                        {/* Phone number */}
                        <input
                          type="tel"
                          required
                          value={form.contact}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              contact: e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 15),
                            }))
                          }
                          className="flex-1 px-3 py-2.5 bg-transparent outline-none font-semibold text-slate-700 placeholder-slate-400 text-sm"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    {/* Age (optional) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                        Age{" "}
                        <span className="text-slate-300 normal-case font-medium">
                          (optional)
                        </span>
                      </label>
                      <div className="relative">
                        <Cake className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="number"
                          min={0}
                          max={120}
                          value={form.age}
                          onChange={set("age")}
                          className={inputClass}
                          placeholder="e.g. 35"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date + OPD Day */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                        Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                        <input
                          ref={dateInputRef}
                          type="date"
                          required
                          value={form.date}
                          onChange={set("date")}
                          onClick={() => {
                            try {
                              dateInputRef.current?.showPicker();
                            } catch (_) {}
                          }}
                          className={`${inputClass} cursor-pointer`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                        Day of OPD
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="number"
                          required
                          min={1}
                          value={form.dayOfOPD}
                          onChange={set("dayOfOPD")}
                          className={inputClass}
                          placeholder="e.g. 1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                      Condition / Diagnosis
                    </label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <textarea
                        required
                        rows={2}
                        value={form.condition}
                        onChange={set("condition")}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 outline-none bg-slate-50 transition-all font-semibold text-slate-700 placeholder-slate-400 text-sm resize-none"
                        placeholder="Describe the condition or diagnosis..."
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={form.address}
                        onChange={set("address")}
                        className={inputClass}
                        placeholder="Patient address"
                      />
                    </div>
                  </div>

                  {/* Amount Paid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                        Amount Paid (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="number"
                          required
                          min={0}
                          value={form.amountPaid}
                          onChange={set("amountPaid")}
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
                      <span>
                        {editingPatient ? "Update Patient" : "Save Patient"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </MotionDiv>
          ) : (
            <MotionDiv
              key="view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              <PatientList refreshKey={refreshKey} onEdit={setEditingPatient} />
            </MotionDiv>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
