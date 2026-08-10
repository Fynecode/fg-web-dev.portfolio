import {sendEmail} from "../utils/email.util.js"
import featuredServices from "../services/featured.services.js";

const featured = new featuredServices()

export const sendEmailCtr = async (req, res, next) =>{
    try {
        const {
            name,
            email,
            message,
            bname,
            bactions,
            package: selectedPackage,
        } = req.body;

        const details = [
            `<p><strong>Name:</strong> ${name || ''}</p>`,
            `<p><strong>Email:</strong> ${email || ''}</p>`,
            `<p><strong>Business name:</strong> ${bname || ''}</p>`,
            `<p><strong>Business activity:</strong> ${bactions || ''}</p>`,
            `<p><strong>Selected package:</strong> ${selectedPackage || ''}</p>`,
            `<p><strong>Message:</strong> ${message || ''}</p>`,
        ].join('');

        await sendEmail(details, email, name)

        res.json({status: 200, message: 'Email sent'})
    } catch (error) {
        next(error)
    }
}

export const getAllFeatured = async (req, res, next) => {
    try {
        const safeReq = {
            ...req,
            query: { ...req.query, status: 'published' }
        };
        const featuredList = await featured.getAllFeatured(safeReq);
        res.status(200).json({success: true, featuredList});
    } catch (error) {
        next(error)
    }
};

export const getByServiceType = async (req, res, next) => {
    try {
        const featuredList = await featured.getByServiceType(req);
        res.status(200).json({success: true, featuredList});
    } catch (error) {
        next(error)
    }
};