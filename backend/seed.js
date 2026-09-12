import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Admin } from "./models/admin.model.js";
import { Clinic } from "./models/clinic.model.js";

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully.\n");

        // 1. Seed Admin
        const existingAdmin = await Admin.findOne({ username: "admin" });
        if (!existingAdmin) {
            const admin = new Admin({
                username: "admin",
                password: "AdminPassword123!",
            });
            await admin.save();
            console.log("✅ Admin created:");
            console.log("   Username: admin");
            console.log("   Password: AdminPassword123!\n");
        } else {
            console.log("ℹ️  Admin already exists (username: admin).\n");
        }

        // 2. Seed Clinic
        const existingClinic = await Clinic.findOne({ tenantId: "main_clinic" });
        if (!existingClinic) {
            const clinic = new Clinic({
                tenantId: "main_clinic",
                name: "MediCare Clinic",
                specialization: "General Practice & Healthcare",
                address: "123 Healthcare Blvd, Cairo, Egypt",
                phone: "201012345678",
                socialMedia: {
                    whatsapp: { link: "https://wa.me/201012345678" },
                    facebook: { link: "https://facebook.com/medicare" },
                    instagram: { link: "https://instagram.com/medicare" },
                    twitter: { link: "https://twitter.com/medicare" },
                    linkedin: { link: "https://linkedin.com/company/medicare" },
                },
                workingHours: {
                    sunday: { start: "09:00", end: "17:00" },
                    monday: { start: "09:00", end: "17:00" },
                    tuesday: { start: "09:00", end: "17:00" },
                    wednesday: { start: "09:00", end: "17:00" },
                    thursday: { start: "09:00", end: "17:00" },
                    friday: null,
                    saturday: { start: "10:00", end: "16:00" },
                },
                consultationFee: 250,
                instapayLink: "https://instapay.eg/medicare",
                walletNumber: "201012345678",
                credentials: [
                    "MD in General Medicine",
                    "Fellow of the Medical Board",
                ],
            });
            await clinic.save();
            console.log("✅ Clinic configured successfully:");
            console.log("   Name: MediCare Clinic");
            console.log("   Specialization: General Practice & Healthcare");
            console.log("   Phone: 201012345678");
            console.log("   Working Days: Sunday - Thursday (09:00 - 17:00), Saturday (10:00 - 16:00)\n");
        } else {
            console.log("ℹ️  Clinic already configured.\n");
        }

        console.log("Seed completed successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seed();
