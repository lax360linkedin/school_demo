"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Building,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Globe,
  RotateCcw,
  CheckCircle,
  Save,
  ShieldAlert,
} from "lucide-react";
import { AdminStorage, AdminSettings } from "@/lib/adminStorage";
import { useAdminToast } from "@/components/admin/AdminToast";

export default function AdminSettingsPage() {
  const toast = useAdminToast();
  const [settings, setSettings] = useState<AdminSettings | null>(null);

  // Form states
  const [schoolName, setSchoolName] = useState("");
  const [tagline, setTagline] = useState("");
  const [established, setEstablished] = useState(2004);
  const [admissionsEmail, setAdmissionsEmail] = useState("");
  const [generalEmail, setGeneralEmail] = useState("");
  const [admissionsPhone, setAdmissionsPhone] = useState("");
  const [generalPhone, setGeneralPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");
  const [curriculum, setCurriculum] = useState("");

  // Social
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    const s = AdminStorage.getSettings();
    setSettings(s);
    setSchoolName(s.schoolName);
    setTagline(s.tagline);
    setEstablished(s.established);
    setAdmissionsEmail(s.admissionsEmail);
    setGeneralEmail(s.generalEmail);
    setAdmissionsPhone(s.admissionsPhone);
    setGeneralPhone(s.generalPhone);
    setWhatsApp(s.whatsApp);
    setAddress(s.address);
    setHours(s.hours);
    setCurriculum(s.academicCurriculum.join(", "));
    setInstagram(s.social.instagram);
    setFacebook(s.social.facebook);
    setYoutube(s.social.youtube);
    setLinkedin(s.social.linkedin);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currArr = curriculum
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const newSettings: AdminSettings = {
      schoolName,
      tagline,
      established: Number(established),
      admissionsEmail,
      generalEmail,
      admissionsPhone,
      generalPhone,
      whatsApp,
      address,
      hours,
      primaryColor: settings?.primaryColor || "#0F172A",
      academicCurriculum: currArr,
      social: {
        instagram,
        facebook,
        youtube,
        linkedin,
      },
    };

    setSettings(newSettings);
    AdminStorage.saveSettings(newSettings);
    toast.success("Institutional settings updated successfully.");
  };

  const handleFactoryReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all portal data to the original demo state? All added or modified programs, events, and inquiries will revert to defaults."
      )
    ) {
      AdminStorage.resetToDefaults();
      toast.info("Portal reset to factory defaults.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  if (!settings) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Portal & Institutional Configuration
        </h2>
        <p className="text-sm text-slate-700 mt-1">
          Configure school identity, admissions hotlines, WhatsApp numbers, and global accreditations
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: School Identity */}
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-5 h-5 text-slate-900" />
            <h3 className="text-base font-bold text-slate-900">Institutional Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Institution Name
              </label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Founding Year
              </label>
              <input
                type="number"
                value={established}
                onChange={(e) => setEstablished(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Institutional Motto / Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Campus Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Academic Accreditations & Boards (comma separated)
            </label>
            <input
              type="text"
              value={curriculum}
              onChange={(e) => setCurriculum(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Section 2: Admissions & Communication Channels */}
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Phone className="w-5 h-5 text-slate-900" />
            <h3 className="text-base font-bold text-slate-900">Communication & Admissions Lines</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Admissions Hotline
              </label>
              <input
                type="text"
                value={admissionsPhone}
                onChange={(e) => setAdmissionsPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                General Reception Phone
              </label>
              <input
                type="text"
                value={generalPhone}
                onChange={(e) => setGeneralPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Admissions Email
              </label>
              <input
                type="email"
                value={admissionsEmail}
                onChange={(e) => setAdmissionsEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                General Queries Email
              </label>
              <input
                type="email"
                value={generalEmail}
                onChange={(e) => setGeneralEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Desk Number
              </label>
              <input
                type="text"
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Campus Operating Hours
              </label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Social & Online Handles */}
        <div className="p-6 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-5 h-5 text-slate-900" />
            <h3 className="text-base font-bold text-slate-900">Social Media Handles</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleFactoryReset}
            className="min-h-[44px] h-[44px] px-5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-sm font-semibold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data to Defaults</span>
          </button>

          <button
            type="submit"
            className="min-h-[44px] h-[44px] px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-all w-full sm:w-auto justify-center cursor-pointer"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
