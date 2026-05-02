import { GrowthStage, TrackedStage } from '../types';
import { getTasksForStage } from './stageTasks';

/**
 * Parses a duration string like "7-10 days", "2-3 weeks", "30 days" into an average number of days.
 */
export const parseDuration = (str: string): number => {
    const normalized = str.toLowerCase().trim();

    // Extract numbers
    const numbers = normalized.match(/\d+/g);
    if (!numbers || numbers.length === 0) return 14; // default fallback

    const nums = numbers.map(Number);
    const avg = nums.length > 1 ? Math.round((nums[0] + nums[1]) / 2) : nums[0];

    // Detect unit
    if (normalized.includes('week')) return avg * 7;
    if (normalized.includes('month')) return avg * 30;
    return avg; // assume days
};

/**
 * Takes the raw GrowthStage[] from Gemini and a start date, returns TrackedStage[] with real dates and tasks.
 */
export const calculateStageSchedule = (stages: GrowthStage[], startDate: Date): TrackedStage[] => {
    let currentDate = new Date(startDate);

    return stages.map(stage => {
        const durationDays = parseDuration(stage.duration);
        const stageStart = new Date(currentDate);
        const stageEnd = new Date(currentDate);
        stageEnd.setDate(stageEnd.getDate() + durationDays);

        const tracked: TrackedStage = {
            name: stage.name,
            durationDays,
            startDate: stageStart.toISOString(),
            endDate: stageEnd.toISOString(),
            tasks: getTasksForStage(stage.name),
            notified: false,
        };

        currentDate = new Date(stageEnd); // next stage starts where this one ends
        return tracked;
    });
};

/**
 * Finds the currently active stage based on today's date.
 */
export const getCurrentStage = (stages: TrackedStage[]): TrackedStage | null => {
    const now = Date.now();
    return stages.find(s => now >= new Date(s.startDate).getTime() && now < new Date(s.endDate).getTime()) || null;
};

/**
 * Gets the index of the current stage (0-based), or -1 if completed / not started.
 */
export const getCurrentStageIndex = (stages: TrackedStage[]): number => {
    const now = Date.now();
    return stages.findIndex(s => now >= new Date(s.startDate).getTime() && now < new Date(s.endDate).getTime());
};

/**
 * Returns progress (0-100) within the current stage.
 */
export const getStageProgress = (stage: TrackedStage): number => {
    const now = Date.now();
    const start = new Date(stage.startDate).getTime();
    const end = new Date(stage.endDate).getTime();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
};

/**
 * Returns overall progress (0-100) across all stages.
 */
export const getOverallProgress = (stages: TrackedStage[]): number => {
    if (stages.length === 0) return 0;
    const start = new Date(stages[0].startDate).getTime();
    const end = new Date(stages[stages.length - 1].endDate).getTime();
    const now = Date.now();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
};

/**
 * Format a date nicely: "Apr 26"
 */
export const formatShortDate = (iso: string): string => {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * Days remaining until a date.
 */
export const daysUntil = (iso: string): number => {
    const diff = new Date(iso).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86400000));
};
