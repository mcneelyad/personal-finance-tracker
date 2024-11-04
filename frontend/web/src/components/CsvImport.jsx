import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { parseCsvFile } from '../utils/csvParser.js';

export default function CsvImport({ onImport }) {
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const transactions = await parseCsvFile(file);
            onImport(transactions);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            alert('Error importing CSV file. Please make sure it matches the required format.');
        }
    };

    return (
        <div className="flex items-center gap-2">
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
                <Upload className="w-5 h-5" />
                Import CSV
            </button>
        </div>
    );
}