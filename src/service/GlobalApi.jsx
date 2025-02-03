import axios from "axios";

export const GetPlaceDetails = async (placeName) => {
    const WIKIPEDIA_API_URL = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(placeName)}&prop=pageimages|images&format=json&pithumbsize=1000&origin=*`;

    try {
        const response = await axios.get(WIKIPEDIA_API_URL);
        const pages = response.data.query.pages;

        console.log("Wikipedia API Response:", pages); // Debugging

        const pageId = Object.keys(pages)[0];

        if (!pageId || pages[pageId]?.missing) {
            console.error("Error: Wikipedia page not found for", placeName);
            return null;
        }

        let imageUrl = pages[pageId]?.thumbnail?.source || null;

        // If `pageimages` is missing, try fetching from `imageinfo`
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

        console.log(`Image URL for ${placeName}:`, imageUrl);
        return imageUrl;
    } catch (error) {
        console.error("Error fetching Wikipedia image:", error);
        return null;
    }
};
