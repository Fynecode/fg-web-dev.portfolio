import bcrypt from 'bcrypt'
import crypto from 'crypto'
import Admin from '../models/admin.model.js'
import AppError from '../utils/app.error.class.js'
import jwt from 'jsonwebtoken'
import { 
    JWT_ACCESS_EXPIRE, 
    JWT_ACCESS_SECRET, 
    JWT_REFRESH_EXPIRE, 
    JWT_REFRESH_SECRET, 
    FRONTEND_URL,
    ADMIN_URL
} from '../config/config.js'
import { sendResetEmail } from '../utils/email.util.js'

export default class authServices{

    registerAdmin = async (req) =>{
        try {
            // Get registration body
            const {name, email, password} = req.body

            // Check if email is already in the database
            const oldAdmin = await Admin.findOne({email})

            if(oldAdmin) throw new AppError({message: "Email already in use", status: 409})

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            // Register user
            const newAdmin = await Admin.create({
                name: name,
                email: email,
                password: hashedPassword
            })

            // Generate access token
            const accessToken = jwt.sign(
                { 
                    user: { name: newAdmin.name, email: newAdmin.email, role: newAdmin.role, _id: newAdmin._id }, 
                },
                JWT_ACCESS_SECRET,
                {expiresIn: JWT_ACCESS_EXPIRE}
            );

            // Generate refresh token
            const refreshToken = jwt.sign(
                { 
                    user: { name: newAdmin.name, email: newAdmin.email, role: newAdmin.role, _id: newAdmin._id }, 
                },
                JWT_REFRESH_SECRET,
                {expiresIn: JWT_REFRESH_EXPIRE}
            );

            // Save refresh token in batabase
            newAdmin.refreshToken = refreshToken;
            await newAdmin.save();

            if(newAdmin) return {newAdmin, accessToken, refreshToken};
            
        } catch (error) {
            throw error
        }
    };

    loginAdmin = async (req) => {
        try {
            const { email, password } = req.body;

            // Quick input check
            if (!email || !password) {
                throw new AppError({ message: "Email and password required", status: 400 });
            }

            // Find admin by email
            const admin = await Admin.findOne({ email }).select('+password');
            if (!admin || !admin.password) {
                throw new AppError({ message: "Email or password invalid", status: 404 });
            }

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new AppError({ message: "Email or password invalid", status: 404 });
            }

            // Generate tokens
            const accessToken = jwt.sign(
                { 
                    user: { name: admin.name, email: admin.email, role: admin.role, _id: admin._id }, 
                },
                JWT_ACCESS_SECRET,
                {expiresIn: JWT_ACCESS_EXPIRE }
            );

            const refreshToken = jwt.sign(
                { 
                    user: { name: admin.name, email: admin.email, role: admin.role, _id: admin._id },
                },
                JWT_REFRESH_SECRET,
                { expiresIn: JWT_REFRESH_EXPIRE }
            );

            // Save refresh token in DB
            admin.refreshToken.push(refreshToken)
            await admin.save();

            const savedAdmin = { name: admin.name, email: admin.email, role: admin.role, _id: admin._id };

            const latestToken = admin.refreshToken[admin.refreshToken.length - 1]

            return { savedAdmin, accessToken, latestToken };
        } catch (error) {
            throw error;
        }
    };

    logoutAdmin = async (req) => {
        try {
            // Get id of the admin trying to logout from request params
            const adminId = req.params.id

            // Check if admin exist in database
            const foundAdmin = await Admin.findById(adminId)
            if(!foundAdmin) return {success: true}

            // Clear tokens from database
            foundAdmin.refreshToken = [];
            await foundAdmin.save();

            // Send success
            return {success: true}
        } catch (error) {
            throw error
        }
    };

    requestPasswordReset = async (req) => {
        const { email } = req.body;

        if (!email) throw new AppError({ message: "Email is required", status: 400 });

        const admin = await Admin.findOne({ email }).select('+resetPasswordToken +resetPasswordExpires');

        // Always respond success to avoid user enumeration
        if (!admin) return { success: true };

        const resetToken = jwt.sign(
            { email },
            JWT_ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        admin.resetPasswordToken = hashedToken;
        admin.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
        await admin.save();

        const baseUrl = ADMIN_URL || FRONTEND_URL;
        const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

        await sendResetEmail({ to: email, name: admin.name, resetLink });

        return { success: true };
    };

    resetPassword = async (req) => {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            throw new AppError({ message: "Token and new password are required", status: 400 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_ACCESS_SECRET);
        } catch (err) {
            throw new AppError({ message: "Invalid or expired token", status: 400 });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const admin = await Admin.findOne({
            email: decoded.email,
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }
        }).select('+password +resetPasswordToken +resetPasswordExpires');

        if (!admin) {
            throw new AppError({ message: "Invalid or expired token", status: 400 });
        }

        // Password strength rules (match changePassword)
        if (newPassword.length < 12) {
            throw new AppError({ message: "Password must be at least 12 characters long.", status: 400 });
        }
        if (!/\d/.test(newPassword)) {
            throw new AppError({ message: "Password must contain at least one number.", status: 400 });
        }
        if (!/[^A-Za-z0-9]/.test(newPassword)) {
            throw new AppError({ message: "Password must contain at least one symbol.", status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        admin.password = hashedPassword;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;
        await admin.save();

        const accessToken = jwt.sign(
            { 
                user: { name: admin.name, email: admin.email, role: admin.role, _id: admin._id }, 
            },
            JWT_ACCESS_SECRET,
            {expiresIn: JWT_ACCESS_EXPIRE}
        );

        const refreshToken = jwt.sign(
            { 
                user: { name: admin.name, email: admin.email, role: admin.role, _id: admin._id }, 
            },
            JWT_REFRESH_SECRET,
            {expiresIn: JWT_REFRESH_EXPIRE}
        );

        admin.refreshToken = admin.refreshToken.filter(Boolean);
        admin.refreshToken.push(refreshToken);
        await admin.save();

        const savedAdmin = { name: admin.name, email: admin.email, role: admin.role, _id: admin._id };

        return { savedAdmin, accessToken, refreshToken };
    };

}
