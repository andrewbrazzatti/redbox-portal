"use strict";
/**
 * DOMPurify Configuration
 *
 * This configuration file defines different DOMPurify profiles for various use cases
 * across the application. Each profile specifies allowed tags, attributes, and other
 * sanitization rules for different content types.
 *
 * IMPORTANT: When using DOMPurify with this configuration, always apply the hooks
 * defined in this file to ensure proper security measures (especially for tabnapping
 * prevention with target="_blank" links).
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dompurifyConfig = {
    /**
     * Configuration profiles for different content types
     */
    profiles: {
        /**
         * SVG sanitization profile for user-uploaded SVG content
         * Used primarily for branding logos and icons
         *
         * SECURITY NOTE: 'foreignObject' is explicitly forbidden as it's a high-risk
         * XSS vector that can embed arbitrary HTML/iframes inside SVG, bypassing
         * content security policies and allowing script execution.
         */
        svg: {
            USE_PROFILES: { svg: true, svgFilters: true },
            ALLOWED_TAGS: [
                'svg', 'g', 'path', 'circle', 'ellipse', 'line', 'rect', 'polygon', 'polyline',
                'text', 'tspan', 'textPath', 'defs', 'clipPath', 'mask', 'pattern', 'image',
                'linearGradient', 'radialGradient', 'stop', 'symbol', 'marker', 'title', 'desc',
                'use'
            ],
            ALLOWED_ATTR: [
                // Core SVG attributes
                'class', 'id', 'style', 'fill', 'stroke', 'stroke-width', 'stroke-dasharray',
                'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
                'fill-opacity', 'stroke-opacity', 'opacity', 'transform', 'clip-path', 'mask',
                // Geometric attributes
                'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'width', 'height',
                'd', 'points', 'viewBox', 'preserveAspectRatio',
                // Text attributes
                'font-family', 'font-size', 'font-weight', 'font-style', 'text-anchor',
                'dominant-baseline', 'alignment-baseline', 'dx', 'dy', 'rotate',
                // Gradient attributes
                'gradientUnits', 'gradientTransform', 'spreadMethod', 'offset', 'stop-color',
                'stop-opacity', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'fx', 'fy',
                // Pattern attributes
                'patternUnits', 'patternContentUnits', 'patternTransform',
                // Animation attributes (safe ones)
                'dur', 'begin', 'end', 'repeatCount', 'values', 'keyTimes', 'keySplines',
                'calcMode', 'attributeName', 'attributeType', 'from', 'to', 'by',
                // Link attributes (restricted to fragments only)
                'href', 'xlink:href'
            ],
            FORBID_TAGS: [
                'script', 'iframe', 'embed', 'object', 'applet', 'meta', 'link', 'style',
                // Explicitly forbid foreignObject - high-risk XSS vector that can embed arbitrary HTML
                'foreignObject'
            ],
            FORBID_ATTR: [
                // All event handlers
                'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur',
                'onchange', 'onsubmit', 'onreset', 'onselect', 'onkeydown', 'onkeypress', 'onkeyup',
                'onmousedown', 'onmouseup', 'onmousemove', 'onmouseenter', 'onmouseleave',
                'ondblclick', 'oncontextmenu', 'onwheel', 'ondrag', 'ondrop', 'ondragover',
                'ondragstart', 'ondragend', 'ondragenter', 'ondragleave', 'onscroll', 'onresize',
                'onunload', 'onbeforeunload', 'onhashchange', 'onpopstate', 'onstorage',
                'onanimationstart', 'onanimationend', 'onanimationiteration', 'ontransitionend',
                'onplay', 'onpause', 'onended', 'ontimeupdate', 'onvolumechange', 'onwaiting',
                // SVG-specific animation events
                'onbegin', 'onend', 'onrepeat'
            ],
            ALLOW_DATA_ATTR: false,
            ALLOW_UNKNOWN_PROTOCOLS: false,
            ALLOWED_URI_REGEXP: /^(?:#|(?:\.{1,2}\/|\/(?!\/)))/i,
            SANITIZE_DOM: true,
            KEEP_CONTENT: false,
            IN_PLACE: false
        },
        /**
         * HTML content sanitization profile for rich text content
         * More restrictive than SVG, suitable for user-generated HTML content
         *
         * SECURITY NOTE: The 'target' attribute is allowed, but any link with target="_blank"
         * MUST have rel="noopener noreferrer" to prevent tabnapping attacks. This is enforced
         * via DOMPurify hooks (see afterSanitizeAttributes hook below) that automatically add
         * the required rel attribute to any anchor tag with target="_blank".
         */
        html: {
            ALLOWED_TAGS: [
                'a', 'p', 'br', 'strong', 'em', 'u', 'i', 'b', 'span', 'div',
                'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
            ],
            ALLOWED_ATTR: ['class', 'id', 'title', 'href', 'target', 'rel'],
            FORBID_TAGS: [
                'script', 'iframe', 'embed', 'object', 'applet'
            ],
            FORBID_ATTR: [
                // Forbid all event handlers
                'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur',
                'onchange', 'onsubmit', 'onreset', 'onselect', 'onkeydown', 'onkeypress', 'onkeyup',
                'onmousedown', 'onmouseup', 'onmousemove', 'onmouseenter', 'onmouseleave',
                'ondblclick', 'oncontextmenu', 'onwheel', 'ondrag', 'ondrop', 'ondragover'
            ],
            ALLOW_DATA_ATTR: false,
            ALLOW_UNKNOWN_PROTOCOLS: false,
            ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
            SANITIZE_DOM: true,
            KEEP_CONTENT: true,
            IN_PLACE: false
        },
        /**
         * Minimal sanitization profile for trusted content
         * Use only for content from trusted sources that needs light sanitization
         */
        minimal: {
            FORBID_TAGS: [
                'script', 'iframe', 'embed', 'object', 'applet'
            ],
            FORBID_ATTR: [
                // Forbid all event handlers
                'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur',
                'onchange', 'onsubmit', 'onreset', 'onselect', 'onkeydown', 'onkeypress', 'onkeyup',
                'onmousedown', 'onmouseup', 'onmousemove', 'onmouseenter', 'onmouseleave',
                'ondblclick', 'oncontextmenu', 'onwheel', 'ondrag', 'ondrop', 'ondragover'
            ],
            ALLOW_DATA_ATTR: true,
            ALLOW_UNKNOWN_PROTOCOLS: false,
            ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
            SANITIZE_DOM: true,
            KEEP_CONTENT: true,
            IN_PLACE: false
        }
    },
    /**
     * Default profile to use if none is specified
     */
    defaultProfile: 'html',
    /**
     * DOMPurify hooks for additional sanitization logic
     * These hooks are applied during the sanitization process
     */
    hooks: {
        /**
         * afterSanitizeAttributes hook: Automatically add rel="noopener noreferrer"
         * to any anchor tag with target="_blank" to prevent tabnapping attacks.
         */
        afterSanitizeAttributes: function (node) {
            // Check if node is an anchor tag with target="_blank"
            if (node.tagName === 'A' && node.hasAttribute('target')) {
                const target = node.getAttribute('target');
                if (target === '_blank') {
                    // Get existing rel attribute value or empty string
                    const existingRel = node.getAttribute('rel') || '';
                    const relValues = existingRel.split(/\s+/).filter(v => v);
                    // Add 'noopener' if not present
                    if (!relValues.includes('noopener')) {
                        relValues.push('noopener');
                    }
                    // Add 'noreferrer' if not present
                    if (!relValues.includes('noreferrer')) {
                        relValues.push('noreferrer');
                    }
                    // Set the updated rel attribute
                    node.setAttribute('rel', relValues.join(' '));
                }
            }
        }
    },
    /**
     * Global settings that apply to all profiles
     */
    globalSettings: {
        // Add any global DOMPurify settings here
        FORCE_BODY: false,
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: false,
        RETURN_TRUSTED_TYPE: false
    }
};
module.exports.dompurify = dompurifyConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tcHVyaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL2RvbXB1cmlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7QUFJSCxNQUFNLGVBQWUsR0FBb0I7SUFFdkM7O09BRUc7SUFDSCxRQUFRLEVBQUU7UUFFUjs7Ozs7OztXQU9HO1FBQ0gsR0FBRyxFQUFFO1lBQ0gsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO1lBQzdDLFlBQVksRUFBRTtnQkFDWixLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVU7Z0JBQzlFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPO2dCQUMzRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTTtnQkFDL0UsS0FBSzthQUNOO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLHNCQUFzQjtnQkFDdEIsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsa0JBQWtCO2dCQUM1RSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUI7Z0JBQzdFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNO2dCQUM3RSx1QkFBdUI7Z0JBQ3ZCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElB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