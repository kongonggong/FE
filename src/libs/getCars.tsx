export default async function getCars() {
    try {
        const response = await fetch("http://localhost:5003/api/cars/search", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Ensure fresh data every request
        });

        if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }

        return await response.json(); // Return JSON data
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
}
