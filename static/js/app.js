// use D3 library to read in JSON (provided link in "Instructions" on bootcampspot)

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(data) {
    console.log(' the results of making this API call is = \n', data);
    //init_button(data)
});

//Variables needed to hold values and initialize charts
//repeat line above to get to the data again.
var samples;
var meta_data;
d3.json(url).then(function (data) {
    let dropdown = d3.select("#selDataset"); //"selDataset" is predefined dropdown selector
    meta_data = data.metadata;
    samples = data.samples;
    //"option" comes from "selDataset", the values are the ids
    data.names.forEach((id) => {
        dropdown.append("option").text(id).property("value", id);
    });


    //We need functions to create and update charts. And to call them with starter data.
    //To initialize charts, need values from first data row. Here we populate them
    metaData(meta_data[0]);
    barChart(samples[0]);
    bubbleChart(samples[0]);
});



function metaData(demographicInfo) {
    let x = d3.select("#sample-metadata");
//these items come from <h3 class="panel-title">Demographic Info</h3>
    x.html(
    `id: ${demographicInfo.id} <br> 
    ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );
}

function barChart(selectedId) {
    //in order to sort desc, have to add ".reverse" to sort before they appear in chart
    let x_axis = selectedId.sample_values.slice(0, 10).reverse();
    let y_axis = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
        // get text descriptions for the mouseover effects, with "text: text" shown below
    let text = selectedId.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];
        
    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };

    Plotly.newPlot("bar", chart, layout);
}


function bubbleChart(selectedId) {
    let x_axis = selectedId.otu_ids;
    let y_axis = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;

    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Pastel",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);
}
function optionChanged(value) {
    let selectedId = samples.find((item) => item.id === value);
    let demographicInfo = meta_data.find((item) => item.id == value);

    // Insterting Demographic Data using metaData function
    metaData(demographicInfo);
    // Call Bar Chart function
    barChart(selectedId);
    // Call Bubble Chart function
    bubbleChart(selectedId);
}

// Input fields can trigger a change event when new text is entered.
inputField.on("change", function() {
    let newText = d3.event.target.value;
    console.log(newText);
  });


