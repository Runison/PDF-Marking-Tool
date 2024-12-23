import React, { useState } from 'react';

const Upload = ({ onUpload }) => {
    const [projectName, setProjectName] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectName', projectName);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        onUpload(data.projectId);
    };

    return (
        <div>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
            />
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default Upload;
