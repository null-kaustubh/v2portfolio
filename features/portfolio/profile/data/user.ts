import { ASSETS_REPO } from "@/lib/constants";
import type { User } from "../types/user";

export const USER: User = {
  firstName: "Kaustubh",
  lastName: "Sankhe",
  displayName: "Kaustubh Sankhe",
  username: "nullkaustubh",
  gender: "male",
  bio: "Software developer focused on building reliable, user-focused web experiences.",
  flipSentences: [
    "Building things that work.",
    "Software Developer",
    "Open Source Contributor",
  ],
  address: "Mumbai, India",
  phoneNumber: "KzkxOTMyNDA3NjQ4NQ==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "a2F1c3R1YmhzMjkwM0BnbWFpbC5jb20=", // base64 encoded
  website: "https://1xkaustubh.com",
  jobTitle: "Software Developer",
  jobs: [
    {
      title: "Software Development Engineer - 1",
      company: "Accelya",
      website: "https://w3.accelya.com/",
    },
  ],
  about: `
Hi! I'm Kaustubh Sankhe — a Software Developer passionate about creating high-performance, user-centric software solutions with intuitive and engaging designs.

I specialize in building high-quality web applications using Next.js, React, TypeScript, and modern front-end technologies. Beyond work, I love exploring new technologies and turning ideas into reality through personal projects.

Lately, I've been diving into DevOps and system design, aiming to understand how things scale beyond just code.

When I'm not coding, I'm probably designing, gaming, or tinkering with side projects that teach me something new.

Still learning. Still building. Every day, a little better.

Let's connect and collaborate!
  `,
  avatar: "https://wallpapercave.com/wp/wp12731490.jpg",
  ogImage: `${ASSETS_REPO}/images/og-image.png`,
  keywords: [
    "kaustubhsankhe",
    "kaustubh",
    "kaustubh sankhe",
    "mumbai",
    "borivali west",
    "nullkaustubh",
    "accelya",
    "software developer",
  ],
  timeZone: "Asia/Kolkata",
  dateCreated: "2025-10-20", // YYYY-MM-DD
  resumeUrl:
    "https://drive.google.com/file/d/1bvd2dHcFDCIAR3NPpmUIf9NVoeAs0scC/view?usp=sharing",
};
