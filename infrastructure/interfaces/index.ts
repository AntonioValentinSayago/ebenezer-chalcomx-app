/** Interfacte Tyoes */
import { Ionicons } from "@expo/vector-icons";

/** Interface para Departamentos */
export interface Department {
  id: string;
  name: string;
  leader: string;
  members: number;
  color: string;
  icon: keyof typeof Ionicons['name'] | string;
}

/** Interface para Las notificaciones */
export interface Notification  {
  id: string;
  photo?: string;
  date: string;
  title: string;
  excerpt?: string;
};