

const Favorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    return (
        <div className="list-page">
            <h2>Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <ul>
                    {favorites.map((item, i) => (
                        <li key={i}>
                            {item.startsWith("http") ? (
                                <img src={item} alt={`Favorite ${i}`} className="position-image" />
                            ) : (
                                item
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;
