import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("bookings.db");

export const getDBConnection = () => db;

export const createTable = () => {
  try {
    const tableInfo = db.getAllSync("PRAGMA table_info(bookings);");
    const hasUserIdColumn = tableInfo.some(
      (column) => column.name === "userId"
    );

    if (!hasUserIdColumn && tableInfo.length > 0) {
      console.log("Migrando tabela bookings para adicionar coluna userId...");

      db.execSync("ALTER TABLE bookings RENAME TO bookings_old;");

      db.execSync(
        `CREATE TABLE bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT NOT NULL DEFAULT '',
          date TEXT NOT NULL,
          hour TEXT NOT NULL,
          barberName TEXT NOT NULL,
          service TEXT NOT NULL
        );`
      );

      db.execSync(
        `INSERT INTO bookings (userId, date, hour, barberName, service)
         SELECT '', date, hour, 
                COALESCE(barberName, 'Qualquer barbeiro') as barberName,
                COALESCE(service, 'Qualquer serviço') as service
         FROM bookings_old;`
      );

      db.execSync("DROP TABLE bookings_old;");

      console.log("Migração concluída com sucesso!");
    } else {
      db.execSync(
        `CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT NOT NULL,
          date TEXT NOT NULL,
          hour TEXT NOT NULL,
          barberName TEXT NOT NULL,
          service TEXT NOT NULL
        );`
      );
    }

    db.execSync(
      `CREATE TABLE IF NOT EXISTS barbers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`
    );
  } catch (error) {
    console.error("Erro ao criar/migrar tabelas:", error);
  }
};

export const saveBooking = async (booking) => {
  try {
    const result = db.runSync(
      `INSERT INTO bookings (userId, date, hour, barberName, service) VALUES (?, ?, ?, ?, ?)`,
      [
        booking.userId,
        booking.date,
        booking.hour,
        booking.barberName || "Qualquer barbeiro",
        booking.service || "Qualquer serviço",
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBookings = async (userId = null) => {
  try {
    if (userId) {
      const result = db.getAllSync(`SELECT * FROM bookings WHERE userId = ?`, [
        userId,
      ]);
      return result;
    } else {
      const result = db.getAllSync(`SELECT * FROM bookings`);
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export const saveBarber = async (barber) => {
  try {
    const result = db.runSync(
      `INSERT OR IGNORE INTO barbers (name) VALUES (?)`,
      [barber.name]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBarbers = async () => {
  try {
    const result = db.getAllSync(`SELECT * FROM barbers`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteBarber = async (barberId) => {
  try {
    const result = db.runSync(`DELETE FROM barbers WHERE id = ?`, [barberId]);
    return result;
  } catch (error) {
    throw error;
  }
};
