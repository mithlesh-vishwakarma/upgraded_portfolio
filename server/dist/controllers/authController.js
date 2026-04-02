"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_1 = require("../config/supabase");
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
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
