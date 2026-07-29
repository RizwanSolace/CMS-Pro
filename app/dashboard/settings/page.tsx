"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

type SettingsState = {
  siteName: string;
  tagline: string;
  adminEmail: string;
  contactPhone: string;
  footerText: string;
  timezone: string;
  notifications: "all" | "important" | "none";
  autoSave: boolean;
  showTips: boolean;
};

const defaultSettings: SettingsState = {
  siteName: "CMS Pro",
  tagline: "Modern content management",
  adminEmail: "admin@cmspro.com",
  contactPhone: "+1 555 0123",
  footerText: "A modern content experience for growing brands.",
  timezone: "Asia/Karachi",
  notifications: "all",
  autoSave: true,
  showTips: true,
};

const timezoneOptions = [
  "UTC",
  "Asia/Karachi",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedSettings = window.localStorage.getItem("cms-pro-settings");

    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch {
        window.localStorage.removeItem("cms-pro-settings");
      }
    }
  }, []);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    window.localStorage.setItem("cms-pro-settings", JSON.stringify(settings));
    setSaved(true);

    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              Workspace preferences
            </div>

            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="mt-2 max-w-2xl text-slate-500">
              Manage the defaults for your CMS workspace, notifications, and day-to-day workflow.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Current setup</p>
            <p className="mt-1">{settings.siteName} • {settings.timezone}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={handleSave}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">General</h2>
              <p className="text-sm text-slate-500">
                Update the name and contact details that appear across the workspace.
              </p>
            </div>

            <Input
              label="Site name"
              value={settings.siteName}
              onChange={(event) =>
                setSettings((prev) => ({ ...prev, siteName: event.target.value }))
              }
            />

            <Input
              label="Tagline"
              value={settings.tagline}
              onChange={(event) =>
                setSettings((prev) => ({ ...prev, tagline: event.target.value }))
              }
            />

            <Input
              label="Admin email"
              type="email"
              value={settings.adminEmail}
              onChange={(event) =>
                setSettings((prev) => ({ ...prev, adminEmail: event.target.value }))
              }
            />

            <Input
              label="Contact phone"
              value={settings.contactPhone}
              onChange={(event) =>
                setSettings((prev) => ({ ...prev, contactPhone: event.target.value }))
              }
            />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Footer text</span>
              <textarea
                rows={3}
                value={settings.footerText}
                onChange={(event) =>
                  setSettings((prev) => ({ ...prev, footerText: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Timezone</span>
              <select
                value={settings.timezone}
                onChange={(event) =>
                  setSettings((prev) => ({ ...prev, timezone: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {timezoneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Bell size={18} />
                Notifications
              </h2>
              <p className="text-sm text-slate-500">
                Choose how the team should be notified about content updates and approvals.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Email preference</span>
              <select
                value={settings.notifications}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: event.target.value as SettingsState["notifications"],
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="all">All updates</option>
                <option value="important">Important only</option>
                <option value="none">Do not notify</option>
              </select>
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
              <div>
                <p className="font-medium text-slate-900">Auto-save drafts</p>
                <p className="text-sm text-slate-500">Keep work safe while editing pages.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(event) =>
                  setSettings((prev) => ({ ...prev, autoSave: event.target.checked }))
                }
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
              <div>
                <p className="font-medium text-slate-900">Show helpful tips</p>
                <p className="text-sm text-slate-500">Display quick suggestions for new team members.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showTips}
                onChange={(event) =>
                  setSettings((prev) => ({ ...prev, showTips: event.target.checked }))
                }
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit">Save settings</Button>

            {saved && (
              <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle2 size={16} />
                Preferences saved
              </div>
            )}
          </div>
        </form>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <ShieldCheck size={18} />
            What this page covers
          </div>

          <ul className="space-y-3 text-sm text-slate-600">
            <li>• General workspace information for admins and editors.</li>
            <li>• Notification preferences for content approvals and updates.</li>
            <li>• Small workflow defaults to make the CMS easier to manage.</li>
          </ul>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
            These values are saved locally in your browser so they stay available on this device.
          </div>
        </aside>
      </div>
    </div>
  );
}
