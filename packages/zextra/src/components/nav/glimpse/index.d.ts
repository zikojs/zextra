import { UIElement } from "ziko/src/ui";

/**
 * A UI element that displays a rich preview (glimpse) for a link.
 *
 * The preview can include a title, description, image, and optional
 * delay before it appears. It is typically shown when the user hovers
 * over or focuses the trigger element.
 */
export declare class UIGlimpse extends UIElement {}

/**
 * Creates a Glimpse component that displays a rich preview for a URL.
 *
 * @param props Configuration options for the preview.
 * @param props.url The URL associated with the preview.
 * @param props.target Specifies where the linked document should open.
 * @param props.title The preview title.
 * @param props.description A short description displayed in the preview.
 * @param props.image The preview image URL.
 * @param props.delay Delay (in milliseconds) before the preview is shown.
 * @param items Child UI elements that act as the preview trigger.
 *
 * @returns A {@link UIGlimpse} instance.
 *
 * @example
 * ```ts
 * Glimpse(
 *   {
 *     url: "https://example.com",
 *     title: "Example",
 *     description: "An example website.",
 *     image: "/preview.png",
 *     delay: 300
 *   },
 *   "Visit Example"
 * );
 * ```
 */
export declare function Glimpse(
    props?: {
        /** Destination URL. */
        url?: string;

        /** Target where the URL will open. */
        target?: HTMLAnchorElement["target"];

        /** Preview title. */
        title?: string;

        /** Preview description. */
        description?: string;

        /** Preview image URL. */
        image?: string;

        /** Delay before showing the preview (ms). */
        delay?: number;
    },
    ...items: UIElement[]
): UIGlimpse;

// export declare function Wrap(...items: UIElement[]): Glimpse;