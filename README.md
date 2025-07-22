# 🗺️ US Education & Financial Choropleth Map

An interactive web-based map visualizing educational attainment and financial indicators across all US states and counties. This application allows users to explore geographic disparities in data such as poverty rates, median income, and high school graduation rates by interacting directly with a D3-powered map.

Users can select different metrics from a dropdown menu to dynamically recolor the map, and click on states/counties to reveal detailed information. A comparison mode allows for side-by-side inspection of two locations at once.

---

## 🔗 Live Demo

👉 [Click here to view the project](https://raw.githack.com/TAmbiaT/US-Data-Choropleth-Map/main/index.html)  
> Hosted via [raw.githack.com](https://raw.githack.com) for lightweight access
<a href="https://raw.githack.com/TAmbiaT/US-Data-Choropleth-Map/main/index.html" target="_blank">
  <img width="1650" height="995" alt="image" src="https://github.com/user-attachments/assets/aa51eb66-2559-4406-808b-634900c50647"/>
</a>

---

## 🛠️ How to Run Locally

To run this project locally:

1. Clone or download the repo:
   ```bash
   git clone https://github.com/TAmbiaT/US-Data-Choropleth-Map.git
   ```
2. Open `index.html` in any modern web browser.

> No installation or server setup needed — everything runs client-side.

---

## 📁 File Structure

```
US-Data-Choropleth-Map/
├── index.html                 # Main HTML file
├── site.css                   # Stylesheet for layout and design
├── helpers.js                 # JavaScript utilities for loading, filtering, and comparing data
├── us-topo.json               # TopoJSON file for US map geometries (nation, states, counties)
└── Education_Poverty...csv    # Cleaned dataset of education and financial metrics by region
```

---

## 📊 Data Source

The dataset used is a cleaned CSV containing merged metrics from U.S. Census Bureau and Department of Education reports. It includes values for:

- High school graduation rate  
- Bachelor's degree attainment 
- Median household income  
- Poverty rate   
- Geographic identifiers (state, county, FIPS codes)

---

## 💻 Technologies Used

- **HTML/CSS**: For structure and styling of the interface.
- **JavaScript**: Event handling, metric switching, and panel state management.
- **D3.js**: For dynamic data-driven map rendering and interactivity.
- **TopoJSON**: For rendering efficient, scalable geographic shapes.

---

## 🚧 Future Improvements

- Add a search bar to find locations by name or ZIP Code.
- Include trend data over time for each metric.
- Add graphs and charts to info cards to further visualize location data.

---

## 👨‍💻 Author / Notes
This project was created to explore how data visualization can make complex datasets more accessible and understandable. By enabling users to compare education and financial outcomes across U.S. regions, the tool helps uncover geographic trends and disparities in a digestible visual format.

Author: Tahmidul Ambia 



> Note: I’ve chosen to host this project using raw.githack.com for ease of sharing. It’s not deployed via GitHub Pages to keep that space available for my main portfolio.
