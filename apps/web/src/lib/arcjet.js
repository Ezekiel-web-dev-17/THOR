import arcjet, { tokenBucket, fixedWindow, shield, detectBot } from "@arcjet/next";

// Initialize Arcjet with your site key
export const aj = arcjet({
    key: process.env.ARCJET_KEY, // Get from https://app.arcjet.com
    characteristics: ["userId"], // Track by user ID
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                "CATEGORY:MONITOR", // Uptime monitoring services
                "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord

            ],
        }),
        // NOTE: Rate limits are NOT in global rules!
        // They're applied per-route using .withRule() for flexibility
    ],
});

// Rate limit for comment creation - stricter limit on comments
export const commentRateLimit = tokenBucket({
    mode: "LIVE", // Will actually block requests
    refillRate: 2, // Refill 2 tokens per interval
    interval: 60, // Every 60 seconds
    capacity: 5, // Bucket can hold max 5 tokens (5 comments per minute)
});

// Rate limit for likes - more lenient on likes
export const likeRateLimit = fixedWindow({
    mode: "LIVE",
    window: "60s", // 60 second window
    max: 20, // 20 requests per window
});

// Alternative: Sliding window for smoother rate limiting on likes
export const smoothLikeRateLimit = tokenBucket({
    mode: "LIVE",
    refillRate: 10, // Refill 10 tokens per interval
    interval: 60, // Every 60 seconds
    capacity: 20, // Bucket can hold max 20 tokens
});
