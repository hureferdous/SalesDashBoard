 queue()
    .defer(d3.json, "/products")
     .await(makeGraphs);

 function makeGraphs(error, productsJson) {

     // Json Data
     var salesDashboardProduct = productsJson;

     var dateFormat = d3.time.format("%Y-%m-%d");
salesDashboardProduct.forEach(function(d) {
    d["sales_date"] = dateFormat.parse(d["sales_date"]);
});


     // Crossfilter instance
     var ndx = crossfilter(salesDashboardProduct);


    // Displayed in index.html
     var timeChart = dc.rowChart("#time-chart");
     var priceTypeChart = dc.rowChart("#price-chart");
     var categoryTypeChart = dc.pieChart("#category-chart");
     var brandTypeChart = dc.rowChart("#brand-chart");
     var sizeTypeChart = dc.pieChart("#size-chart");


     // Dimensions
     var dateDim = ndx.dimension(function(d) { return d["sales_date"]; });
     var priceTypeDim = ndx.dimension(function(d) { return d["price"]; });
     var categoryTypeDim = ndx.dimension(function(d) { return d["category"]; });
     var brandTypeDim = ndx.dimension(function (d) {return d["brand"]; });
     var sizeTypeDim = ndx.dimension(function (d) {return d["size"]; });

      // All
      var all = ndx.groupAll();

     // Metrics
     var productsByDate = dateDim.group();
     var priceTypeGroup = priceTypeDim.group();
     var categoryTypeGroup = categoryTypeDim.group();
     var brandTypeGroup = brandTypeDim.group();
     var sizeTypeGroup = sizeTypeDim.group();


     // SELECT MENUS
      selectField = dc.selectMenu("#select_brand")
        .dimension(brandTypeDim)
        .group(brandTypeGroup);
      selectField = dc.selectMenu("#select_category")
        .dimension(categoryTypeDim)
        .group(categoryTypeGroup);

      //Styling Charts
     timeChart
         .dimension(dateDim)
         .group(productsByDate)
         .width(500)
         .height(220)
         .margins({top: 10, right: 50, bottom: 30, left: 50});
 //price Chart
     priceTypeChart
         .dimension(priceTypeDim)
         .group(priceTypeGroup)
         .width(1000)
         .height(250);
     //Category chart
     categoryTypeChart
         .height(200)
         .radius(250)
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


      //Brand chart
      brandTypeChart
          .dimension(brandTypeDim)
          .group(brandTypeGroup)
          .height(200)
         .width(500);

      //product size chart
     sizeTypeChart
         .height(200)
         .radius(250)
         .dimension(sizeTypeDim)
         .group(sizeTypeGroup)
         .innerRadius(30)
         .externalLabels(1)
         .transitionDuration(1500)
         .legend(dc.legend())
    .on('pretransition', function(sizeTypeChart) {
        sizeTypeChart.selectAll('text.pie-slice').text(function(d) {
            return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
    });



    dc.renderAll();

}

