export async function parseCsvFile(file) {
    const text = await file.text();
    const lines = text.split('\r\n');

    const dataRows = lines.slice(1).filter(line => line.trim());

    return dataRows.map(row => {
        const cells = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(cell => cell.replace(/(^"|"$)/g, '').trim());

        const [date, description, amount, type] = cells;

        if (!date || !description || !amount || !type) {
            throw new Error('Invalid CSV format');
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format');
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            throw new Error('Invalid amount format');
        }

        if (!['income', 'expense'].includes(type.toLowerCase())) {
            throw new Error('Invalid transaction type');
        }

        return {
            id: crypto.randomUUID(),
            date: parsedDate,
            description,
            amount: parsedAmount,
            type: type.toLowerCase()
        };
    });
}