import { reactive, ref } from 'vue';

// Shared by the router, opening animation and connection feedback.
export const navigationLoad = reactive({
    pending: false,
    target: '',
    error: false,
    initialSettled: false,
});

// Only the home route opts into opening image preparation. Blog images keep
// their normal lazy loading and never hold the opening animation.
export const openingLoad = reactive({ active: true, waitForImages: false });
const pendingImages = reactive(new Set<symbol>());
export const pendingImageCount = () => pendingImages.size;
export function startImageLoading(id: symbol) { pendingImages.add(id); }
export function settleImageLoading(id: symbol) { pendingImages.delete(id); }

const failedImages = reactive(new Set<symbol>());
export const failedImageCount = () => failedImages.size;
export const imageRetryVersion = ref(0);
export function markImageFailed(id: symbol) { failedImages.add(id); }
export function clearImageFailure(id: symbol) { failedImages.delete(id); }
export function retryFailedImages() { imageRetryVersion.value += 1; }

type Connection = { saveData?: boolean; effectiveType?: string; downlink?: number; rtt?: number };
export function conserveImageBandwidth() {
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    return !navigator.onLine || !!connection?.saveData
        || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? '')
        || (connection?.downlink !== undefined && connection.downlink < 1.5)
        || (connection?.rtt !== undefined && connection.rtt > 350);
}
