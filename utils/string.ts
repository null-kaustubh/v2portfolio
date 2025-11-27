import { AsYouType } from "libphonenumber-js";

export function decodeEmail(email: string) {
  return atob(email);
}

export function decodePhoneNumber(phone: string) {
  return atob(phone);
}

export function formatPhoneNumber(phone: string) {
  return new AsYouType("IN").input(phone);
}
