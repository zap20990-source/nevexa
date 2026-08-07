import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const DATA_DIR =
  process.env.VERCEL || process.env.NODE_ENV === "production"
    ? "/tmp"
    : path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  createdAt: string;
}

interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

function readUsers(): { users: StoredUser[] } {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      const seedData = {
        users: [
          {
            id: "admin-demo",
            name: "Admin NEVEXA",
            email: "admin@nevexa.com",
            password: "$2a$12$LJ3m4ys3GZfnYMz8kVsKZe0xGKeqN7rVqNHVNGpCB5zGXqOHqVpIq",
            role: "admin",
            phone: "3000000000",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
          {
            id: "user-demo",
            name: "Cliente Demo",
            email: "cliente@nevexa.com",
            password: "$2a$12$LJ3m4ys3GZfnYMz8kVsKZe0xGKeqN7rVqNHVNGpCB5zGXqOHqVpIq",
            role: "user",
            phone: "3001112233",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        ],
      };
      fs.writeFileSync(USERS_FILE, JSON.stringify(seedData, null, 2));
      return seedData;
    }
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { users: [] };
  }
}

function writeUsers(data: { users: StoredUser[] }) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

function toSafeUser(user: StoredUser): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
  };
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<SafeUser> {
  const store = readUsers();

  if (store.users.find((u) => u.email === data.email)) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const newUser: StoredUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "user",
    phone: data.phone,
    createdAt: new Date().toISOString(),
  };

  store.users.push(newUser);
  writeUsers(store);

  return toSafeUser(newUser);
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<SafeUser | null> {
  const store = readUsers();
  const user = store.users.find((u) => u.email === email);

  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return toSafeUser(user);
}

export function getUserByEmail(email: string): SafeUser | null {
  const store = readUsers();
  const user = store.users.find((u) => u.email === email);
  return user ? toSafeUser(user) : null;
}

export function getUserById(id: string): SafeUser | null {
  const store = readUsers();
  const user = store.users.find((u) => u.id === id);
  return user ? toSafeUser(user) : null;
}
