# Video Configurations & Custom Thumbnails

This folder contains the video data lists for all pages on the site, as well as instructions for managing custom thumbnails and adding new video pages.

## 1. Video JSON Config Files
*   `global.json`: Serves as the primary list of videos shown on the homepage and as a fallback list for services that do not have custom videos.
*   `[service-id].json` (e.g., `glp-1therapies.json`, `skin-aesthetics.json`): Custom videos shown specifically on that service page.

---

## 2. How to Add Videos for a New Service
If you create a new service page (e.g., `peptides.html` or `hormone-optimization.html`) and want to give it its own custom video list:

1.  **Find the Service ID:** Open the service's HTML file and find the service ID line (usually near the top).
    *   *Example:* `const OVI_SERVICE_ID = "peptides";`
2.  **Create the JSON File:** In this `assets/videos/` directory, create a new file named exactly `[service-id].json` (e.g., `peptides.json`).
3.  **Add Your Video Data:** Copy and paste this template into your new file, changing the values:
    ```json
    [
      {
        "url": "https://www.youtube.com/watch?v=VIDEO_ID",
        "title": "Your Video Title",
        "category": "Video Category",
        "description": "A brief description of the video content."
      }
    ]
    ```
4.  **Save the File:** Once saved, the new service page will automatically load these videos instead of falling back to the global ones.

---

## 3. Managing Custom Thumbnails
By default, the system will automatically:
*   Fetch high-quality thumbnails from YouTube (if a YouTube link is used).
*   Apply styled CSS color gradients matching the platform (Instagram, Facebook, TikTok) for non-YouTube links.

If you want to use a **custom image** instead of the automatic thumbnail:
1.  Compress your image (recommended size: **16:9 aspect ratio**, format **WebP**, size **<200KB**).
2.  Place the image file in the `assets/images/videos/` folder.
3.  Add the `customThumbnail` property to that video entry in the JSON file.

### JSON Schema Example with Custom Thumbnail
```json
{
  "url": "https://www.instagram.com/p/DYdP6SdxAtN/",
  "title": "Aesthetic Treatment Tour",
  "category": "Patient Experience",
  "description": "A close-up look at our precision skin treatments.",
  "customThumbnail": "assets/images/videos/aesthetics-tour.webp"
}
```

*Note: The path in `customThumbnail` is relative to the root page, so always prefix it with `assets/images/videos/`.*
