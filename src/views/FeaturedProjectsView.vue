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

          <!-- Service type -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Service type
              <button
                type="button"
                @click.stop="toggleEdit('serviceType')"
                class="p-1 rounded bg-white/10 hover:bg-white/20 transition inline-flex items-center justify-center"
              >
                <Pencil v-if="!isEditing.serviceType" class="w-3 h-3 pointer-events-none" />
                <Eye v-else class="w-3 h-3 pointer-events-none" />
              </button>
            </label>

            <div v-if="!isEditing.serviceType" class="cursor-pointer">
              {{ form.serviceType }}
            </div>

            <select
              v-else
              v-model="form.serviceType"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            >
              <option value="business_website">Business website</option>
              <option value="internal_tool">Internal tool</option>
              <option value="automated_workflow">Automated workflow</option>
            </select>
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
  status: false,
  serviceType: false,
  video: false,
});

// Main form (mirroring schema)
const form = reactive({
  title: "",
  description: "",
  status: "draft",
  link: "",
  file: null,
  serviceType: "business_website" || "internal_tool" || "automated_workflow",
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

// File uploads
function onVideoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  form.file = file;
}

// Save project updates
async function saveChanges() {
  try {
    const normalized = {
      title: form.title ?? null,
      description: form.description ?? null,
      link: form.link ?? null,
      status: form.status ?? null,
      serviceType: form.serviceType ?? null,
      file: form.file ?? null,
    };

    const fd = new FormData();

    fd.append("title", normalized.title)
    fd.append("description", normalized.description)
    fd.append("status", normalized.status)
    fd.append("link", normalized.link)
    fd.append("file", normalized.file)
    fd.append("serviceType", normalized.serviceType)

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

  Object.assign(form, cloned);
});
</script>
