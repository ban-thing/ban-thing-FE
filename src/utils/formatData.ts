export function formatDate(dateString: Date | string): string {
    const inputData = new Date(dateString);
    const hours = inputData.getHours();
    const minutes = inputData.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${period} ${formattedHours}:${formattedMinutes}`;
}
