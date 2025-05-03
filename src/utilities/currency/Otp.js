"use server";
const crypto = require("crypto");

export async function Otp(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const otp = Math.floor(
    min + (crypto.randomBytes(4).readUInt32BE(0) % (max - min + 1))
  ).toString();

  return otp;
}

