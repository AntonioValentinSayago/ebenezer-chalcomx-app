import React, { createContext, useContext, useMemo, useState } from 'react';
import { Alert, Image, Modal, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
 
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from 'moti';

/**
 * Church Admin Dashboard (Single-file demo)
 * - Expo + NativeWind + Moti animations
 * - Role validation (admin vs member)
 * - Profile (change avatar), personal data
 * - Add church member
 * - Add department
 *
 * Notes:
 * - Replace in-memory state with your API/DB as needed.
 * - This is a single-file demo to copy into App.tsx.
 * - Ensure NativeWind is configured (babel plugin + tailwind config).
 */

// ---------- Types ----------
export type Role = 'admin' | 'member';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUri?: string;
  role: Role;
}

interface ChurchMember {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  departmentId?: string;
}

interface Department {
  id: string;
  name: string;
  leader: string;
  color: string; // hex or tailwind token
}

// ---------- Mock Data ----------
const seedDepartments: Department[] = [
  { id: 'd1', name: 'Worship', leader: 'Ana Martínez', color: '#EEF2FF' },
  { id: 'd2', name: 'Usher', leader: 'Carlos Díaz', color: '#ECFEFF' },
  { id: 'd3', name: 'Kids', leader: 'Paola Ruiz', color: '#F0FDF4' },
];

// ---------- Auth & App State Context ----------
interface AppState {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
  departments: Department[];
  setDepartments: (d: Department[]) => void;
  members: ChurchMember[];
  setMembers: (m: ChurchMember[]) => void;
}

const AppCtx = createContext<AppState | null>(null);

const useApp = () => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within <AppProvider />');
  return ctx;
};

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    id: 'u1',
    fullName: 'Pr. Daniel Herrera',
    email: 'pastor@example.com',
    phone: '+52 55 1234 5678',
    role: 'admin',
    avatarUri: undefined,
  });
  const [departments, setDepartments] = useState<Department[]>(seedDepartments);
  const [members, setMembers] = useState<ChurchMember[]>([]);

  const value = useMemo(() => ({ user, setUser, departments, setDepartments, members, setMembers }), [user, departments, members]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

// ---------- UI Primitives ----------
const Card: React.FC<React.PropsWithChildren<{ title?: string; action?: React.ReactNode; className?: string }>> = ({ title, action, className, children }) => (
  <MotiView
    from={{ opacity: 0, translateY: 8 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: 'timing', duration: 350 }}
    className={`rounded-2xl p-4 bg-white shadow-md ${className ?? ''}`}
  >
    {!!title && (
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-neutral-900">{title}</Text>
        {action}
      </View>
    )}
    {children}
  </MotiView>
);

const Button: React.FC<React.PropsWithChildren<{ onPress?: () => void; variant?: 'primary' | 'outline' | 'ghost'; className?: string; disabled?: boolean }>> = ({ onPress, variant = 'primary', className, disabled, children }) => {
  const base = 'px-4 py-3 rounded-2xl items-center justify-center';
  const styles =
    variant === 'primary'
      ? 'bg-neutral-900'
      : variant === 'outline'
      ? 'border border-neutral-300'
      : 'bg-transparent';
  const text = variant === 'primary' ? 'text-white' : 'text-neutral-900';
  const opacity = disabled ? 'opacity-50' : '';
  return (
    <Pressable onPress={disabled ? undefined : onPress} className={`${base} ${styles} ${opacity} ${className ?? ''}`}> 
      <Text className={`font-medium ${text}`}>{children}</Text>
    </Pressable>
  );
};

const Input: React.FC<{
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
  editable?: boolean;
}> = ({ label, value, onChangeText, placeholder, keyboardType, editable = true }) => (
  <View className="mb-3">
    <Text className="mb-1 text-xs font-medium text-neutral-600">{label}</Text>
    <TextInput
      className={`rounded-xl border border-neutral-200 px-3 py-2 ${editable ? 'bg-white' : 'bg-neutral-100'}`}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      editable={editable}
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

// ---------- Feature: Profile & Personal Data ----------
const ProfileCard: React.FC = () => {
  const { user, setUser } = useApp();

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow photo library access to change your avatar.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, aspect: [1, 1], quality: 0.8, allowsEditing: true });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) setUser({ ...user, avatarUri: uri });
    }
  };

  return (
    <Card title="Profile" action={<Button variant="outline" onPress={pickAvatar}>Change Photo</Button>}>
      <View className="flex-row items-center">
        <View className="h-20 w-20 mr-4 rounded-full overflow-hidden bg-neutral-100">
          {user.avatarUri ? (
            <Image source={{ uri: user.avatarUri }} className="h-full w-full" resizeMode="cover" />
          ) : (
            <View className="h-full w-full items-center justify-center">
              <Text className="text-neutral-400">No Avatar</Text>
            </View>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-neutral-900">{user.fullName}</Text>
          <Text className="text-neutral-600">{user.email}</Text>
          <Text className="text-neutral-600">Role: {user.role.toUpperCase()}</Text>
        </View>
      </View>
    </Card>
  );
};

const PersonalDataCard: React.FC = () => {
  const { user, setUser } = useApp();
  const [form, setForm] = useState({ fullName: user.fullName, email: user.email, phone: user.phone });

  const save = () => {
    if (!form.fullName.trim()) return Alert.alert('Validation', 'Full name is required.');
    if (!form.email.includes('@')) return Alert.alert('Validation', 'A valid email is required.');
    setUser({ ...user, ...form });
    Alert.alert('Saved', 'Your personal data has been updated.');
  };

  return (
    <Card title="Personal Data" action={<Button onPress={save}>Save</Button>}>
      <Input label="Full Name" value={form.fullName} onChangeText={(t) => setForm((s) => ({ ...s, fullName: t }))} placeholder="e.g. John Doe" />
      <Input label="Email" value={form.email} onChangeText={(t) => setForm((s) => ({ ...s, email: t }))} placeholder="e.g. name@church.org" keyboardType="email-address" />
      <Input label="Phone" value={form.phone} onChangeText={(t) => setForm((s) => ({ ...s, phone: t }))} placeholder="e.g. +52 55 0000 0000" keyboardType="phone-pad" />
    </Card>
  );
};

// ---------- Feature: Add Member ----------
const AddMemberCard: React.FC = () => {
  const { departments, members, setMembers } = useApp();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', departmentId: departments[0]?.id ?? '' });

  const submit = () => {
    if (!form.fullName.trim()) return Alert.alert('Validation', 'Member name is required.');
    if (!form.email.includes('@')) return Alert.alert('Validation', 'Valid email is required.');
    const id = `m_${Date.now()}`;
    setMembers([...members, { id, fullName: form.fullName.trim(), email: form.email.trim(), phone: form.phone.trim(), departmentId: form.departmentId || undefined }]);
    setVisible(false);
    setForm({ fullName: '', email: '', phone: '', departmentId: departments[0]?.id ?? '' });
    Alert.alert('Success', 'Member added successfully.');
  };

  return (
    <Card
      title="Add Church Member"
      action={<Button onPress={() => setVisible(true)}>New</Button>}
    >
      <Text className="text-neutral-600">Quickly register a new church member and optionally assign a department.</Text>
      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="p-4 border-b border-neutral-200 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">New Member</Text>
            <Button variant="ghost" onPress={() => setVisible(false)}>Close</Button>
          </View>
          <ScrollView className="p-4">
            <Input label="Full Name" value={form.fullName} onChangeText={(t) => setForm((s) => ({ ...s, fullName: t }))} />
            <Input label="Email" value={form.email} onChangeText={(t) => setForm((s) => ({ ...s, email: t }))} keyboardType="email-address" />
            <Input label="Phone" value={form.phone} onChangeText={(t) => setForm((s) => ({ ...s, phone: t }))} keyboardType="phone-pad" />

            <Text className="mb-1 text-xs font-medium text-neutral-600">Department</Text>
            <View className="rounded-xl border border-neutral-200 mb-4 overflow-hidden">
              {departments.map((d) => (
                <Pressable key={d.id} onPress={() => setForm((s) => ({ ...s, departmentId: d.id }))} className={`px-3 py-3 ${form.departmentId === d.id ? 'bg-neutral-100' : 'bg-white'}`}>
                  <Text className="text-neutral-900">{d.name} • Leader: {d.leader}</Text>
                </Pressable>
              ))}
            </View>

            <Button onPress={submit}>Add Member</Button>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </Card>
  );
};

// ---------- Feature: Add Department ----------
const AddDepartmentCard: React.FC = () => {
  const { departments, setDepartments } = useApp();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', leader: '', color: '#F5F5F5' });

  const submit = () => {
    if (!form.name.trim()) return Alert.alert('Validation', 'Department name is required.');
    if (!form.leader.trim()) return Alert.alert('Validation', 'Leader name is required.');
    const id = `d_${Date.now()}`;
    setDepartments([...departments, { id, name: form.name.trim(), leader: form.leader.trim(), color: form.color }]);
    setVisible(false);
    setForm({ name: '', leader: '', color: '#F5F5F5' });
    Alert.alert('Success', 'Department created successfully.');
  };

  return (
    <Card title="Add Department" action={<Button onPress={() => setVisible(true)}>New</Button>}>
      <Text className="text-neutral-600">Create a new department and assign a leader.</Text>
      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="p-4 border-b border-neutral-200 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">New Department</Text>
            <Button variant="ghost" onPress={() => setVisible(false)}>Close</Button>
          </View>
          <ScrollView className="p-4">
            <Input label="Department Name" value={form.name} onChangeText={(t) => setForm((s) => ({ ...s, name: t }))} />
            <Input label="Leader" value={form.leader} onChangeText={(t) => setForm((s) => ({ ...s, leader: t }))} />

            <Text className="mb-1 text-xs font-medium text-neutral-600">Card Accent (hex color)</Text>
            <TextInput
              className="rounded-xl border border-neutral-200 px-3 py-2 mb-4"
              value={form.color}
              onChangeText={(t) => setForm((s) => ({ ...s, color: t }))}
              placeholder="#F5F5F5"
              autoCapitalize="none"
            />

            <Button onPress={submit}>Create Department</Button>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </Card>
  );
};

// ---------- Lists / Overview ----------
const DepartmentsOverview: React.FC = () => {
  const { departments } = useApp();
  return (
    <Card title="Departments">
      <View className="-mx-1 flex-row flex-wrap">
        {departments.map((d) => (
          <View key={d.id} className="w-1/2 p-1">
            <View className="rounded-2xl p-3" style={{ backgroundColor: d.color }}>
              <Text className="text-neutral-900 font-semibold">{d.name}</Text>
              <Text className="text-neutral-700">Leader: {d.leader}</Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};

const MembersOverview: React.FC = () => {
  const { members, departments } = useApp();
  const getDeptName = (id?: string) => departments.find((d) => d.id === id)?.name ?? '—';
  return (
    <Card title="Recent Members">
      {members.length === 0 ? (
        <Text className="text-neutral-600">No members yet. Add the first one!</Text>
      ) : (
        <View className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 overflow-hidden">
          {members.slice(-6).reverse().map((m) => (
            <View key={m.id} className="p-3 bg-white">
              <Text className="font-medium text-neutral-900">{m.fullName}</Text>
              <Text className="text-neutral-600">{m.email} • {getDeptName(m.departmentId)}</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
};

// ---------- Role Gate ----------
const RoleGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  if (user.role !== 'admin') {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        <ScrollView className="flex-1 p-4">
          <ProfileCard />
          <Card>
            <Text className="text-neutral-900 font-semibold mb-1">Restricted Area</Text>
            <Text className="text-neutral-600">You have permission to access the admin dashboard. Please contact your pastor or church admin.</Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return <>{children}</>;
};

// ---------- Dashboard ----------
const AdminDashboardScreen: React.FC = () => {
  const { user, setUser } = useApp();

  const toggleRoleForDemo = () => {
    setUser({ ...user, role: user.role === 'admin' ? 'member' : 'admin' });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-neutral-900">Church Admin</Text>
          <Button variant="outline" onPress={toggleRoleForDemo}>Switch to {user.role === 'admin' ? 'Member' : 'Admin'}</Button>
        </View>

        <ProfileCard />
        <View className="h-3" />
        <PersonalDataCard />

        <View className="h-3" />
        <View className="flex-row gap-3">
          <View className="flex-1">
            <AddMemberCard />
          </View>
          <View className="flex-1">
            <AddDepartmentCard />
          </View>
        </View>

        <View className="h-3" />
        <DepartmentsOverview />
        <View className="h-3" />
        <MembersOverview />

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

// ---------- App Root ----------
export default function App() {
  return (
    <AppProvider>
      <RoleGate>
        <AdminDashboardScreen />
      </RoleGate>
    </AppProvider>
  );
}

// ---------- Setup Checklist ----------
// 1) Install deps:
//    expo install expo-image-picker
//    npm i nativewind moti
// 2) Configure NativeWind (tailwind.config.js) and Babel plugin.
// 3) If you later add navigation, install react-navigation.
// 4) Replace mock state with your backend/auth provider and real role checks.
