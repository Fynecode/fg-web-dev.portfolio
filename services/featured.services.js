import Featured from "../models/featured.model.js";
import AppError from "../utils/app.error.class.js";
import { v2 as cloudinary } from "cloudinary";

export default class featuredServices {
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
                company,
                scope,
                link,
                challenges,
                solution,
                deliveredFeats,
                tags,
                status,
                feedback
            } = req.body;

            const normalizeNullable = (value) => {
                if (value === undefined) return undefined;
                if (value === null) return null;
                if (value === 'null' || value === '') return null;
                return value;
            };

            const parseArrayField = (value) => {
                if (value === undefined) return undefined;
                if (Array.isArray(value)) return value;
                if (value === null || value === 'null' || value === '') return [];
                if (typeof value === 'string') {
                    const trimmed = value.trim();
                    if (!trimmed) return [];
                    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                        try {
                            const parsed = JSON.parse(trimmed);
                            return Array.isArray(parsed) ? parsed : [];
                        } catch {
                            return [];
                        }
                    }
                    return trimmed.split(",").map(v => v.trim()).filter(Boolean);
                }
                return [];
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
            if (company !== undefined) featured.company = normalizeNullable(company);
            if (link !== undefined) featured.link = normalizeNullable(link);

            if (challenges !== undefined) featured.challenges = normalizeNullable(challenges);
            if (solution !== undefined) featured.solution = normalizeNullable(solution);

            if (status !== undefined) featured.status = normalizeNullable(status) || featured.status;

            // ------------------------------------------
            // ARRAY FIELDS
            // ------------------------------------------
            if (scope !== undefined) {
                featured.scope = parseArrayField(scope);
            }

            if (deliveredFeats !== undefined) {
                featured.deliveredFeats = parseArrayField(deliveredFeats);
            }

            if (tags !== undefined) {
                featured.tags = parseArrayField(tags);
            }

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

            // ------------------------------------------
            // HANDLE TESTIMONIAL UPDATE
            // ------------------------------------------
            if (!featured.testimonial)
                featured.testimonial = {};

            // 1. Update feedback text
            if (feedback !== undefined) {
                featured.testimonial.feedback = normalizeNullable(feedback);
            }

            // 2. Update pictureUrl if picture uploaded
            if (req.files?.picture?.length > 0) {
                const newPic = req.files.picture[0];

                // delete previous testimonial pic if exists
                if (featured.testimonial.pictureId) {
                    await cloudinary.uploader.destroy(
                        featured.testimonial.pictureId,
                        { resource_type: "image" }
                    );
                }

                featured.testimonial.pictureUrl = newPic.path;
                featured.testimonial.pictureId = newPic.filename;
            }

            // ------------------------------------------
            // SAVE AND RETURN
            // ------------------------------------------
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

            const featuredList = await Featured.find(filter).sort({ createdAt: -1 });

            if (featuredList.length === 0) {
                throw new AppError({
                    message: "No featured projects found",
                    status: 404
                });
            }

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

            return featuredProject;
        } 
        catch (error) {
            throw error;
        }
    };

}
