<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { Calendar, Laptop, Lock, Rocket, Star, UserCircle, FileCog, LayoutDashboard, UsersRound, Package, ClipboardList, FileText, BarChart3, CalendarDays, Workflow, Mail, MessageSquare, FileInput, RefreshCcw, BellRing, DatabaseZap, Link2, Clock3 } from 'lucide-vue-next';
    import serviceCard from '@/components/service.card.vue';

    const props = defineProps({
        serviceType: {
            type: String,
            required: true
        }
    })

    const info = ref([])

    const websiteTypes = [
        {
            icon: Laptop,
            title: 'Business Websites',
            desc: 'Professional websites that introduce your business and build trust'
        },
        {
            icon: Rocket,
            title: 'Landing pages',
            desc: 'High-converting pages focused on turning visitors into enquiries'
        },
        {
            icon: Calendar,
            title: 'Booking websites',
            desc: 'Allow your customers to make bookings or appointments online'
        },
        {
            icon: UserCircle,
            title: 'Portfolio websites',
            desc: 'Showcase your work, projects and services beutifully'
        },
        {
            icon: FileCog,
            title: 'Brochure websites',
            desc: 'Simple, effective websites that present key information clearly'
        },
        {
            icon: Lock,
            title: 'Client portals',
            desc: 'Give your clients a secure place to access their information'
        },
        {
            icon: Star,
            title: 'Membership websites',
            desc: 'Manage members, content and access in one central place'
        },
    ]

    const toolTypes = [
        {
            icon: LayoutDashboard,
            title: 'Dashboards',
            desc: 'Bring your most important business information into one place with real-time dashboards and reporting'
        },
        {
            icon: UsersRound,
            title: 'Client management',
            desc: 'Keep customer information, communication and history organized in a single system'
        },
        {
            icon: Package,
            title: 'Inventory management',
            desc: 'Track stock levels, purchases and product movement with greater accuracy'
        },
        {
            icon: ClipboardList,
            title: 'Project management',
            desc: 'Plan work, assign tasks and monitor project progress from one central platform'
        },
        {
            icon: CalendarDays,
            title: 'Booking & Scheduling',
            desc: 'Manage appointments, bookings and availability more efficiently'
        },
        {
            icon: FileText,
            title: 'File management',
            desc: 'Store, organaize and quickly access important business documents'
        },
        {
            icon: BarChart3,
            title: 'Reporting & analytics',
            desc: 'Turn everyday business data into clear, actionable insights'
        },
        {
            icon: Workflow,
            title: 'Workflow management',
            desc: 'Build processes that reduce manual work and keep operations running smoothly'
        },
    ]

    const workflow = [
        {
            icon: Mail,
            title: 'Email automation',
            desc: 'Send emails automatically based on actions, schedules or customer activity'
        },
        {
            icon: MessageSquare,
            title: 'WhatsApp Notifications',
            desc: 'Keep customers and staff informed with automated WhatsApp'
        },
        {
            icon: FileInput,
            title: 'Form processing',
            desc: 'Automatically organize and route information submitted through online forms'
        },
        {
            icon: RefreshCcw,
            title: 'Data synchronization',
            desc: 'Keep information consistent accross the tools your business already uses'
        },
        {
            icon: BellRing,
            title: 'Reminders & alerts',
            desc: 'Reduce missed deadlines with automatic reminders and notifications'
        },
        {
            icon: DatabaseZap,
            title: 'Data management',
            desc: 'Move and organize business daata without repetitive manual work'
        },
        {
            icon: Link2,
            title: 'Software integrations',
            desc: 'Connect your existing software so information flows automatically'
        },
        {
            icon: Clock3,
            title: 'Recurring tasks',
            desc: 'Automate routine daily, weekly or monthly business processes'
        },
    ]

    const service = async () => {
        switch (props.serviceType) {
            case 'websites':
                    info.value = websiteTypes
                break;
            case 'businesstools':
                    info.value = toolTypes
                break;
            case 'workflow':
                    info.value = workflow
                break;
            default:
                info.value = []
                break;
        }
    }

    watch(
        () => props.serviceType,
        async () => {
            await service()
        },
        { immediate: true }
    )

    onMounted(async () => {
        await service()
    })
</script>

<template>
    <section class="w-full flex flex-col gap-4">
        <header class="flex flex-col gap-2 text-center">
            <p class=" font-semibold text-primary uppercase">{{ serviceType === 'websites' ? 'Professional Websites' : serviceType === 'businesstools' ? 'Business Tools' : 'Workflow Automation' }}</p>
            <h2
                id="services-title"
                class="md:text-4xl sm:text-3xl text-2xl font-semibold"
            >
                What we offer
            </h2>
        </header>
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            <serviceCard 
                v-for="(types, index) in info"
                :key="index"
                :icon="types.icon"
                :title="types.title"
                :desc="types.desc"
            />
        </div>
        
    </section>
</template>

<style scoped>

</style>