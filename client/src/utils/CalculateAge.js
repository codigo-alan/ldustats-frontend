

export function calculateAge(birth) {
    const difference = new Date() - (new Date(birth))
    const calculatedAge = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
    return `${calculatedAge}`
}