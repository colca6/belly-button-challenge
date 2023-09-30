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
    let selector = d3.select("#selDataset"); //"selDataset" is predefined name of dropdown
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    //To initialize charts, need values from first data row. Here we populate them
    metaData(meta_data[0]);
    barChart(samples[0]);
    bubbleChart(samples[0]);
});

