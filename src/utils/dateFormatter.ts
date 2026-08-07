export const dateFormat = (date: Date) => {
    return new Date(date).toLocaleString(`en-ZA`, {
        dateStyle: "medium",
        timeStyle: "short"
    });
};