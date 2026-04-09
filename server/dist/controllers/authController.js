"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_1 = require("../services/supabase");
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const ADMIN_RESET_KEY = process.env.ADMIN_RESET_KEY || "fallback_admin_reset_key";
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        // Fetch admin from Supabase
        const { data: admin, error } = await supabase_1.supabase
            .from("admins")
            .select("*")
            .eq("email", email)
            .single();
        if (error || !admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Compare password using bcrypt
        const isMatched = await bcrypt_1.default.compare(password, admin.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                email: admin.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.login = login;
const resetPassword = async (req, res) => {
    const { email, newPassword, resetKey } = req.body;
    try {
        if (!email || !newPassword || !resetKey) {
            return res.status(400).json({ message: "Please provide email, reset key, and new password" });
        }
        if (resetKey !== ADMIN_RESET_KEY) {
            return res.status(401).json({ message: "Invalid reset key" });
        }
        const { data: admin, error } = await supabase_1.supabase
            .from("admins")
            .select("id, email")
            .eq("email", email)
            .single();
        if (error || !admin) {
            return res.status(404).json({ message: "Admin account not found" });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        const { error: updateError } = await supabase_1.supabase
            .from("admins")
            .update({ password: hashedPassword })
            .eq("email", email);
        if (updateError) {
            return res.status(500).json({ message: "Failed to update password", error: updateError.message });
        }
        res.json({ message: "Password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.resetPassword = resetPassword;
