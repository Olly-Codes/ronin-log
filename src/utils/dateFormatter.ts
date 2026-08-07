export const dateFormat = (date: Date | string) => {
    return new Date(date).toLocaleString(`en-ZA`, {
        dateStyle: "medium",
        timeStyle: "short"
    });
};