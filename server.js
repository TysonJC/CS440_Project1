const express = require('express');
const cors = require('cors');

const app = express();
//for the security issue when requesting info from api.bls
app.use(cors());
app.use(express.json());

// bls endpoint
// start of the gateway for API
app.get("/bls", async (req, res)=>{
    try{
        //API insert #2
        const response = await fetch("https://api.bls.gov/publicAPI/v2/timeseries/data/",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                seriesid: ["CES0500000030"],
                startyear: "2025",
                endyear: "2026"
            })
        });

        const data = await response.json();

        const series = data?.Results?.series?.[0]?.data;
        const latest = series?.[0];

        const weekly = parseFloat(latest?.value);
        const hourly = weekly/40;
        
        res.json({ hourly });

    }catch(err){
        console.error(err);
        res.status(500).json({ error: "BLS fetch failed" });
    }
});

app.get("/cbp", async(req, res)=>{
    try{
        const url = "https://api.census.gov/data/2022/cbp?get=EMP,ESTAB&for=state:04";

        const response = await fetch(url);

        if(!response.ok){
            const text = await response.text();
            console.error("CBP API error:", text);
            return res.status(500).json({ error: "cbp api failed", details: text });
        }

        const data = await response.json();
        const [headers, values] = data;
        const result = Object.fromEntries(headers.map((h, i)=>[h, values[i]]));
        
        res.json(result);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

//check if server is running
app.listen(5000, ()=>{
    console.log("Server running on http://localhost:5000");
});
