<template>
  <div class="min-h-screen w-full text-white p-4 lg:p-10">

    <!-- Top Controls -->
    <div class="flex justify-between items-center mb-6">
      <button
        @click="router.back()"
        class="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition flex items-center gap-2"
      >
        <ArrowLeft class="w-4 h-4" /> Back
      </button>

      <button
        @click="deleteProject"
        class="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>

    <!-- Layout Wrapper -->
    <div class="flex flex-col lg:gap-8">

      <!-- VIDEO UPLOAD OR PLAYER -->
      <div
        class="w-full md:w-3/5 lg:w-2/5 rounded-xl overflow-hidden shadow-xl border border-white/10 aspect-video flex items-center justify-center"
      >
        <!-- Video -->
        <div v-if="form.file?.filePath && !isEditing.video" class="w-full h-full relative group">
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
          <div class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition">
            <button
              type="button"
              @click.stop="toggleEdit('video')"
              class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition inline-flex items-center justify-center backdrop-blur"
            >
              <Pencil class="w-4 h-4 pointer-events-none" />
            </button>
          </div>
          <video
            :src="form.file?.filePath"
            controls
            class="w-full h-full object-cover"
          ></video>
        </div>

        <!-- Upload Input -->
        <div v-else class="w-full p-4">
          <label class="text-sm text-white/50 flex items-center gap-2">
            Upload Project Video
            <button
              v-if="form.file?.filePath"
              type="button"
              @click.stop="toggleEdit('video')"
              class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
            >
              <Eye class="w-3 h-3 pointer-events-none" />
            </button>
          </label>
          <input
            type="file"
            accept="video/*"
            @change="onVideoUpload"
            class="w-full mt-2 text-white border"
          />
        </div>
      </div>

      <!-- DETAILS -->
      <div class="flex-1 mt-6 lg:mt-0 space-y-10">

        <!-- Main Project Fields -->
        <section class="space-y-6">

          <!-- Title -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Title
              <button
                type="button"
                @click.stop="toggleEdit('title')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.title" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>
            <div
              v-if="!isEditing.title"
              class="text-2xl font-semibold cursor-pointer"
            >
              {{ form.title }}
            </div>
            <input
              v-else
              v-model="form.title"
              type="text"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Description
              <button
                type="button"
                @click.stop="toggleEdit('description')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.description" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>
            <div
              v-if="!isEditing.description"
              class="text-lg cursor-pointer"
            >
              {{ form.description }}
            </div>
            <textarea
              v-else
              v-model="form.description"
              rows="3"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
          </div>

          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Link
              <button
                type="button"
                @click.stop="toggleEdit('link')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.link" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>
            <div
              v-if="!isEditing.link"
              class="text-lg cursor-pointer"
            >
              {{ form.link }}
            </div>
            <input
              v-else
              v-model="form.link"
              type="text"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Company -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Company
              <button
                type="button"
                @click.stop="toggleEdit('company')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.company" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>
            <div
              v-if="!isEditing.company"
              class="text-lg cursor-pointer"
            >
              {{ form.company }}
            </div>
            <input
              v-else
              v-model="form.company"
              type="text"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Scope (ARRAY) -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Scope
              <button
                @click="addToArray('scope')"
                class="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition text-sm"
              >
                +
              </button>
            </label>

            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(item, index) in form.scope"
                :key="'scope-' + index"
                class="flex items-center bg-white/10 px-3 py-1 rounded"
              >
                <span v-if="!isEditing.scope[index]" class="flex items-center gap-2">
                  <span>{{ item }}</span>
                  <button
                    type="button"
                    @click.stop="toggleArrayEdit('scope', index)"
                    class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
                  >
                    <Pencil class="w-3 h-3 pointer-events-none" />
                  </button>
                </span>

                <span v-else class="flex items-center gap-2">
                  <input
                    v-model="form.scope[index]"
                    @blur="stopArrayEdit('scope', index)"
                    class="bg-transparent outline-none text-white w-24"
                  />
                  <button
                    type="button"
                    @click.stop="toggleArrayEdit('scope', index)"
                    class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
                  >
                    <Eye class="w-3 h-3 pointer-events-none" />
                  </button>
                </span>

                <button
                  @click="removeFromArray('scope', index)"
                  class="ml-2 text-red-400 hover:text-red-500"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <!-- Tags ARRAY -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Tags
              <button
                @click="addToArray('tags')"
                class="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition text-sm"
              >
                +
              </button>
            </label>

            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(item, index) in form.tags"
                :key="'tag-' + index"
                class="flex items-center bg-white/10 px-3 py-1 rounded"
              >
                <span v-if="!isEditing.tags[index]" class="flex items-center gap-2">
                  <span>{{ item }}</span>
                  <button
                    type="button"
                    @click.stop="toggleArrayEdit('tags', index)"
                    class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
                  >
                    <Pencil class="w-3 h-3 pointer-events-none" />
                  </button>
                </span>

                <span v-else class="flex items-center gap-2">
                  <input
                    v-model="form.tags[index]"
                    @blur="stopArrayEdit('tags', index)"
                    class="bg-transparent outline-none text-white w-24"
                  />
                  <button
                    type="button"
                    @click.stop="toggleArrayEdit('tags', index)"
                    class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
                  >
                    <Eye class="w-3 h-3 pointer-events-none" />
                  </button>
                </span>

                <button
                  @click="removeFromArray('tags', index)"
                  class="ml-2 text-red-400 hover:text-red-500"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <!-- DeliveredFeats ARRAY -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Delivered Features
              <button
                @click="addToArray('deliveredFeats')"
                class="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition text-sm"
              >
                +
              </button>
            </label>

            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(item, index) in form.deliveredFeats"
                :key="'feat-' + index"
                class="flex items-center bg-white/10 px-3 py-1 rounded"
              >
                <span v-if="!isEditing.deliveredFeats[index]" class="flex items-center gap-2">
                  <span>{{ item }}</span>
                  <button
                    type="button"
                    @click.stop="toggleArrayEdit('deliveredFeats', index)"
                    class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
                  >
                    <Pencil class="w-3 h-3 pointer-events-none" />
                  </button>
                </span>

                <span v-else class="flex items-center gap-2">
                  <input
                    v-model="form.deliveredFeats[index]"
                    @blur="stopArrayEdit('deliveredFeats', index)"
                    class="bg-transparent outline-none text-white w-24"
                  />
                  <button
                    type="button"
                    @click.stop="toggleArrayEdit('deliveredFeats', index)"
                    class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
                  >
                    <Eye class="w-3 h-3 pointer-events-none" />
                  </button>
                </span>

                <button
                  @click="removeFromArray('deliveredFeats', index)"
                  class="ml-2 text-red-400 hover:text-red-500"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <!-- Challenges -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Challenges
              <button
                type="button"
                @click.stop="toggleEdit('challenges')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.challenges" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>
            <div
              v-if="!isEditing.challenges"
              class="cursor-pointer whitespace-pre-line"
            >
              {{ form.challenges || "Add challenges..." }}
            </div>
            <textarea
              v-else
              v-model="form.challenges"
              rows="3"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
          </div>

          <!-- Solution -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Solution
              <button
                type="button"
                @click.stop="toggleEdit('solution')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.solution" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>
            <div
              v-if="!isEditing.solution"
              class="cursor-pointer whitespace-pre-line"
            >
              {{ form.solution || "Add solution..." }}
            </div>
            <textarea
              v-else
              v-model="form.solution"
              rows="3"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Status
              <button
                type="button"
                @click.stop="toggleEdit('status')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.status" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>

            <div v-if="!isEditing.status" class="cursor-pointer">
              {{ form.status }}
            </div>

            <select
              v-else
              v-model="form.status"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

        </section>

        <!-- TESTIMONIAL -->
        <section class="mt-20 border-t border-white/20 pt-10 space-y-4">
          <h2 class="text-xl font-semibold">Testimonial</h2>

          <!-- Picture -->
          <div class="flex flex-col">
            <label class="text-sm text-white/50">Client Picture</label>

            <img
              v-if="form.testimonial?.pictureUrl"
              :src="form.testimonial.pictureUrl"
              class="w-24 h-24 rounded-full object-cover mb-3"
            />

            <input
              v-if="!form.testimonial?.pictureUrl"
              type="file"
              accept="image/*"
              @change="onPictureUpload"
              class="w-32 mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Feedback -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Feedback
              <button
                type="button"
                @click.stop="toggleEdit('testimonialFeedback')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.testimonialFeedback" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>
            <p
            v-if="!isEditing.testimonialFeedback"
            >
              {{form.testimonial.feedback || "Add feedback"}}
            </p>
            <textarea
              v-else
              v-model="form.testimonial.feedback"
              rows="4"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
            
          </div>

        </section>

        <div v-if="isDirty" class="mt-10 flex">
          <button
            @click="saveChanges"
            class="px-6 py-3 bg-[#0584d8] hover:bg-[#0a66a5] rounded-lg text-white font-semibold flex flex-row gap-2"
          >
            <Loader2 v-if="featuredStore.loading" class="animate-spin" /> Save Changes
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFeaturedProjectsStore } from "@/stores/featured.store";
import { ArrowLeft, Eye, Loader2, Pencil, X } from "lucide-vue-next";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const id = ref(route.params.id);
const featuredStore = useFeaturedProjectsStore();

const project = ref(null);

// Editing states
const isEditing = reactive({
  title: false,
  description: false,
  link: false,
  company: false,
  status: false,
  scope: [],
  tags: [],
  deliveredFeats: [],
  challenges: false,
  solution: false,
  testimonialFeedback: false,
  testimonialPicture: false,
  video: false,
});

// Main form (mirroring schema)
const form = reactive({
  title: "",
  description: "",
  company: "",
  scope: [],
  tags: [],
  deliveredFeats: [],
  challenges: "",
  solution: "",
  status: "draft",
  link: "",
  file: null,
  testimonial: {
    pictureUrl: null,
    feedback: "",
  }
  
});

// Detect changes
const isDirty = computed(() => {
  if (!project.value) return false;
  return JSON.stringify(form) !== JSON.stringify(project.value);
});

// Editing helpers
function enableEdit(field) {
  isEditing[field] = true;
}

function toggleEdit(field) {
  isEditing[field] = !isEditing[field];
}

function enableArrayEdit(field, index) {
  isEditing[field][index] = true;
}

function toggleArrayEdit(field, index) {
  isEditing[field][index] = !isEditing[field][index];
}

function stopArrayEdit(field, index) {
  isEditing[field][index] = false;
}

function addToArray(field) {
  form[field].push("");
  isEditing[field].push(true);
}

function removeFromArray(field, index) {
  form[field].splice(index, 1);
  isEditing[field].splice(index, 1);
}

// File uploads
function onVideoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  form.file = file;
}

function onPictureUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  form.testimonial.pictureUrl = file;
}

// Save project updates
async function saveChanges() {
  try {
    const normalized = {
      title: form.title ?? null,
      description: form.description ?? null,
      company: form.company ?? null,
      link: form.link ?? null,
      challenges: form.challenges ?? null,
      solution: form.solution ?? null,
      status: form.status ?? null,
      scope: Array.isArray(form.scope) ? form.scope : [],
      tags: Array.isArray(form.tags) ? form.tags : [],
      deliveredFeats: Array.isArray(form.deliveredFeats) ? form.deliveredFeats : [],
      feedback: form.testimonial?.feedback ?? null,
      file: form.file ?? null,
      picture: form.testimonial?.pictureUrl ?? null
    };

    const fd = new FormData();

    fd.append("title", normalized.title)
    fd.append("description", normalized.description)
    fd.append("company", normalized.company)
    fd.append("scope", JSON.stringify(normalized.scope))
    fd.append("tags", JSON.stringify(normalized.tags))
    fd.append("deliveredFeats", JSON.stringify(normalized.deliveredFeats))
    fd.append("challenges", normalized.challenges)
    fd.append("solution", normalized.solution)
    fd.append("status", normalized.status)
    fd.append("link", normalized.link)
    fd.append("file", normalized.file)
    fd.append("picture", normalized.picture)
    fd.append("feedback", normalized.feedback)

    await featuredStore.updateFeaturedProject(id.value, fd);

    Object.keys(isEditing).forEach((k) => {
      if (Array.isArray(isEditing[k])) isEditing[k] = [];
      else isEditing[k] = false;
    });

  } catch (err) {
    toast.error("Failed to save changes");
  }
}

async function deleteProject() {
  if (!confirm("Delete this featured project?")) return;
  try {
    await featuredStore.deleteFeaturedProject(id.value);
    toast.success("Project deleted");
    router.push("/dashboard");
  } catch (err) {
    toast.error("Failed to delete project");
  }
}

onMounted(async () => {
  if (!id.value) return router.push("/dashboard");

  await featuredStore.getFeaturedProject(id.value);
  project.value = featuredStore.selectedProject;

  if (!project.value) return;

  // Copy project into editable form
  const cloned = JSON.parse(JSON.stringify(project.value));
  const toArray = (val) => {
    if (Array.isArray(val)) return val;
    if (val === null || val === undefined || val === 'null' || val === '') return [];
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (!trimmed) return [];
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return trimmed.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  cloned.scope = toArray(cloned.scope);
  cloned.tags = toArray(cloned.tags);
  cloned.deliveredFeats = toArray(cloned.deliveredFeats);

  Object.assign(form, cloned);
  // Testimonial fields
  if (project.value.testimonial) {
    form.testimonial.feedback = project.value.testimonial.feedback || "";
    form.testimonial.pictureUrl = project.value.testimonial.pictureUrl || "";
  }
});
</script>
