const USERS = [
  { username: "lgpr",     password: "lgpr1",   role: "goat" },
  { username: "StockGiver1", password: "stocks123",   role: "stockgiver" },
  { username: "StockGiver2", password: "giver456",    role: "stockgiver" },
];

function saveSession(user) {
  sessionStorage.setItem("sg_user", JSON.stringify(user));
}

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem("sg_user"));
  } catch { return null; }
}

function clearSession() {
  sessionStorage.removeItem("sg_user");
}

function login(username, password) {
  const user = USERS.find(
    u => u.username.toLowerCase() === username.toLowerCase() &&
         u.password === password
  );
  if (user) {
    saveSession({ username: user.username, role: user.role });
    return user;
  }
  return null;
}

function requireGoat() {
  const s = getSession();
  if (!s || s.role !== "goat") {
    window.location.replace("index.html");
  }
}

function requireStockGiver() {
  const s = getSession();
  if (!s || s.role !== "stockgiver") {
    window.location.replace("index.html");
  }
}

function requireAnyLogin() {
  const s = getSession();
  if (!s) window.location.replace("index.html");
}

const DB_KEY = "goat_stocks_db";

function dbLoad() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || { published: false, items: defaultItems() };
  } catch { return { published: false, items: defaultItems() }; }
}

function dbSave(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function defaultItems() {
  return [
    { id: "crr",            label: "CRR",              count: 1, img: "" },
    { id: "drops2x",        label: "2x DROPS",         count: 1, img: "" },
    { id: "luck2x",         label: "2x LUCK",          count: 1, img: "" },
    { id: "cosmeticcrate",  label: "COSMETIC CRATE",   count: 1, img: "" },
    { id: "relics",         label: "RELICS",           count: 1, img: "" },
    { id: "setsreaper",     label: "SETS (REAPER)",    count: 1, img: "" },
    { id: "aura",           label: "AURA",             count: 1, img: "" },
  ];
}