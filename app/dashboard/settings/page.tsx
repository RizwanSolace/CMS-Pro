"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Globe2,
  Link2,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
} from "lucide-react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { settingservice } from "@/services/settingservice";

type SettingsState = {
  siteName: string;
  siteTagline: string;
  siteDescription: string;

  contact: {
    mapEmbedUrl: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };

  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    github: string;
  };

  seo: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    defaultOgImage: {
      url: string;
    };
  };

  footer: {
    copyrightText: string;
    privacyPolicyUrl: string;
    termsAndConditionsUrl: string;
  };

  logo: {
    url: string;
  };

  favicon: {
    url: string;
  };
};

const defaultSettings: SettingsState = {
  siteName: "",
  siteTagline: "",
  siteDescription: "",

  contact: {
    mapEmbedUrl: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
  },

  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    github: "",
  },

  seo: {
    defaultMetaTitle: "",
    defaultMetaDescription: "",
    defaultOgImage: {
      url: "",
    },
  },

  footer: {
    copyrightText: "",
    privacyPolicyUrl: "",
    termsAndConditionsUrl: "",
  },

  logo: {
    url: "",
  },

  favicon: {
    url: "",
  },
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<SettingsState>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await settingservice.get();

        console.log("Settings response:", response);

        if (response?.success && response?.data) {
          setSettings({
            ...defaultSettings,
            ...response.data,

            contact: {
              ...defaultSettings.contact,
              ...response.data.contact,
            },

            socialLinks: {
              ...defaultSettings.socialLinks,
              ...response.data.socialLinks,
            },

            seo: {
              ...defaultSettings.seo,
              ...response.data.seo,
              defaultOgImage: {
                ...defaultSettings.seo.defaultOgImage,
                ...response.data.seo?.defaultOgImage,
              },
            },

            footer: {
              ...defaultSettings.footer,
              ...response.data.footer,
            },

            logo: {
              ...defaultSettings.logo,
              ...response.data.logo,
            },

            favicon: {
              ...defaultSettings.favicon,
              ...response.data.favicon,
            },
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      await settingservice.update(settings);

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to update settings:", err);
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500">
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <Settings2 size={16} />
              CMS configuration
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Manage your website information, contact details,
              social links, SEO and footer configuration.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">
              Current site
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {settings.siteName || "CMS"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* GENERAL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Globe2 size={20} className="text-blue-600" />

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                General
              </h2>

              <p className="text-sm text-slate-500">
                Basic information about your website.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Site name"
              value={settings.siteName}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  siteName: e.target.value,
                }))
              }
            />

            <Input
              label="Tagline"
              value={settings.siteTagline}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  siteTagline: e.target.value,
                }))
              }
            />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Site description
              </span>

              <textarea
                rows={4}
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    siteDescription: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </label>
          </div>
        </section>

        {/* CONTACT */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Contact information
            </h2>

            <p className="text-sm text-slate-500">
              Contact information displayed on your website.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Email"
              type="email"
              value={settings.contact.email}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    email: e.target.value,
                  },
                }))
              }
            />

            <Input
              label="Phone"
              value={settings.contact.phone}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    phone: e.target.value,
                  },
                }))
              }
            />

            <Input
              label="WhatsApp"
              value={settings.contact.whatsapp}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    whatsapp: e.target.value,
                  },
                }))
              }
            />

            <Input
              label="Address"
              value={settings.contact.address}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    address: e.target.value,
                  },
                }))
              }
            />
          </div>

          <div className="mt-4">
            <Input
              label="Map embed URL"
              value={settings.contact.mapEmbedUrl}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    mapEmbedUrl: e.target.value,
                  },
                }))
              }
            />
          </div>
        </section>

        {/* SOCIAL LINKS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Share2 size={20} className="text-blue-600" />

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Social links
              </h2>

              <p className="text-sm text-slate-500">
                Manage your social media profiles.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                ["facebook", "Facebook"],
                ["instagram", "Instagram"],
                ["linkedin", "LinkedIn"],
                ["twitter", "Twitter / X"],
                ["youtube", "YouTube"],
                ["github", "GitHub"],
              ] as const
            ).map(([key, label]) => (
              <Input
                key={key}
                label={label}
                value={settings.socialLinks[key]}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    socialLinks: {
                      ...prev.socialLinks,
                      [key]: e.target.value,
                    },
                  }))
                }
              />
            ))}
          </div>
        </section>

        {/* SEO */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Search size={20} className="text-blue-600" />

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                SEO
              </h2>

              <p className="text-sm text-slate-500">
                Default metadata used by your website.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Default meta title"
              value={settings.seo.defaultMetaTitle}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    defaultMetaTitle: e.target.value,
                  },
                }))
              }
            />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Default meta description
              </span>

              <textarea
                rows={4}
                value={settings.seo.defaultMetaDescription}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    seo: {
                      ...prev.seo,
                      defaultMetaDescription: e.target.value,
                    },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </label>

            <Input
              label="Default OG image URL"
              value={settings.seo.defaultOgImage.url}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    defaultOgImage: {
                      url: e.target.value,
                    },
                  },
                }))
              }
            />
          </div>
        </section>

        {/* BRANDING */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Branding
            </h2>

            <p className="text-sm text-slate-500">
              Configure your website logo and favicon.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Logo URL"
              value={settings.logo.url}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  logo: {
                    url: e.target.value,
                  },
                }))
              }
            />

            <Input
              label="Favicon URL"
              value={settings.favicon.url}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  favicon: {
                    url: e.target.value,
                  },
                }))
              }
            />
          </div>
        </section>

        {/* FOOTER */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Link2 size={20} className="text-blue-600" />

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Footer
              </h2>

              <p className="text-sm text-slate-500">
                Configure footer content and legal page links.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Copyright text"
              value={settings.footer.copyrightText}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    copyrightText: e.target.value,
                  },
                }))
              }
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Privacy policy URL"
                value={settings.footer.privacyPolicyUrl}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      privacyPolicyUrl: e.target.value,
                    },
                  }))
                }
              />

              <Input
                label="Terms & conditions URL"
                value={settings.footer.termsAndConditionsUrl}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      termsAndConditionsUrl: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </section>

        {/* SAVE */}
        <div className="sticky bottom-4 z-10">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium text-slate-900">
                Save your changes
              </p>

              <p className="text-xs text-slate-500">
                Changes will be saved to the CMS backend.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {saved && (
                <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                  <CheckCircle2 size={16} />
                  Settings saved
                </div>
              )}

              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save settings"}
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </form>

      {/* INFO */}
      <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <ShieldCheck size={18} />
          Settings information
        </div>

        <p className="mt-3 text-sm text-slate-600">
          These settings are stored in the CMS backend and can be
          used across the public website. Only authorized users should
          be allowed to modify them.
        </p>
      </aside>
    </div>
  );
}