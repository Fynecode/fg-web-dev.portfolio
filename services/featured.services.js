import Featured from "../models/featured.model.js";
import AppError from "../utils/app.error.class.js";
import { v2 as cloudinary } from "cloudinary";

export default class featuredServices {
    formatServiceType = (str) => {
        if (!str) return "";

        const normalized = Array.isArray(str)
            ? str.find(v => typeof v === "string" && v.trim())
            : str;

        const value = typeof normalized === "string" ? normalized.trim() : "";
        if (!value) return "";

        return value.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    normalizeServiceType = (value) => {
        if (value === undefined) return undefined;
        if (value === null) return null;

        if (Array.isArray(value)) {
            const first = value.find(item => typeof item === "string" && item.trim());
            return first ? first.trim() : null;
        }

        if (typeof value === "string") {
            const trimmed = value.trim();
            return trimmed === "" || trimmed === "null" ? null : trimmed;
        }

        return null;
    }

    toPlainFeatured = (doc) => {
        const plain = doc?.toObject?.() ?? (doc && typeof doc === "object" ? { ...doc } : {});

        return {
            ...plain,
            serviceType: this.normalizeServiceType(plain.serviceType)
        };
    }

    createFeatured = async (req) => {
        try {
            // Prevent more than 5 featured projects
            const count = await Featured.countDocuments();
            if (count >= 5) {
                throw new AppError({ message: "Maximum of 5 featured projects allowed", status: 400 });
            }

            const { title } = req.body;

            if (!title) {
                throw new AppError({ message: "Title is required", status: 400 });
            }

            // Create as draft with minimal fields
            const newFeatured = await Featured.create({
                title,
                status: "draft",
            });

            return newFeatured;

        } catch (error) {
            throw error;
        }
    };

    updateFeatured = async (req) => {
        try {
            const { id } = req.params;

            const {
                title,
                description,
                link,
                serviceType,
                status,
            } = req.body;

            const normalizeNullable = (value) => {
                if (value === undefined) return undefined;
                if (value === null) return null;
                if (value === 'null' || value === '') return null;
                return value;
            };

            const featured = await Featured.findById(id);
            if (!featured) {
                throw new AppError({ message: "Featured project not found", status: 404 });
            }

            // ------------------------------------------
            // BASIC FIELDS
            // ------------------------------------------
            if (title !== undefined) featured.title = normalizeNullable(title);
            if (description !== undefined) featured.description = normalizeNullable(description);
            if (serviceType !== undefined) featured.serviceType = this.normalizeServiceType(serviceType);
            if (link !== undefined) featured.link = normalizeNullable(link);
            if (status !== undefined) featured.status = normalizeNullable(status) || featured.status;

            // ------------------------------------------
            // HANDLE FEATURED PROJECT VIDEO REPLACEMENT
            // req.files.video => [{ path, filename }]
            // ------------------------------------------
            if (req.files?.file?.length > 0) {
                const newVideo = req.files.file[0];

                // Delete old video if exists
                if (featured.file?.fileName) {
                    await cloudinary.uploader.destroy(
                        featured.file.fileName,
                        { resource_type: "video" }
                    );
                }

                featured.file = {
                    filePath: newVideo.path,
                    fileName: newVideo.filename
                };
            }

            await featured.save();
            return featured;

        } catch (error) {
            throw error;
        }
    };

    deleteFeatured = async (req) => {
        try {
            // Extract data
            const { id } = req.params;

            // Check if document exists
            const existing = await Featured.findById(id);
            if (!existing) throw new AppError({ message: "Featured project not found", status: 404 });

            // Delete file from Cloudinary
            let cloudRes = { result: "ok" };
            if (existing.file?.fileName) {
                cloudRes = await cloudinary.uploader.destroy(
                    existing.file.fileName,
                    { resource_type: 'video' }
                );
            }

            if (cloudRes.result === "ok") {
                await Featured.findByIdAndDelete(id);
            } 
            else if (cloudRes.result === "not found") {
                throw new AppError({ message: "File not found", status: 404 });
            }
            else {
                throw new AppError({ message: "File could not be deleted", status: 500 });
            }

            return "Featured project deleted successfully";

        } catch (error) {
            throw error;
        }
    };

    getAllFeatured = async (req) => {
        try {
            const { status } = req.query;

            let filter = {};

            // If status is provided, validate & filter
            if (status) {
                const allowed = ["draft", "published"];

                if (!allowed.includes(status)) {
                    throw new AppError({
                        message: `Invalid status. Allowed values: ${allowed.join(", ")}`,
                        status: 400
                    });
                }

                filter.status = status;
            }

            const raw = await Featured.find(filter).sort({ createdAt: -1 });

            if (raw.length === 0) {
                throw new AppError({
                    message: "No featured projects found",
                    status: 404
                });
            }

            const featuredList = raw.map(doc => {
                const plain = this.toPlainFeatured(doc);
                return {
                    ...plain,
                    serviceType: this.formatServiceType(plain.serviceType)
                };
            });

            return featuredList;

        } catch (error) {
            throw error;
        }
    };

    getFeatured = async (req) => {
        try {
            const { id } = req.params;

            const featuredProject = await Featured.findById(id);
            if (!featuredProject) {
                throw new AppError({ message: "Featured project not found", status: 404 });
            }

            const plain = this.toPlainFeatured(featuredProject);
            return {
                ...plain,
                serviceType: this.formatServiceType(plain.serviceType)
            };
        } 
        catch (error) {
            throw error;
        }
    };

    getByServiceType = async (req) => {
        try {
            const { serviceType } = req.params;

            const allowed = ["business_website", "internal_tool", "automated_workflow"]

            if (!allowed.includes(serviceType)) {
                throw new AppError({
                    message: 'Invalid service.',
                    status: 400
                });
            }

            const raw = await Featured.find({
                serviceType: serviceType,
                status: 'published'
            });

            if (!raw.length) {
                throw new AppError({ message: "Featured project not found", status: 404 });
            }

            const featuredList = raw.map(doc => {
                const plain = this.toPlainFeatured(doc);
                return {
                    ...plain,
                    serviceType: this.formatServiceType(plain.serviceType)
                };
            });

            return featuredList;
        } 
        catch (error) {
            throw error;
        }
    };
}
