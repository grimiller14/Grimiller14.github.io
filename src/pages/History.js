

const History = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]").slice().reverse();

    const imageHistory = history.filter(entry => entry.isImage).slice(0, 24);
    const textHistory = history.filter(entry => !entry.isImage).slice(0, 20);

    return (
        <div className="list-page">
            <h2>History</h2>
            {history.length === 0 ? (
                <p>No history yet.</p>
            ) : (
                <>
                    <div className="history-column">
                        <h3>Text</h3>
                        <ul className="history-list">
                            {textHistory.map((entry, i) => (
                                <li key={i} className="history-text-item">
                                    {entry.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="history-grid">
                        {imageHistory.map((entry, i) => (
                            <img
                                key={i}
                                src={entry.content}
                                alt={`History ${i}`}
                                className="history-image"
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default History;
