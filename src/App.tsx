import React, { useState, useEffect } from 'react';
import { Property, Reservation, Cleaner, CleaningTask } from './types';
import {
  initialProperties,
  initialCleaners,
  initialReservations,
  initialTasks,
  createDefaultChecklists
} from './data/mockData';
import { Language, translations } from './i18n/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { PmsView } from './components/PmsView';
import { HousekeepingView } from './components/HousekeepingView';
import { CleanerMobileView } from './components/CleanerMobileView';
import { Sparkles, Calendar, Smartphone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [currentTab, setCurrentTab] = useState<'pms' | 'resort' | 'cleaner'>('pms');
  const [forceCookieModal, setForceCookieModal] = useState(false);

  // User Profile
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>({
    name: 'Wagner & Alex (SuperAdmin)',
    email: 'helpus.ecommerce@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  });

  // Load from localStorage or mock
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('helpus_cleaning_properties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [cleaners, setCleaners] = useState<Cleaner[]>(() => {
    const saved = localStorage.getItem('helpus_cleaning_cleaners');
    return saved ? JSON.parse(saved) : initialCleaners;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('helpus_cleaning_reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  const [tasks, setTasks] = useState<CleaningTask[]>(() => {
    const saved = localStorage.getItem('helpus_cleaning_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('helpus_cleaning_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('helpus_cleaning_cleaners', JSON.stringify(cleaners));
  }, [cleaners]);

  useEffect(() => {
    localStorage.setItem('helpus_cleaning_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('helpus_cleaning_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handler: Add Booking (Automatically schedules a HelpUS Housekeeping turnover task!)
  const handleAddBooking = (newBookingData: Omit<Reservation, 'id'>) => {
    const newId = `res-${Date.now().toString().slice(-4)}`;
    const newBooking: Reservation = { ...newBookingData, id: newId };
    setReservations((prev) => [newBooking, ...prev]);

    // Automatic HelpUS Housekeeping turnover creation
    const prop = properties.find((p) => p.id === newBooking.propertyId);
    const assignedCleanerId = prop?.defaultCleanerId || cleaners[0]?.id;

    const newTask: CleaningTask = {
      id: `task-${Date.now().toString().slice(-4)}`,
      propertyId: newBooking.propertyId,
      reservationId: newId,
      cleanerId: assignedCleanerId,
      scheduledDate: newBooking.checkOut,
      timeWindow: '10:00 - 15:30',
      status: 'pending',
      payoutAmount: prop ? prop.cleanerPayout : 140,
      checklists: createDefaultChecklists().map((c) => ({
        ...c,
        items: c.items.map((i) => ({ ...i, done: false }))
      })),
      photos: [],
      damageReports: [],
      lostAndFound: []
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddProperty = (newPropData: Omit<Property, 'id'>) => {
    const newProp: Property = { ...newPropData, id: `prop-${Date.now().toString().slice(-4)}` };
    setProperties((prev) => [...prev, newProp]);
  };

  const handleUpdateTaskStatus = (taskId: string, status: CleaningTask['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const handleAssignCleaner = (taskId: string, cleanerId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, cleanerId } : t))
    );
  };

  const handleInspectTask = (taskId: string, score: number, inspector: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'inspected',
              inspectorScore: score,
              inspectorName: inspector,
              inspectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : t
      )
    );
  };

  const handleUpdateChecklist = (
    taskId: string,
    categoryIndex: number,
    itemId: string,
    done: boolean
  ) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newChecklists = [...t.checklists];
        const targetCategory = { ...newChecklists[categoryIndex] };
        targetCategory.items = targetCategory.items.map((i) =>
          i.id === itemId ? { ...i, done } : i
        );
        newChecklists[categoryIndex] = targetCategory;
        return { ...t, checklists: newChecklists };
      })
    );
  };

  const handleAddPhoto = (taskId: string, photoUrl: string, caption: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newPhoto = {
          id: `photo-${Date.now()}`,
          url: photoUrl,
          type: 'after' as const,
          caption,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return { ...t, photos: [...t.photos, newPhoto] };
      })
    );
  };

  const handleAddDamage = (taskId: string, room: string, description: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newDamage = {
          id: `dmg-${Date.now()}`,
          room,
          description,
          severity: 'medium' as const,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return { ...t, damageReports: [...t.damageReports, newDamage] };
      })
    );
  };

  const handleClockIn = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'in_progress',
              startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : t
      )
    );
  };

  const handleClockOut = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'completed',
              completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Official HelpUS Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        lang={lang}
        onLangChange={setLang}
        user={user}
        onLogin={() =>
          setUser({
            name: 'Alex & Wagner',
            email: 'helpus.ecommerce@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          })
        }
        onLogout={() => setUser(null)}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentTab === 'pms' && (
          <PmsView
            properties={properties}
            reservations={reservations}
            lang={lang}
            onAddBooking={handleAddBooking}
            onAddProperty={handleAddProperty}
          />
        )}

        {currentTab === 'resort' && (
          <HousekeepingView
            properties={properties}
            cleaners={cleaners}
            tasks={tasks}
            lang={lang}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onAssignCleaner={handleAssignCleaner}
            onInspectTask={handleInspectTask}
          />
        )}

        {currentTab === 'cleaner' && (
          <CleanerMobileView
            properties={properties}
            cleaners={cleaners}
            tasks={tasks}
            lang={lang}
            onUpdateChecklist={handleUpdateChecklist}
            onAddPhoto={handleAddPhoto}
            onAddDamage={handleAddDamage}
            onClockIn={handleClockIn}
            onClockOut={handleClockOut}
          />
        )}
      </main>

      {/* Official HelpUS Footer */}
      <Footer lang={lang} onOpenCookies={() => setForceCookieModal(true)} />

      {/* LGPD Cookie Consent */}
      <CookieBanner
        lang={lang}
        forceOpen={forceCookieModal}
        onCloseForceOpen={() => setForceCookieModal(false)}
      />
    </div>
  );
}
