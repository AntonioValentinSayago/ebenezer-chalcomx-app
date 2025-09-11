import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Mode as BigCalMode, Calendar } from "react-native-big-calendar";

/** ---------- Types ---------- */
type Role = "ADMIN" | "USER";

type ChurchEvent = {
  id: string;
  title: string;
  type: "Doctrina" | "Evento";
  description?: string;
  start: Date;
  end: Date;
  color?: string;
};

/** ---------- Helpers ---------- */
const STORAGE_KEY = "@iglesia_events_v1";

const COLORS = ["#046473", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#7C3AED"];

function toLocalISOString(d: Date) {
  // Útil para inputs (si luego migras a DateTimePicker nativo, no lo necesitas).
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInput(v: string) {
  // "YYYY-MM-DDTHH:mm"
  const d = new Date(v);
  return isNaN(d.getTime()) ? new Date() : d;
}

/** ---------- Seed (primeros datos de ejemplo) ---------- */
const now = new Date();
const seedEvents: ChurchEvent[] = [
  {
    id: "e1",
    title: "Doctrina: Romanos 8",
    type: "Doctrina",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30),
    color: "#046473",
    description: "Estudio bíblico semanal",
  },
  {
    id: "e2",
    title: "Ensayo de Alabanza",
    type: "Evento",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 18, 30),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 20, 0),
    color: "#10B981",
  },
];

/** ---------- UI: Botoncito ---------- */
const Btn = ({ label, onPress, active = false }: { label: string; onPress?: () => void; active?: boolean }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-3 py-2 rounded-xl ${active ? "bg-[#046473]" : "bg-white"} border border-gray-200`}
    style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 2 }}
  >
    <Text className={`text-xs ${active ? "text-white" : "text-[#011936]"} font-semibold`}>{label}</Text>
  </TouchableOpacity>
);

/** ---------- UI: Toggle Rol ---------- */
const RoleToggle = ({ role, setRole }: { role: Role; setRole: (r: Role) => void }) => {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-2xl p-2 border border-gray-200">
      <TouchableOpacity
        onPress={() => setRole("USER")}
        className={`flex-1 p-3 rounded-xl mr-1 ${role === "USER" ? "bg-[#E6F3F5]" : "bg-transparent"}`}
      >
        <Text className={`text-center font-bold ${role === "USER" ? "text-[#046473]" : "text-[#011936]"}`}>Usuario</Text>
        <Text className="text-center text-gray-500 text-xs">Ver calendario</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRole("ADMIN")}
        className={`flex-1 p-3 rounded-xl ml-1 ${role === "ADMIN" ? "bg-[#E6F3F5]" : "bg-transparent"}`}
      >
        <Text className={`text-center font-bold ${role === "ADMIN" ? "text-[#046473]" : "text-[#011936]"}`}>Admin</Text>
        <Text className="text-center text-gray-500 text-xs">Crear/editar eventos</Text>
      </TouchableOpacity>
    </View>
  );
};

/** ---------- UI: Formulario Admin ---------- */
const AdminForm = ({
  onSubmit,
  defaults,
}: {
  onSubmit: (e: Omit<ChurchEvent, "id">) => void;
  defaults?: Partial<ChurchEvent>;
}) => {
  const [title, setTitle] = useState(defaults?.title ?? "");
  const [type, setType] = useState<"Doctrina" | "Evento">(defaults?.type ?? "Doctrina");
  const [description, setDescription] = useState(defaults?.description ?? "");
  const [startText, setStartText] = useState(toLocalISOString(defaults?.start ?? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0)).slice(0, 16));
  const [endText, setEndText] = useState(toLocalISOString(defaults?.end ?? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0)).slice(0, 16));
  const [color, setColor] = useState(defaults?.color ?? COLORS[0]);

  const submit = () => {
    const start = fromLocalInput(startText);
    const end = fromLocalInput(endText);
    if (!title.trim()) return Alert.alert("Falta el título", "Por favor escribe un título.");
    if (end <= start) return Alert.alert("Rango inválido", "La hora de fin debe ser mayor a la de inicio.");
    onSubmit({ title: title.trim(), type, description: description.trim(), start, end, color });
    setTitle("");
    setDescription("");
  };

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200 mt-3">
      <Text className="text-lg font-extrabold text-[#011936] mb-2">Crear evento / doctrina</Text>

      <View className="mb-3">
        <Text className="text-xs text-gray-500 mb-1">Título</Text>
        <TextInput
          placeholder="Ej. Doctrina: Fe y Obras"
          value={title}
          onChangeText={setTitle}
          className="border border-gray-200 rounded-xl px-3 py-2"
        />
      </View>

      <View className="mb-3">
        <Text className="text-xs text-gray-500 mb-1">Tipo</Text>
        <View className="flex-row">
          <Btn label="Doctrina" active={type === "Doctrina"} onPress={() => setType("Doctrina")} />
          <View className="w-2" />
          <Btn label="Evento" active={type === "Evento"} onPress={() => setType("Evento")} />
        </View>
      </View>

      <View className="mb-3">
        <Text className="text-xs text-gray-500 mb-1">Descripción (opcional)</Text>
        <TextInput
          placeholder="Detalle breve"
          value={description}
          onChangeText={setDescription}
          className="border border-gray-200 rounded-xl px-3 py-2"
        />
      </View>

      <View className="mb-3">
        <Text className="text-xs text-gray-500 mb-1">Inicio</Text>
        <TextInput
          value={startText}
          onChangeText={setStartText}
          className="border border-gray-200 rounded-xl px-3 py-2"
          placeholder="YYYY-MM-DDTHH:mm"
        />
      </View>

      <View className="mb-3">
        <Text className="text-xs text-gray-500 mb-1">Fin</Text>
        <TextInput
          value={endText}
          onChangeText={setEndText}
          className="border border-gray-200 rounded-xl px-3 py-2"
          placeholder="YYYY-MM-DDTHH:mm"
        />
      </View>

      <View className="mb-4">
        <Text className="text-xs text-gray-500 mb-2">Color</Text>
        <View className="flex-row flex-wrap gap-2">
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setColor(c)}
              className="w-8 h-8 rounded-full border border-gray-200"
              style={{ backgroundColor: c, transform: [{ scale: color === c ? 1.05 : 1 }] }}
            />
          ))}
        </View>
      </View>

      <View className="flex-row">
        <Btn label="Guardar" active onPress={submit} />
      </View>
    </View>
  );
};

/** ---------- UI: Header tipo Google Calendar ---------- */
const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  mode,
  setMode,
}: {
  currentDate: Date;
  setCurrentDate: (d: Date) => void;
  mode: BigCalMode;
  setMode: (m: BigCalMode) => void;
}) => {
  const monthLabel = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const addDays = (days: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d);
  };

  const goToday = () => setCurrentDate(new Date());

  const switchMode = (m: BigCalMode) => setMode(m);

  return (
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center gap-2">
        <Btn label="Hoy" onPress={goToday} />
        <TouchableOpacity onPress={() => addDays(- (mode === "month" ? 30 : mode === "week" ? 7 : 1))} className="p-2">
          <Ionicons name="chevron-back" size={20} color="#011936" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addDays((mode === "month" ? 30 : mode === "week" ? 7 : 1))} className="p-2">
          <Ionicons name="chevron-forward" size={20} color="#011936" />
        </TouchableOpacity>
        <Text className="text-lg font-extrabold text-[#011936] ml-1 capitalize">{monthLabel}</Text>
      </View>
      <View className="flex-row gap-2">
        <Btn label="Día" active={mode === "day"} onPress={() => switchMode("day")} />
        <Btn label="Semana" active={mode === "week"} onPress={() => switchMode("week")} />
        <Btn label="Mes" active={mode === "month"} onPress={() => switchMode("month")} />
      </View>
    </View>
  );
};

/** ---------- Main ---------- */
export default function App() {
  const [role, setRole] = useState<Role>("ADMIN");
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [mode, setMode] = useState<BigCalMode>("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [search, setSearch] = useState("");

  // Cargar eventos (persistencia simple)
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ChurchEvent[];
          // Re-hidratar fechas
          setEvents(parsed.map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) })));
        } else {
          setEvents(seedEvents);
        }
      } catch (e) {
        setEvents(seedEvents);
      }
    })();
  }, []);

  // Guardar eventos
  const persist = async (next: ChurchEvent[]) => {
    setEvents(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { }
  };

  const handleCreate = (e: Omit<ChurchEvent, "id">) => {
    const newEvent: ChurchEvent = { id: Math.random().toString(36).slice(2), ...e };
    persist([...events, newEvent]);
    Alert.alert("Evento guardado", "Tu evento se añadió al calendario.");
  };

  const bigCalendarEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events
      .filter(ev => q ? (ev.title.toLowerCase().includes(q) || ev.type.toLowerCase().includes(q)) : true)
      .map(ev => ({
        title: `${ev.type === "Doctrina" ? "📖 " : "📅 "}${ev.title}`,
        start: ev.start,
        end: ev.end,
        color: ev.color || "#046473", // este campo es válido aunque no esté tipado
      }));
  }, [events, search]);


  return (
    <SafeAreaView className="flex-1">
      {/* Fondo con gradiente suave (simple) */}
      <View className="absolute inset-0" style={{ backgroundColor: "#F7FBFC" }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 28 }} className="flex-1">
        <View className="px-4 pt-4">
          {/* Encabezado */}
          <View className="mb-3">
            <Text className="text-2xl font-extrabold text-[#011936]">Agenda Iglesia</Text>
            <Text className="text-gray-500 mt-1">
              Admin crea eventos y los usuarios los ven en el calendario.
            </Text>
          </View>

          {/* Toggle de rol */}
          <RoleToggle role={role} setRole={setRole} />

          {/* Buscador */}
          <View className="mt-3 bg-white rounded-2xl border border-gray-200 flex-row items-center px-3">
            <Ionicons name="search" size={18} color="#6B7280" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar por título o tipo (Doctrina/Evento)…"
              className="flex-1 px-2 py-3"
            />
            {search ? (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Calendario */}
          <View className="mt-3 bg-white rounded-2xl p-3 border border-gray-200">
            <CalendarHeader
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              mode={mode}
              setMode={setMode}
            />
            <View className="h-[640px] overflow-hidden rounded-xl border border-gray-100">
              <Calendar
                events={bigCalendarEvents}
                height={640}
                mode={mode}
                date={currentDate}
                swipeEnabled
                weekStartsOn={1}        // Lunes
                hourRowHeight={50}
                overlapOffset={8}
                ampm      // reloj 12h
                eventCellStyle={(e) => ({ backgroundColor: (e as any).color || "#046473", borderRadius: 10 })}
                calendarCellStyle={{}}
                headerContainerStyle={{
                  ...Platform.select({
                    ios: { paddingVertical: 6 },
                    android: { paddingVertical: 6 },
                    default: { paddingVertical: 6 },
                  }),
                }}
                bodyContainerStyle={{}}
                onPressEvent={(e) => {
                  Alert.alert("Detalle", `${e.title}\n\n${e.start.toLocaleString()} - ${e.end.toLocaleString()}`);
                }}
              />
            </View>
          </View>

          {/* Panel Admin */}
          {role === "ADMIN" && (
            <AdminForm onSubmit={handleCreate} />
          )}

          {/* Tips rápidos */}
          <View className="mt-4 p-3 bg-white rounded-2xl border border-gray-200">
            <Text className="font-bold text-[#011936] mb-1">Siguientes pasos (optativo)</Text>
            <Text className="text-gray-600 text-sm">
              • Sustituye los inputs de fecha/hora por DateTimePicker de Expo.{"\n"}
              • Añade edición/eliminación de eventos (mantén el mismo `id`).{"\n"}
              • Sincroniza con un backend (Supabase/Firebase) para multiusuario real.{"\n"}
              • Control de roles real con auth (por ahora es un toggle local).{"\n"}
              • Bloquea solapamientos según sala/ministro si aplica.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
