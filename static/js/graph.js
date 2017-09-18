 queue()
    .defer(d3.json, "/products")
     .await(makeGraphs);

 function makeGraphs(error, productsJson) {
     var salesDashboardProduct = productsJson;
     var ndx = crossfilter(salesDashboardProduct);
     var all = ndx.groupAll();
     var priceTypeChart = dc.rowChart("#price-chart");
     var categoryTypeChart = dc.pieChart("#category-chart");
     var dateTypeChart = dc.lineChart("#date-chart");

     var priceTypeDim = ndx.dimension(function(d) { return d["price"]; });
     var categoryTypeDim = ndx.dimension(function(d) { return d["category"]; });
     var dateTypeDim = ndx.dimension(function (d) {return d["sales_date"]; });

     var priceTypeGroup = priceTypeDim.group();
     var categoryTypeGroup = categoryTypeDim.group();
     var dateTypeGroup = dateTypeDim.group();

     priceTypeChart
         .dimension(priceTypeDim)
         .group(priceTypeGroup)
         .width(1000)
         .height(300);

     categoryTypeChart
        .dimension(categoryTypeDim)
         .group(categoryTypeGroup)
         .height(250)
         .width(300);

      dateTypeChart
          .dimension(dateTypeDim)
          .group(dateTypeGroup)
          .height(250)
         .width(300);

    dc.renderAll();
};