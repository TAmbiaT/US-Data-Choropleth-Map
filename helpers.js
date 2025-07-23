function updatePanel(cardID, d, close = false) {
    const card1 = d3.select("#card-1");
    const card2 = d3.select("#card-2");
    // panel is defined in index.html script scope

    // Close Panel
    if (close) {
        card1.style("width", "0px");
        setTimeout(() => {
            card1.style("visibility", "hidden");
            card2.style("display", "none");
            exitButton.style("visibility", "hidden");
            compareButton.style("visibility", "hidden");
        }, 300);  
        if(innerWidth <= 1024) panel.style("display", "none");
        return;  
    } 
    // Open Panel 1
    else if (cardID === "card-1") {
        panel.style("display", "flex")
        card2.style("display", "none");
        card1.style("width", "400px").style("visibility", "visible");
        exitButton.style("visibility", "visible");
        compareButton.style("visibility", "visible");
        fillCardContent("card-1", d);
    } 
    // Open Panel 2
    else {
        panel.style("width", "750px");
        card1.style("width", "auto")
        card2.style("display", "block").style("visibility", "visible");
        exitButton.style("visibility", "hidden");
        fillCardContent("card-2", d);
    }
}

// Helper to render card content
function fillCardContent(cardID, d) {
    const card = d3.select(`#${cardID}`);
    card.html(""); // Clear previous content

    if (!d) {
        card.append("div")
            .attr("class", "section-content")
            .text("No data available for this location.");
        return;
    }

    // Get FIPS and data object
    let fips = d.id ? (d.id.length === 2 ? d.id + "000" : d.id) : d.FIPS;
    const data = educationData[fips];
    if (!data) {
        card.append("div")
            .attr("class", "section-content")
            .text("No data available for this location.");
        return;
    }

    const content = `
        <div class="card-title">${d.properties?.name}</div>
        <div class="section-title">Population Stats </div>
        <div class="section-content"><strong>Sampled Population:</strong> ${data['SampledPopulation'] ?? "N/A"}</div>
        <div class="section-title">Education Stats (total)</div>
        <div class="section-content"><strong>Did not Complete HS:</strong> ${data['Less HS Num'] ?? "N/A"}</div>
        <div class="section-content"><strong>Completed HS:</strong> ${data['HS Num'] ?? "N/A"}</div>
        <div class="section-content"><strong>Some College/Associate:</strong> ${data['Some College/Associate Num'] ?? "N/A"}</div>
        <div class="section-content"><strong>Bachelor's/Above:</strong> ${data['Bachelor/More Num'] ?? "N/A"}</div>
        
        <div class="section-title">Education Stats (%)</div>
        <div class="section-content"><strong>Did not Complete HS:</strong> ${data['Less HS Pct'] ?? "N/A"}%</div>
        <div class="section-content"><strong>Completed HS:</strong> ${data['HS Pct'] ?? "N/A"}%</div>
        <div class="section-content"><strong>Some College/Associate:</strong> ${data['Some College/Associate Pct'] ?? "N/A"}%</div>
        <div class="section-content"><strong>Bachelor's/Above:</strong> ${data['Bachelor/More Pct'] ?? "N/A"}%</div>
        
        <div class="section-title">Poverty Stats (total)</div>
        <div class="section-content"><strong>Poverty (All):</strong> ${data['Poverty Num (ALL)'] ?? "N/A"}</div>
        <div class="section-content"><strong>Poverty (Ages 0-17):</strong> ${data['Poverty Num (0-17)'] ?? "N/A"}</div>
        
        <div class="section-title">Poverty Stats (%)</div>
        <div class="section-content"><strong>Poverty Rate (All):</strong> ${data['Poverty Pct (ALL)'] ?? "N/A"}%</div>
        <div class="section-content"><strong>Poverty Rate (Ages 0-17):</strong> ${data['Poverty Pct (0-17)'] ?? "N/A"}%</div>
       
        <div class="section-title">Income Stats</div>
        <div class="section-content"><strong>Median Household Income:</strong>$${data['Median Household Income'] ?? "N/A"}</div>`
    ;
   card.html(content);
}

function populateDropdown(educationData) {
    // Metrics to include in dropdown
    const metricMap = {
        "Less HS Pct": "Did Not Complete HS (%)",
        "HS Pct": "Completed HS (%)",
        "Some College/Associate Pct": "Some College/Associate (%)",
        "Bachelor/More Pct": "Bachelor's or Higher (%)",
        "Poverty Pct (ALL)": "Poverty Rate (All Ages) (%)",
        "Poverty Pct (0-17)": "Poverty Rate (Ages 0-17) (%)",
        "Median Household Income": "Median Household Income ($)"
    };
    const metrics = Object.keys(metricMap);

    const select = d3.select("#metric-select");
    select.selectAll("option")
        .data(metrics)
        .join("option")
        .attr("value", d => d)
        .text(d => metricMap[d]);
    return metrics; 
}

// Draw/update the legend for the color scale
function updateLegend(colorScale, min, max) {
    const controlsWidth = d3.select("#controls").node().getBoundingClientRect().width;
    console.log("Controls width:", controlsWidth);
    const legendWidth = controlsWidth > 600 ? 600 : controlsWidth-40;
    const legendHeight = 40;
    const legendSteps = colorScale.range().length;
    const step = (max - min) / legendSteps;
    const padding = 10; 

    // Remove old legend
    d3.select("#legend").selectAll("*").remove();

    const svg = d3.select("#legend")
        .append("svg")
        .attr("width", legendWidth + 2 * padding)
        .attr("height", legendHeight + 30);

    svg.selectAll("rect")
        .data(colorScale.range())
        .join("rect")
        .attr("x", (d, i) => padding + i * legendWidth / legendSteps)
        .attr("y", 0)
        .attr("width", legendWidth / legendSteps)
        .attr("height", legendHeight)
        .attr("fill", d => d);

    function formatLabel(val) {
        val = +val;
        return (val >= 1000) ? val.toLocaleString() : val;
    }

    // Draw labels, shifted right by padding
    const labels = Array.from({length: legendSteps + 1}, (_, i) =>
        formatLabel((min + i * step).toFixed(0))
    );

    svg.selectAll("text")
        .data(labels)
        .join("text")
        .attr("x", (d, i) => {
            // Offset first and last label inward by 10px
            if (i === 0) return padding ;
            if (i === labels.length - 1) return padding + legendWidth;
            return padding + i * legendWidth / legendSteps;
        })
        .attr("y", legendHeight + 20)
        .attr("text-anchor", (d, i) => {
            if (i === 0) return "start";
            if (i === labels.length - 1) return "end";
            return "middle";
        })
        .attr("font-size", "12px")
        .text(d => d);
}
