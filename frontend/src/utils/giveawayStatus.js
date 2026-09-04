export const GIVEAWAY_STATUS = {
    UPCOMING: "UPCOMING",
    ACTIVE: "ACTIVE",
    ENDED: "ENDED",
    ARCHIVED: "ARCHIVED",
};

export function canParticipate(status) {
    return status === GIVEAWAY_STATUS.ACTIVE;
}

export function canShowWinners(status) {
    return (
        status === GIVEAWAY_STATUS.ENDED ||
        status === GIVEAWAY_STATUS.ARCHIVED
    );
}

export function getStatusLabel(status) {
    const labels = {
        UPCOMING: "Upcoming",
        ACTIVE: "Giveaway Live",
        ENDED: "Giveaway Ended",
        ARCHIVED: "Archived",
    };

    return labels[status] ?? "unknown";
}