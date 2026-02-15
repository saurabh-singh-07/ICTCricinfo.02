// src/utils/dateUtils.js

/**
 * Convert timestamp to Date object safely
 */
export function toDate(timestamp) {
  if (!timestamp) return null;
  return new Date(Number(timestamp));
}

/**
 * Format date using Intl API
 */
export function formatDate(
  timestamp,
  options = {},
  locale = "en-IN",
  timeZone = "Asia/Kolkata"
) {
  if (!timestamp) return "Time not available";

  const date = toDate(timestamp);

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
    ...options,
  }).format(date);
}

/**
 * Format using timezone offset like "+05:30"
 */
export function formatWithOffset(timestamp, offset) {
  if (!timestamp || !offset) return "Invalid time";

  const date = toDate(timestamp);

  const sign = offset[0] === "-" ? -1 : 1;
  const [hours, minutes] = offset.slice(1).split(":").map(Number);
  const totalMinutes = sign * (hours * 60 + minutes);

  const localTime = new Date(date.getTime() + totalMinutes * 60000);

  return localTime.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/**
 * Format only time (e.g., 7:30 PM)
 */
export function formatTimeOnly(timestamp, timeZone = "Asia/Kolkata") {
  if (!timestamp) return "";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(toDate(timestamp));
}

/**
 * Format only date (e.g., 12 Feb 2026)
 */
export function formatDateOnly(timestamp, timeZone = "Asia/Kolkata") {
  if (!timestamp) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone,
  }).format(toDate(timestamp));
}

/**
 * Get day name (Mon, Tue, etc.)
 */
export function getDayName(timestamp, timeZone = "Asia/Kolkata") {
  if (!timestamp) return "";

  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    timeZone,
  }).format(toDate(timestamp));
}

/**
 * Get match status time text
 * - "Live"
 * - "Starts in 2h 15m"
 * - "Completed"
 */
export function getMatchTimeStatus(startTime, matchState) {
  if (!startTime) return "";

  if (matchState === "Live") return "🔴 Live";
  if (matchState === "Complete") return "Match Completed";

  const now = Date.now();
  const diff = startTime - now;

  if (diff <= 0) return "Match Started";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `Starts in ${hours}h ${minutes}m`;
}

/**
 * Countdown helper (returns object)
 */
export function getCountdown(startTime) {
  if (!startTime) return null;

  const now = Date.now();
  const diff = startTime - now;

  if (diff <= 0) return { expired: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (diff % (1000 * 60)) / 1000
  );

  return { days, hours, minutes, seconds, expired: false };
}

/**
 * Convert to user's local timezone automatically
 */
export function formatToUserLocal(timestamp) {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleString();
}
