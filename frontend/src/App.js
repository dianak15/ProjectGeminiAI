import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [transcript, setTranscript] = useState('');
    const [summaries, setSummaries] = useState([]);
    const [actionItems, setActionItems] = useState([]);
    const [audioFile, setAudioFile] = useState(null);

    const handleFileChange = (event) => {
        setAudioFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        // Check if an audio file has been selected
        if (!audioFile) {
            alert('Please select an audio file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', audioFile);

        try {
            const response = await axios.post('https://api.gemini.ai/v1/transcribe', formData, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Process the response
            const { transcription, summary, actionItems } = response.data;
            setTranscript(transcription);
            setSummaries(summary);
            setActionItems(actionItems);

            // Optionally, send to your backend
            await axios.post('https://backend-khtr.onrender.com/api/transcripts', {
                text: transcription,
                summary: summary,
                actionItems: actionItems,
            });

        } catch (error) {
            console.error('Error during audio transcription:', error);
            alert('An error occurred while processing the audio file. Please try again.');
        }
    };

    return (
        <div>
            <h1>Speech to Text App</h1>
            <input type="file" accept="audio/mp3" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Audio</button>
            <h2>Transcript:</h2>
            <p>{transcript}</p>
            <h2>Summary:</h2>
            <p>{summaries}</p>
            <h2>Action Items:</h2>
            <ul>
                {actionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
