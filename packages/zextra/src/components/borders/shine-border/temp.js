 import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.2.min.js";

    const { div, h2, p } = van.tags;

    /**
     * ShineBorder component for VanJS.
     * 
     * @param {Object} props
     * @param {string|string[]} [props.shineColor="#3b82f6"] - Color or array of colors for the shine effect.
     * @param {number|string} [props.shineLength=30] - Length/width of the beam as a percentage (1 to 100) or CSS angle string (e.g., "90deg").
     * @param {...(Element|string)} children - Child elements inside the shine border.
     */
    function ShineBorder({ shineColor = "#3b82f6", shineLength = 30 }, ...children) {
      // Normalize color array
      const colorValue = Array.isArray(shineColor) ? shineColor.join(", ") : shineColor;

      // Format length into a valid CSS unit (% or degree)
      const lengthValue = typeof shineLength === "number" ? `${shineLength}%` : shineLength;

      return div(
        {
          class: "shine-container",
          style: `--shine-color: ${colorValue}; --shine-length: ${lengthValue};`
        },
        div(
          { class: "shine-content" },
          ...children
        )
      );
    }

    // App Layout / Demo Usage
    const App = () =>
      div(
        { style: "display: flex; gap: 24px; flex-wrap: wrap;" },

        // Narrow / Sharp beam (10% length)
        ShineBorder(
          { shineColor: "#f43f5e", shineLength: 10 },
          div(
            { class: "card" },
            h2("Sharp Beam"),
            p("shineLength: 10 (Narrow accent)")
          )
        ),

        // Medium / Standard beam (35% length)
        ShineBorder(
          { shineColor: ["#a855f7", "#ec4899", "#3b82f6"], shineLength: 35 },
          div(
            { class: "card" },
            h2("Standard Sweep"),
            p("shineLength: 35 (Medium accent)")
          )
        ),

        // Wide / Long beam (70% length)
        ShineBorder(
          { shineColor: "#10b981", shineLength: 100 },
          div(
            { class: "card" },
            h2("Wide Glow"),
            p("shineLength: 70 (Wider arc)")
          )
        )
      );

    van.add(document.body, App());