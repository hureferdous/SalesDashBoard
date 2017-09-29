 queue()
    .defer(d3.json, "/products")
     .await(makeGraphs);

 function makeGraphs(error, productsJson) {
     var salesDashboardProduct = productsJson;

     // Crossfilter instance
     var ndx = crossfilter(salesDashboardProduct);

     // All
     var all = ndx.groupAll();

    // Displayed in index.html
     var priceTypeChart = dc.rowChart("#price-chart");
     var categoryTypeChart = dc.pieChart("#category-chart");
     var brandTypeChart = dc.rowChart("#brand-chart");

     // Dimensions
     var priceTypeDim = ndx.dimension(function(d) { return d["price"]; });
     var categoryTypeDim = ndx.dimension(function(d) { return d["category"]; });
     var brandTypeDim = ndx.dimension(function (d) {return d["brand"]; });

     // Groups
     var priceTypeGroup = priceTypeDim.group();
     var categoryTypeGroup = categoryTypeDim.group();
     var brandTypeGroup = brandTypeDim.group();

     //bar chart
     priceTypeChart
         .dimension(priceTypeDim)
         .group(priceTypeGroup)
         .width(1000)
         .height(300);

       //pie chart
     categoryTypeChart
         .height(200)
         .radius(200)
         .dimension(categoryTypeDim)
         .group(categoryTypeGroup)
         .innerRadius(40)
         .externalLabels(1)
         .transitionDuration(1500)
         .legend(dc.legend())
    .on('pretransition', function(categoryTypeChart) {
        categoryTypeChart.selectAll('text.pie-slice').text(function(d) {
            return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
    });


      //bar chart
      brandTypeChart
          .dimension(brandTypeDim)
          .group(brandTypeGroup)
          .height(200)
         .width(300);



    dc.renderAll();

}

