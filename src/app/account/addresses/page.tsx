"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Plus, Check, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

const STORAGE_KEY = "nevexa-addresses";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

const defaultAddresses: Address[] = [
  { id: "a1", street: "Calle 123 #45-67", city: "Bogotá", state: "Cundinamarca", country: "Colombia", zipCode: "110111", isDefault: true },
  { id: "a2", street: "Carrera 89 #12-34 Apto 501", city: "Medellín", state: "Antioquia", country: "Colombia", zipCode: "050001", isDefault: false },
];

function loadAddresses(): Address[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAddresses));
    return defaultAddresses;
  } catch {
    return defaultAddresses;
  }
}

function saveAddresses(addrs: Address[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addrs));
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ street: "", city: "", state: "", zipCode: "" });

  useState(() => {
    setAddresses(loadAddresses());
    setLoaded(true);
  });

  if (!loaded) return <div className="min-h-screen flex items-center justify-center"><div className="skeleton w-8 h-8 rounded-full" /></div>;

  const handleSave = () => {
    if (!form.street || !form.city || !form.state || !form.zipCode) {
      toast.error("Completa todos los campos");
      return;
    }
    const newAddresses = [...addresses];
    if (editId) {
      const idx = newAddresses.findIndex((a) => a.id === editId);
      if (idx >= 0) newAddresses[idx] = { ...newAddresses[idx], ...form };
    } else {
      newAddresses.push({ id: `a${Date.now()}`, ...form, country: "Colombia", isDefault: newAddresses.length === 0 });
    }
    setAddresses(newAddresses);
    saveAddresses(newAddresses);
    setShowForm(false);
    setEditId(null);
    setForm({ street: "", city: "", state: "", zipCode: "" });
    toast.success(editId ? "Dirección actualizada" : "Dirección agregada");
  };

  const handleDelete = (id: string) => {
    const filtered = addresses.filter((a) => a.id !== id);
    if (addresses.find((a) => a.id === id)?.isDefault && filtered.length > 0) {
      filtered[0].isDefault = true;
    }
    setAddresses(filtered);
    saveAddresses(filtered);
    toast.success("Dirección eliminada");
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    setAddresses(updated);
    saveAddresses(updated);
    toast.success("Dirección principal actualizada");
  };

  const openEdit = (addr: Address) => {
    setEditId(addr.id);
    setForm({ street: addr.street, city: addr.city, state: addr.state, zipCode: addr.zipCode });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white">Mis direcciones</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Gestiona tus direcciones de envío</p>
          </div>
          <button onClick={() => { setEditId(null); setForm({ street: "", city: "", state: "", zipCode: "" }); setShowForm(true); }} className="btn-primary gap-2 text-sm">
            <Plus className="w-4 h-4" /> Nueva dirección
          </button>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { href: "/account/orders", label: "Pedidos" },
            { href: "/account/profile", label: "Perfil" },
            { href: "/account/favorites", label: "Favoritos" },
            { href: "/account/addresses", label: "Direcciones", active: true },
          ].map((tab) => (
            <Link key={tab.href} href={tab.href} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab.active ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
              {tab.label}
            </Link>
          ))}
        </div>

        {showForm && (
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-dark dark:text-white">{editId ? "Editar dirección" : "Nueva dirección"}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="btn-ghost p-1"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <input type="text" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="Dirección (calle, número, apto)" className="input-field" />
              </div>
              <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Ciudad" className="input-field" />
              <input type="text" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Departamento" className="input-field" />
              <input type="text" value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} placeholder="Código postal" className="input-field" />
            </div>
            <button onClick={handleSave} className="btn-primary mt-4">{editId ? "Guardar cambios" : "Agregar dirección"}</button>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="card p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Sin direcciones</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Agrega una dirección para tus envíos</p>
            <button onClick={() => { setEditId(null); setForm({ street: "", city: "", state: "", zipCode: "" }); setShowForm(true); }} className="btn-primary">Agregar dirección</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="card p-6 relative">
                {addr.isDefault && <span className="absolute top-3 right-3 text-xs font-medium bg-success/10 text-success px-2 py-0.5 rounded-full">Principal</span>}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-dark dark:text-white">{addr.street}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{addr.city}, {addr.state}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{addr.country} - CP: {addr.zipCode}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button onClick={() => openEdit(addr)} className="text-sm text-primary hover:underline">Editar</button>
                  {!addr.isDefault && (
                    <button onClick={() => handleSetDefault(addr.id)} className="text-sm text-gray-500 hover:text-success flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Principal
                    </button>
                  )}
                  <button onClick={() => handleDelete(addr.id)} className="text-sm text-red-500 hover:underline ml-auto flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
