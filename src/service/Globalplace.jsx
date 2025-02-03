import axios from "axios";

export const GetPlaceDetails = async (placeName) => {
    const WIKIPEDIA_API_URL = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(placeName)}&prop=pageimages|images&format=json&pithumbsize=1000&origin=*`;

    try {
        const response = await axios.get(WIKIPEDIA_API_URL);
        const pages = response.data.query.pages;

        console.log("Wikipedia API Response:", pages); // For Debugging

        // Handle Missing Pages
        const pageId = Object.keys(pages)[0];
        if (pageId === "-1") {
            console.error(`No Wikipedia page found for ${placeName}`);
            return null;
        }

        const title = pages[pageId]?.title || "";

        // Normalize the placeName by replacing spaces with underscores
        const placeNameWords = placeName.toLowerCase().split(" ").join("_");
        
        // Split the title by underscores
        const titleWords = title.toLowerCase().split("_");

        // Try to match the exact words from placeName in the title
        for (let placeWord of placeNameWords.split("_")) {
            // If any word from placeName matches a word in the title, return the image URL
            if (titleWords.some(titleWord => titleWord.includes(placeWord))) {
                let imageUrl = pages[pageId]?.thumbnail?.source || null;

                // Fetch from imageinfo if no thumbnail
                if (!imageUrl) {
                    const firstImageTitle = pages[pageId]?.images?.[0]?.title;
                    if (firstImageTitle) {
                        const IMAGE_URL = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(firstImageTitle)}&prop=imageinfo&iiprop=url&format=json&origin=*`;

                        const imageResponse = await axios.get(IMAGE_URL);
                        const imagePages = imageResponse.data.query.pages;
                        const imagePageId = Object.keys(imagePages)[0];

                        imageUrl = imagePages[imagePageId]?.imageinfo?.[0]?.url || null;
                    }
                }

                console.log(`Image URL for ${placeName} (matched word '${placeWord}' in title):`, imageUrl);
                return imageUrl;
            }
        }

        console.log(`No matching word found for ${placeName} in the title`);
        return null;
    } catch (error) {
        console.error("Error fetching Wikipedia image:", error);
        return null;
    }
};
